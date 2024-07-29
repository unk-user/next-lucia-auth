import { Resend } from 'resend';
import { ReactNode } from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to: string, subject: string, body: ReactNode) {
  const { error } = await resend.emails.send({
    from: 'NEXTJS AUTH TEMPLATE <you@example.com>',
    to,
    subject,
    react: body,
  });

  if (error) {
    throw error;
  }
}
