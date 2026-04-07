import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";
import { logContactSubmission } from "@/lib/db/submissions";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };
    const { name, email, subject, message } = body;
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    const key = process.env.RESEND_API_KEY;
    if (!key) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 },
      );
    }

    const from =
      process.env.RESEND_FROM ?? "Augmentaa Website <onboarding@resend.dev>";

    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from,
      to: site.email.primary,
      replyTo: email,
      subject: `[Augmentaa Contact] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message || "Failed to send email." },
        { status: 502 },
      );
    }

    void logContactSubmission({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }
}
