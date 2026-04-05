import { Resend } from "resend";

// Lazy — only instantiated when an email is actually sent, not at module load.
function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  return new Resend(key);
}

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "hello@goldencirclecoaching.com";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@goldencirclecoaching.com";
const SITE_NAME = "Golden Circle Coaching";

function baseEmailWrapper(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${SITE_NAME}</title>
</head>
<body style="margin:0;padding:0;background-color:#FDFAF6;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FDFAF6;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(27,42,74,0.08);">
          <!-- Header -->
          <tr>
            <td style="background-color:#1B2A4A;padding:32px 40px;text-align:center;">
              <p style="margin:0;font-family:Georgia,serif;font-size:22px;font-weight:400;color:#C9A96E;letter-spacing:2px;">Golden Circle</p>
              <p style="margin:4px 0 0;font-family:Arial,sans-serif;font-size:11px;color:#8A95A5;letter-spacing:3px;text-transform:uppercase;">Coaching</p>
            </td>
          </tr>
          <!-- Divider -->
          <tr>
            <td style="height:2px;background:linear-gradient(to right,transparent,#C9A96E,transparent);"></td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:40px 40px 32px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #E8D5B0;text-align:center;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#8A95A5;">
                ${SITE_NAME} &nbsp;·&nbsp; <a href="mailto:${FROM_EMAIL}" style="color:#C9A96E;text-decoration:none;">${FROM_EMAIL}</a>
              </p>
              <p style="margin:8px 0 0;font-family:Arial,sans-serif;font-size:11px;color:#8A95A5;">
                Coaching is not therapy or a substitute for professional mental health services.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function sendConfirmationEmail(
  to: string,
  name: string,
  type: "contact" | "consultation"
): Promise<void> {
  const isConsultation = type === "consultation";

  const content = `
    <h1 style="font-family:Georgia,serif;font-size:28px;font-weight:400;color:#1B2A4A;margin:0 0 8px;">
      ${isConsultation ? "Your request has been received." : "Thank you for reaching out."}
    </h1>
    <div style="width:40px;height:2px;background-color:#C9A96E;margin:0 0 24px;"></div>

    <p style="font-family:Arial,sans-serif;font-size:15px;color:#3D4B63;line-height:1.7;margin:0 0 16px;">
      Dear ${name},
    </p>

    <p style="font-family:Arial,sans-serif;font-size:15px;color:#3D4B63;line-height:1.7;margin:0 0 16px;">
      ${
        isConsultation
          ? "I've received your consultation request and I'm genuinely looking forward to connecting with you. I'll be in touch within 24–48 hours to confirm your session details."
          : "I've received your message and will respond thoughtfully within 24–48 hours. Thank you for taking this step."
      }
    </p>

    <p style="font-family:Arial,sans-serif;font-size:15px;color:#3D4B63;line-height:1.7;margin:0 0 24px;">
      In the meantime, feel free to explore the <a href="${process.env.NEXT_PUBLIC_SITE_URL || "#"}/coaching" style="color:#C9A96E;text-decoration:none;">coaching services</a> or read through some <a href="${process.env.NEXT_PUBLIC_SITE_URL || "#"}/testimonials" style="color:#C9A96E;text-decoration:none;">client stories</a>.
    </p>

    <p style="font-family:Arial,sans-serif;font-size:15px;color:#3D4B63;line-height:1.7;margin:0 0 8px;">
      Warmly,
    </p>
    <p style="font-family:Georgia,serif;font-size:18px;color:#1B2A4A;margin:0;">
      Alexandra Mercer
    </p>
    <p style="font-family:Arial,sans-serif;font-size:13px;color:#8A95A5;margin:4px 0 0;">
      Golden Circle Coaching
    </p>
  `;

  try {
    await getResend().emails.send({
      from: `Alexandra Mercer <${FROM_EMAIL}>`,
      to: [to],
      subject: isConsultation
        ? "Your consultation request — Golden Circle Coaching"
        : "Thank you for reaching out — Golden Circle Coaching",
      html: baseEmailWrapper(content),
    });
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
  }
}

export async function sendAdminNotification(
  data: Record<string, string | undefined>,
  type: "contact" | "consultation"
): Promise<void> {
  const typeLabel = type === "consultation" ? "Consultation Request" : "Contact Message";

  const rows = Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(
      ([k, v]) => `
      <tr>
        <td style="padding:8px 12px;font-family:Arial,sans-serif;font-size:13px;color:#8A95A5;font-weight:600;text-transform:uppercase;letter-spacing:1px;width:160px;vertical-align:top;">${k.replace(/([A-Z])/g, " $1").trim()}</td>
        <td style="padding:8px 12px;font-family:Arial,sans-serif;font-size:14px;color:#3D4B63;">${v}</td>
      </tr>`
    )
    .join("");

  const content = `
    <h1 style="font-family:Georgia,serif;font-size:24px;font-weight:400;color:#1B2A4A;margin:0 0 8px;">
      New ${typeLabel}
    </h1>
    <div style="width:40px;height:2px;background-color:#C9A96E;margin:0 0 24px;"></div>

    <p style="font-family:Arial,sans-serif;font-size:14px;color:#8A95A5;margin:0 0 20px;">
      Received on ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E8D5B0;border-radius:8px;overflow:hidden;">
      ${rows}
    </table>

    <div style="margin-top:28px;">
      <a href="${process.env.NEXT_PUBLIC_SITE_URL || "#"}/admin" style="display:inline-block;background-color:#1B2A4A;color:#ffffff;font-family:Arial,sans-serif;font-size:14px;padding:12px 24px;border-radius:30px;text-decoration:none;">
        View in Dashboard →
      </a>
    </div>
  `;

  try {
    await getResend().emails.send({
      from: `Golden Circle Coaching <${FROM_EMAIL}>`,
      to: [ADMIN_EMAIL],
      subject: `[Golden Circle] New ${typeLabel} from ${data.fullName || "Unknown"}`,
      html: baseEmailWrapper(content),
    });
  } catch (error) {
    console.error("Failed to send admin notification:", error);
  }
}
