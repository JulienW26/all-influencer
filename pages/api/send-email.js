import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  console.log('=== TEST API AUFGERUFEN ===');
  
  try {
    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ error: 'API Key fehlt!' });
    }

    console.log('API Key:', process.env.RESEND_API_KEY.substring(0, 15) + '...');
    console.log('Sende Test-E-Mail...');

    const result = await resend.emails.send({
      from: 'contact@all-influencer.com',
      to: 'all-influencer@pt.me',
      subject: 'TEST API - Direkter Versand',
      html: '<h1>Test erfolgreich!</h1><p>Diese E-Mail wurde direkt von der Test-API gesendet.</p>',
    });

    console.log('✅ Erfolg!', result);

    return res.status(200).json({ 
      success: true,
      message: 'E-Mail gesendet!',
      id: result.id,
      apiKey: process.env.RESEND_API_KEY.substring(0, 15) + '...'
    });
  } catch (error) {
    console.error('❌ Fehler:', error);
    return res.status(500).json({ 
      error: error.message,
      details: error.toString()
    });
  }
}
