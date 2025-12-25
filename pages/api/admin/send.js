/**
 * E-Mail Versand API via Resend
 */

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, subject, html, from } = req.body;

  // Validierung
  if (!to || !subject || !html) {
    return res.status(400).json({ error: 'to, subject und html sind erforderlich' });
  }

  try {
    const data = await resend.emails.send({
      from: from || 'Julien Weiss <contact@all-influencer.com>',
      to: to,
      subject: subject,
      html: html,
    });

    return res.status(200).json({ 
      success: true, 
      message: 'E-Mail erfolgreich gesendet',
      id: data.id 
    });

  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ 
      error: 'Fehler beim Senden',
      details: error.message 
    });
  }
}
