import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  try {
    // API Key Check
    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ 
        error: 'API Key fehlt!',
        hasKey: false
      });
    }

    // Zeige ersten Teil des Keys
    const keyPreview = process.env.RESEND_API_KEY.substring(0, 15);

    // Versuche E-Mail zu senden
    const result = await resend.emails.send({
      from: 'contact@all-influencer.com',
      to: 'bruderino@proton.me',
      subject: 'TEST - Direkter API-Aufruf',
      html: '<h1>Erfolg!</h1><p>Diese E-Mail wurde direkt von test-send.js gesendet.</p>',
    });

    return res.status(200).json({ 
      success: true,
      message: 'E-Mail erfolgreich gesendet!',
      emailId: result.id,
      apiKeyPreview: keyPreview + '...',
      to: 'bruderino@proton.me'
    });

  } catch (error) {
    return res.status(500).json({ 
      success: false,
      error: error.message,
      errorName: error.name,
      errorCode: error.code,
      errorDetails: JSON.stringify(error, Object.getOwnPropertyNames(error))
    });
  }
}
