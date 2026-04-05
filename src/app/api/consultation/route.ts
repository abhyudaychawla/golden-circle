import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendConfirmationEmail, sendAdminNotification } from "@/lib/email";

const consultationSchema = z.object({
  fullName: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  serviceInterest: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().optional(),
  website: z.string().optional(), // honeypot
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot check
    if (body.website && body.website.trim() !== "") {
      return NextResponse.json({ success: true, message: "Request received." });
    }

    const parsed = consultationSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.errors[0];
      return NextResponse.json(
        { success: false, message: firstError.message },
        { status: 400 }
      );
    }

    const {
      fullName,
      email,
      phone,
      serviceInterest,
      preferredDate,
      preferredTime,
      message,
    } = parsed.data;

    // Create both a Lead and a BookingRequest record
    await Promise.all([
      prisma.lead.create({
        data: {
          fullName,
          email,
          phone: phone || null,
          serviceInterest: serviceInterest || null,
          preferredContactMethod: "email",
          message: message || null,
          source: "website-consultation-form",
          status: "new",
        },
      }),
      prisma.bookingRequest.create({
        data: {
          fullName,
          email,
          phone: phone || null,
          serviceInterest: serviceInterest || null,
          preferredDate: preferredDate || null,
          preferredTime: preferredTime || null,
          message: message || null,
          status: "pending",
        },
      }),
    ]);

    // Send emails
    await Promise.allSettled([
      sendConfirmationEmail(email, fullName, "consultation"),
      sendAdminNotification(
        {
          fullName,
          email,
          phone,
          serviceInterest,
          preferredDate,
          preferredTime,
          message,
        },
        "consultation"
      ),
    ]);

    return NextResponse.json({
      success: true,
      message:
        "Your request has been received. I'll be in touch within 24–48 hours to confirm your session details.",
    });
  } catch (error) {
    console.error("Consultation form error:", error);
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
