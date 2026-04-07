import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";
import { logEnquirySubmission } from "@/lib/db/submissions";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name?: string;
      company?: string;
      email?: string;
      phone?: string;
      product?: string;
      message?: string;
    };
    const { name, company, email, phone, product, message } = body;
    if (
      !name?.trim() ||
      !company?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !product?.trim() ||
      !message?.trim()
    ) {
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
    const text = [
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Product: ${product}`,
      "",
      message,
    ].join("\n");

    const { error } = await resend.emails.send({
      from,
      to: site.email.primary,
      replyTo: email,
      subject: `[Augmentaa Enquiry] ${product}`,
      text,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message || "Failed to send email." },
        { status: 502 },
      );
    }

    void logEnquirySubmission({
      name: name.trim(),
      company: company.trim(),
      email: email.trim(),
      phone: phone.trim(),
      product: product.trim(),
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
