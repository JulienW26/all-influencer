// pages/api/send-email.js
// Resend E-Mail Integration für ALL INFLUENCER

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, data } = req.body;

  // Check if API key is configured
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  try {
    let emailContent;

    switch (type) {
      case 'registration':
        emailContent = {
          from: 'ALL INFLUENCER <noreply@all-influencer.com>',
          to: data.email,
          subject: 'Willkommen bei ALL INFLUENCER! 🎉',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #0a0a0a; color: #ffffff; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
                .logo { text-align: center; margin-bottom: 30px; }
                .logo-text { font-size: 28px; font-weight: bold; color: #fbbf24; }
                .content { background: #1a1a1a; border-radius: 16px; padding: 40px; border: 1px solid #333; }
                h1 { color: #fbbf24; margin-top: 0; }
                p { color: #cccccc; line-height: 1.6; }
                .button { display: inline-block; background: linear-gradient(90deg, #fbbf24, #d97706); color: #000; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
              </style>
            </head>
            <body>
                         <div class="container">
                <div class="logo">
                  <span class="logo-text">💎 ALL INFLUENCER</span>
                </div>
                <div class="content">
                  <h1>Willkommen, ${data.name}!</h1>
                  <p>Vielen Dank für deine Registrierung bei ALL INFLUENCER - dem exklusivsten Premium Influencer Network.</p>
                  <p>Du kannst dich jetzt einloggen und deinen Spot unter den Top-Influencern sichern.</p>
                  <a href="https://all-influencer.com" class="button">Jetzt einloggen</a>
                  <p style="margin-top: 30px;">Bei Fragen stehen wir dir jederzeit zur Verfügung.</p>
                  <p>Dein ALL INFLUENCER Team</p>
                </div>
                <div class="footer">
                  <p>© 2025 ALL INFLUENCER. Alle Rechte vorbehalten.</p>
                  <p>Berlin, Deutschland</p>
                </div>
              </div>
            </body>
            </html>
          `
        };
        break;

      case 'contact':
        emailContent = {
          from: 'ALL INFLUENCER <noreply@all-influencer.com>',
          to: 'contact@all-influencer.com',
          replyTo: data.email,
          subject: `Neue Kontaktanfrage von ${data.name}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
                .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                .header { background: linear-gradient(90deg, #fbbf24, #d97706); padding: 30px; text-align: center; }
                .header h1 { color: #000; margin: 0; font-size: 24px; }
                .content { padding: 30px; }
                .field { margin-bottom: 20px; }
                .label { font-weight: bold; color: #333; margin-bottom: 5px; }
                .value { color: #666; background: #f9f9f9; padding: 12px; border-radius: 8px; }
                .message { white-space: pre-wrap; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>📬 Neue Kontaktanfrage</h1>
                </div>
                <div class="content">
                  <div class="field">
                    <div class="label">Name:</div>
                    <div class="value">${data.name}</div>
                  </div>
                  <div class="field">
                    <div class="label">E-Mail:</div>
                    <div class="value">${data.email}</div>
                  </div>
                  <div class="field">
                                      <div class="label">Nachricht:</div>
                    <div class="value message">${data.message}</div>
                  </div>
                </div>
              </div>
            </body>
            </html>
          `
        };
        break;

      case 'booking':
        const categoryNames = {
          diamond: '💎 Diamond',
          platinum: '🏆 Platin',
          gold: '🥇 Gold',
          risingStar: '⭐ Rising Star'
        };
        const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
        const selectedMonthNames = data.months.map(m => monthNames[m]).join(', ');

        emailContent = {
          from: 'ALL INFLUENCER <noreply@all-influencer.com>',
          to: 'contact@all-influencer.com',
          subject: `🔔 Neue Buchungsanfrage - ${categoryNames[data.category]}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
                .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                .header { background: linear-gradient(90deg, #fbbf24, #d97706); padding: 30px; text-align: center; }
                .header h1 { color: #000; margin: 0; font-size: 24px; }
                .content { padding: 30px; }
                .field { margin-bottom: 20px; }
                .label { font-weight: bold; color: #333; margin-bottom: 5px; }
                .value { color: #666; background: #f9f9f9; padding: 12px; border-radius: 8px; }
                .highlight { background: #fef3c7; border: 1px solid #fbbf24; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🔔 Neue Buchungsanfrage</h1>
                </div>
                <div class="content">
                  <div class="field">
                    <div class="label">Kategorie:</div>
                    <div class="value highlight">${categoryNames[data.category]}</div>
                  </div>
                  <div class="field">
                    <div class="label">Spot-Nummer:</div>
                    <div class="value">#${data.spotIndex + 1}</div>
                  </div>
                  <div class="field">
                    <div class="label">Gebuchte Monate (2026):</div>
                    <div class="value highlight">${selectedMonthNames}</div>
                  </div>
                  <div class="field">
                    <div class="label">Profil-Link:</div>
                    <div class="value"><a href="${data.profileLink}">${data.profileLink}</a></div>
                  </div>
                  <div class="field">
                    <div class="label">Screenshot:</div>
                    <div class="value">${data.screenshotName || 'Angehängt'}</div>
                  </div>
                  <p style="margin-top: 30px; color: #666;">Bitte prüfe die Follower-Zahlen und gib die Buchung frei.</p>
                </div>
              </div>
            </body>
            </html>
          `
        };
        break;

      case 'booking-confirmation':
        emailContent = {
          from: 'ALL INFLUENCER <noreply@all-influencer.com>',
          to: data.email,
          subject: '✅ Deine Buchungsanfrage wurde eingereicht',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <style>
                              body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #0a0a0a; color: #ffffff; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
                .logo { text-align: center; margin-bottom: 30px; }
                .logo-text { font-size: 28px; font-weight: bold; color: #fbbf24; }
                .content { background: #1a1a1a; border-radius: 16px; padding: 40px; border: 1px solid #333; }
                h1 { color: #fbbf24; margin-top: 0; }
                p { color: #cccccc; line-height: 1.6; }
                .info-box { background: #262626; border-radius: 8px; padding: 20px; margin: 20px 0; }
                .info-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
                .info-label { color: #888; }
                .info-value { color: #fff; font-weight: bold; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="logo">
                  <span class="logo-text">💎 ALL INFLUENCER</span>
                </div>
                <div class="content">
                  <h1>Buchungsanfrage eingereicht! ✅</h1>
                  <p>Vielen Dank für deine Buchungsanfrage. Unser Team prüft jetzt dein Profil und deine Follower-Zahlen.</p>
                  <div class="info-box">
                    <div class="info-row">
                      <span class="info-label">Status:</span>
                      <span class="info-value">In Prüfung</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">Bearbeitungszeit:</span>
                      <span class="info-value">24-48 Stunden</span>
                    </div>
                  </div>
                  <p>Du erhältst eine weitere E-Mail, sobald dein Profil freigeschaltet wurde. Danach kannst du die Zahlung abschließen.</p>
                  <p>Bei Fragen stehen wir dir jederzeit zur Verfügung unter <a href="mailto:contact@all-influencer.com" style="color: #fbbf24;">contact@all-influencer.com</a></p>
                  <p style="margin-top: 30px;">Dein ALL INFLUENCER Team</p>
                </div>
                <div class="footer">
                  <p>© 2025 ALL INFLUENCER. Alle Rechte vorbehalten.</p>
                </div>
              </div>
            </body>
            </html>
          `
        };
        break;

      default:
        return res.status(400).json({ error: 'Invalid email type' });
    }

    // Send email via Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify(emailContent)
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Resend API Error:', result);
      return res.status(500).json({ error: 'Failed to send email', details: result });
    }

    return res.status(200).json({ success: true, messageId: result.id });

  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
