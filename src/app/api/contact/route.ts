import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendConfirmationEmail, sendAdminNotification } from "@/lib/email";

const contactSchema = z.object({
  fullName: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(1, "Message is required").max(5000),
  website: z.string().optional(), // honeypot
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot check — silently succeed if bot filled the hidden field
    if (body.website && body.website.trim() !== "") {
      return NextResponse.json({ success: true, message: "Message received." });
    }

    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.errors[0];
      return NextResponse.json(
        { success: false, message: firstError.message },
        { status: 400 }
      );
    }

    const { fullName, email, phone, subject, message } = parsed.data;

    // Save to database
    await prisma.contactMessage.create({
      data: {
        fullName,
        email,
        phone: phone || null,
        subject: subject || null,
        message,
        status: "unread",
      },
    });

    // Send emails (non-blocking — don't fail the request if emails fail)
    await Promise.allSettled([
      sendConfirmationEmail(email, fullName, "contact"),
      sendAdminNotification(
        { fullName, email, phone, subject, message },
        "contact"
      ),
    ]);

    return NextResponse.json({
      success: true,
      message:
        "Thank you for your message. I'll respond thoughtfully within 24–48 hours.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong on our end. Please try again or reach out directly by email.",
      },
      { status: 500 }
    );
  }
}
