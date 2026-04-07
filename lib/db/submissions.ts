import { neon } from "@neondatabase/serverless";

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url);
}

export function logContactSubmission(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const sql = getSql();
  if (!sql) return Promise.resolve();
  return sql`
    INSERT INTO contact_submissions (name, email, subject, message)
    VALUES (
      ${data.name},
      ${data.email},
      ${data.subject},
      ${data.message}
    )
  `.catch(() => undefined);
}

export function logEnquirySubmission(data: {
  name: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  message: string;
}) {
  const sql = getSql();
  if (!sql) return Promise.resolve();
  return sql`
    INSERT INTO enquiry_submissions (name, company, email, phone, product, message)
    VALUES (
      ${data.name},
      ${data.company},
      ${data.email},
      ${data.phone},
      ${data.product},
      ${data.message}
    )
  `.catch(() => undefined);
}
