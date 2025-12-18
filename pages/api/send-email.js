import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('=== EMAIL API AUFGERUFEN ===');

  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY fehlt!');
      return res.status(500).json({ error: 'API Key nicht konfiguriert' });
    }

    const { type, data } = req.body;

    if (!type || !data) {
      return res.status(400).json({ error: 'Typ und Daten erforderlich' });
    }

    let subject = '';
    let htmlContent = '';

    switch (type) {
      // ============================================
      // INFLUENCER BUCHUNG
      // ============================================
      case 'influencer_booking':
        subject = `[ALL INFLUENCER] Neue Buchungsanfrage - ${data.category}`;
        htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">ALL INFLUENCER</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Neue Buchungsanfrage</p>
            </div>
            <div style="padding: 30px; background: #1f2937; color: white;">
              <h2 style="color: #f59e0b; margin-top: 0;">Influencer Spot Buchung</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">Kategorie:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151;">${data.category}</td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">Rang:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151;">${data.rank}</td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">Monate:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151;">${data.months}</td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">Gesamtpreis:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #f59e0b; font-weight: bold;">${data.totalPrice}</td></tr>
                <tr><td style="padding: 10px 0; color: #9ca3af;">Zeitstempel:</td><td style="padding: 10px 0;">${data.timestamp}</td></tr>
              </table>
              <p style="margin-top: 20px; padding: 15px; background: #374151; border-radius: 8px; color: #9ca3af;">
                <strong style="color: white;">Hinweis:</strong> Freigabe erfolgt ausschließlich durch den Administrator.
              </p>
            </div>
          </div>
        `;
        break;

      // ============================================
      // INFLUENCER EINLADUNGSCODE
      // ============================================
      case 'influencer_invitation':
        subject = `[ALL INFLUENCER] Einladungscode Registrierung - ${data.category}`;
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">ALL INFLUENCER</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Einladungscode Registrierung</p>
            </div>
            <div style="padding: 30px; background: #1f2937; color: white;">
              <h2 style="color: #f59e0b; margin-top: 0;">Influencer Einladungscode</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">Kategorie:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151;">${data.category}</td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">Rang:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151;">${data.rank}</td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">Einladungscode:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151; font-family: monospace; font-size: 18px; color: #f59e0b;">${data.code}</td></tr>
                <tr><td style="padding: 10px 0; color: #9ca3af;">Zeitstempel:</td><td style="padding: 10px 0;">${data.timestamp}</td></tr>
              </table>
              <p style="margin-top: 20px; padding: 15px; background: #374151; border-radius: 8px; color: #9ca3af;">
                <strong style="color: white;">Hinweis:</strong> Freigabe erfolgt ausschließlich durch den Administrator.
              </p>
            </div>
          </div>
        `;
        break;

         // ============================================
      // GOLDENE KUNDEN EINLADUNGSCODE
      // ============================================
      case 'golden_client_invitation':
        subject = `[ALL INFLUENCER] Goldene Kunden - Einladungscode Registrierung`;
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">ALL INFLUENCER</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Goldene Kunden Registrierung</p>
            </div>
            <div style="padding: 30px; background: #1f2937; color: white;">
              <h2 style="color: #f59e0b; margin-top: 0;">Goldene Kunden - Einladungscode</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">Platz:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151;">${data.spotNumber}</td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">Kunde:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151;">${data.clientName || 'Neuer Kunde'}</td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">Einladungscode:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151; font-family: monospace; font-size: 18px; color: #f59e0b;">${data.code}</td></tr>
                <tr><td style="padding: 10px 0; color: #9ca3af;">Zeitstempel:</td><td style="padding: 10px 0;">${data.timestamp}</td></tr>
              </table>
              <p style="margin-top: 20px; padding: 15px; background: #374151; border-radius: 8px; color: #9ca3af;">
                <strong style="color: white;">Hinweis:</strong> Freigabe erfolgt ausschließlich durch den Administrator.
              </p>
               </div>
          </div>
        `;
        break;

      // ============================================
      // KONTAKT FORMULAR
      // ============================================
      case 'contact':
        subject = `[ALL INFLUENCER] Kontaktanfrage von ${data.name}`;
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">ALL INFLUENCER</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Neue Kontaktanfrage</p>
            </div>
            <div style="padding: 30px; background: #1f2937; color: white;">
              <h2 style="color: #f59e0b; margin-top: 0;">Kontaktformular</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">Name:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151;">${data.name}</td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">E-Mail:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151;"><a href="mailto:${data.email}" style="color: #f59e0b;">${data.email}</a></td></tr>
                <tr><td style="padding: 10px 0; color: #9ca3af;">Zeitstempel:</td><td style="padding: 10px 0;">${data.timestamp}</td></tr>
              </table>
              <div style="margin-top: 20px; padding: 20px; background: #374151; border-radius: 8px;">
                <h3 style="color: #f59e0b; margin-top: 0;">Nachricht:</h3>
                <p style="color: white; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
              </div>
            </div>
          </div>
        `;
        break;

          // ============================================
      // BEWERBUNG / ARBEITE MIT UNS
      // ============================================
      case 'application':
        subject = `[ALL INFLUENCER] Neue Bewerbung - ${data.position}`;
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">ALL INFLUENCER</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Neue Bewerbung</p>
            </div>
            <div style="padding: 30px; background: #1f2937; color: white;">
              <h2 style="color: #f59e0b; margin-top: 0;">Bewerbung - Arbeite mit uns</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">Name:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151;">${data.name}</td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">E-Mail:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151;"><a href="mailto:${data.email}" style="color: #f59e0b;">${data.email}</a></td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">Position:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #f59e0b; font-weight: bold;">${data.position}</td></tr>
                <tr><td style="padding: 10px 0; color: #9ca3af;">Zeitstempel:</td><td style="padding: 10px 0;">${data.timestamp}</td></tr>
              </table>
              <div style="margin-top: 20px; padding: 20px; background: #374151; border-radius: 8px;">
                <h3 style="color: #f59e0b; margin-top: 0;">Motivation:</h3>
                <p style="color: white; line-height: 1.6; white-space: pre-wrap;">${data.motivation}</p>
              </div>
            </div>
          </div>
        `;
                break;

      default:
        return res.status(400).json({ error: 'Unbekannter Typ: ' + type });
    }

    console.log(`Sende ${type} E-Mail...`);

    const result = await resend.emails.send({
      from: 'contact@all-influencer.com',
      to: 'contact@all-influencer.com',
      subject: subject,
      html: htmlContent,
    });

    console.log('✅ E-Mail gesendet!', result);

    return res.status(200).json({
      success: true,
      message: 'E-Mail erfolgreich gesendet',
      id: result.id
    });

  } catch (error) {
    console.error('❌ Fehler beim E-Mail-Versand:', error);
    return res.status(500).json({
      error: 'E-Mail konnte nicht gesendet werden',
      details: error.message
    });
  }
}
