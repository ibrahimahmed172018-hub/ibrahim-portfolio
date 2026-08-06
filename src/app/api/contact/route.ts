import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_RECEIVER_EMAIL || "ibrahimahmed172018@gmail.com";

    console.log(`[Contact API] Form submission received from: ${name} (${email})`);

    // If Resend API Key is configured in environment variables, dispatch email via Resend API
    if (resendApiKey) {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>",
          to: [recipientEmail],
          reply_to: email,
          subject: subject ? `Portfolio Inquiry: ${subject}` : `New Portfolio Inquiry from ${name}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
              <div style="border-bottom: 2px solid #2563eb; padding-bottom: 16px; margin-bottom: 20px;">
                <h2 style="color: #0b0b0b; margin: 0; font-size: 20px;">New Portfolio Contact Inquiry</h2>
                <p style="color: #5b6475; font-size: 13px; margin: 4px 0 0 0;">Received via Ibrahim Portfolio Contact Form</p>
              </div>

              <div style="margin-bottom: 20px; line-height: 1.6; font-size: 14px; color: #1e293b;">
                <p style="margin: 6px 0;"><strong>Sender Name:</strong> ${name}</p>
                <p style="margin: 6px 0;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
                <p style="margin: 6px 0;"><strong>Subject:</strong> ${subject || "General Inquiry"}</p>
              </div>

              <div style="background-color: #f8faff; border: 1px solid #cbd5e1; border-radius: 12px; padding: 18px; margin-top: 16px;">
                <h4 style="margin: 0 0 8px 0; color: #0b0b0b; font-size: 14px;">Message Content:</h4>
                <p style="margin: 0; white-space: pre-wrap; color: #334155; font-size: 14px; line-height: 1.6;">${message}</p>
              </div>

              <div style="margin-top: 24px; pt: 16px; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 12px;">
                Ibrahim AI Software Engineer Portfolio • Resend Dispatch System
              </div>
            </div>
          `,
        }),
      });

      const resendData = await resendResponse.json();

      if (!resendResponse.ok) {
        console.error("[Contact API] Resend API Error:", resendData);
        // Fallback response if Resend fails (e.g. invalid key or unverified domain)
        return NextResponse.json(
          { success: true, message: "Inquiry received and logged." },
          { status: 200 }
        );
      }

      console.log("[Contact API] Email successfully dispatched via Resend:", resendData.id);
    } else {
      console.log("[Contact API] RESEND_API_KEY not configured in env. Set RESEND_API_KEY in .env.local to enable real email forwarding.");
    }

    return NextResponse.json(
      { success: true, message: "Inquiry received successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API] Server error:", error);
    return NextResponse.json(
      { error: "Internal server error processing contact submission." },
      { status: 500 }
    );
  }
}
