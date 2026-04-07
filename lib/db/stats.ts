import { neon } from "@neondatabase/serverless";

export type AdminStatsPayload = {
  contactSubmissions: number;
  enquirySubmissions: number;
  enquiryByProduct: Record<string, number>;
  recentContacts: Array<{
    name: string;
    email: string;
    subject: string;
    submittedAt: string;
  }>;
  recentEnquiries: Array<{
    name: string;
    company: string;
    email: string;
    product: string;
    submittedAt: string;
  }>;
};

const empty: AdminStatsPayload = {
  contactSubmissions: 0,
  enquirySubmissions: 0,
  enquiryByProduct: {},
  recentContacts: [],
  recentEnquiries: [],
};

export async function fetchAdminStats(): Promise<AdminStatsPayload> {
  const url = process.env.DATABASE_URL;
  if (!url) return empty;

  const sql = neon(url);

  try {
    const [contactRow] =
      await sql`SELECT COUNT(*)::int AS c FROM contact_submissions`;
    const [enquiryRow] =
      await sql`SELECT COUNT(*)::int AS c FROM enquiry_submissions`;

    const byProduct = await sql`
      SELECT product, COUNT(*)::int AS c
      FROM enquiry_submissions
      GROUP BY product
      ORDER BY c DESC
    `;

    const recentContacts = await sql`
      SELECT name, email, subject, submitted_at
      FROM contact_submissions
      ORDER BY submitted_at DESC
      LIMIT 10
    `;

    const recentEnquiries = await sql`
      SELECT name, company, email, product, submitted_at
      FROM enquiry_submissions
      ORDER BY submitted_at DESC
      LIMIT 10
    `;

    const enquiryByProduct: Record<string, number> = {};
    for (const row of byProduct as { product: string; c: number }[]) {
      enquiryByProduct[row.product] = Number(row.c);
    }

    return {
      contactSubmissions: Number(contactRow?.c ?? 0),
      enquirySubmissions: Number(enquiryRow?.c ?? 0),
      enquiryByProduct,
      recentContacts: (recentContacts as {
        name: string;
        email: string;
        subject: string;
        submitted_at: string;
      }[]).map((r) => ({
        name: r.name,
        email: r.email,
        subject: r.subject,
        submittedAt: new Date(r.submitted_at).toISOString(),
      })),
      recentEnquiries: (recentEnquiries as {
        name: string;
        company: string | null;
        email: string;
        product: string;
        submitted_at: string;
      }[]).map((r) => ({
        name: r.name,
        company: r.company ?? "",
        email: r.email,
        product: r.product,
        submittedAt: new Date(r.submitted_at).toISOString(),
      })),
    };
  } catch {
    return empty;
  }
}
