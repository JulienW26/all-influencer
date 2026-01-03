import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      firstName,
      lastName,
      email,
      platform,
      handle,
      followers,
      category,
      date,
      signature,
      language
    } = req.body;

    if (!firstName || !lastName || !email || !platform || !handle || !followers || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const categoryNames = {
      diamond: 'Diamond (20M+ Followers)',
      platin: 'Platin (10-20M Followers)',
      gold: 'Gold (5-10M Followers)',
      rising: 'Rising Star (1-5M Followers)'
    };

    const platformNames = {
      instagram: 'Instagram',
      youtube: 'YouTube',
      tiktok: 'TikTok',
      x: 'X (Twitter)',
      linkedin: 'LinkedIn',
      facebook: 'Facebook',
      twitch: 'Twitch',
      other: 'Sonstige'
    };

    const categoryLabel = categoryNames[category] || category;
    const platformLabel = platformNames[platform] || platform;
    const formattedDate = date || new Date().toLocaleDateString('de-DE');

    console.log('=== NEUE LOI ANFRAGE ===');
    console.log('Name:', firstName, lastName);
    console.log('Email:', email);
    console.log('Plattform:', platformLabel);
    console.log('Handle:', handle);
    console.log('Follower:', followers);
    console.log('Kategorie:', categoryLabel);
    console.log('Signatur vorhanden:', !!signature);
    console.log('========================');

    // E-Mail an ALL INFLUENCER Team senden
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #1a1a1a 0%, #333 100%); padding: 30px; text-align: center; }
          .header h1 { color: #f59e0b; margin: 0; font-size: 24px; }
          .header p { color: #888; margin: 10px 0 0 0; font-size: 14px; }
          .content { padding: 30px; }
          .badge { display: inline-block; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: bold; margin-bottom: 20px; }
          .badge.diamond { background: linear-gradient(135deg, #b9f2ff 0%, #89CFF0 100%); color: #1a1a1a; }
          .badge.platin { background: linear-gradient(135deg, #e5e4e2 0%, #c0c0c0 100%); color: #1a1a1a; }
          .badge.gold { background: linear-gradient(135deg, #ffd700 0%, #f59e0b 100%); color: #1a1a1a; }
          .badge.rising { background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%); color: #fff; }
          .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .info-table td { padding: 12px 0; border-bottom: 1px solid #eee; }
          .info-table td:first-child { color: #666; width: 40%; }
          .info-table td:last-child { font-weight: 500; color: #1a1a1a; }
          .signature-box { background: #f9f9f9; border: 1px solid #e5e5e5; border-radius: 8px; padding: 20px; margin-top: 20px; text-align: center; }
          .signature-box img { max-width: 300px; max-height: 100px; }
          .footer { background: #1a1a1a; color: #888; text-align: center; padding: 20px; font-size: 12px; }
          .cta-button { display: inline-block; background: #f59e0b; color: #1a1a1a; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🤝 Neue LOI Anfrage</h1>
            <p>Founder-Programm Bewerbung</p>
          </div>
          <div class="content">
            <span class="badge ${category}">${categoryLabel}</span>
            
            <table class="info-table">
              <tr>
                <td>Name</td>
                <td>${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td>E-Mail</td>
                <td><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td>Plattform</td>
                <td>${platformLabel}</td>
              </tr>
              <tr>
                <td>Handle</td>
                <td>@${handle.replace('@', '')}</td>
              </tr>
              <tr>
                <td>Follower</td>
                <td>${Number(followers).toLocaleString('de-DE')}</td>
              </tr>
              <tr>
                <td>Kategorie</td>
                <td>${categoryLabel}</td>
              </tr>
              <tr>
                <td>Datum</td>
                <td>${formattedDate}</td>
              </tr>
            </table>

            ${signature ? `
            <div class="signature-box">
              <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">Digitale Signatur:</p>
              <img src="${signature}" alt="Signatur" />
            </div>
            ` : ''}

            <div style="text-align: center;">
              <a href="https://all-influencer.com/admin/portal-users" class="cta-button">
                Im Admin-Portal ansehen →
              </a>
            </div>
          </div>
          <div class="footer">
            <p>ALL INFLUENCER - Founder-Programm</p>
            <p>Diese E-Mail wurde automatisch generiert.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // E-Mail senden
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'ALL INFLUENCER <contact@all-influencer.com>',
      to: ['contact@all-influencer.com'],
      replyTo: email,
      subject: `🤝 Neue LOI Anfrage: ${firstName} ${lastName} (${categoryLabel})`,
      html: emailHtml,
    });

    if (error) {
      console.error('E-Mail Fehler:', error);
      // Trotzdem Erfolg zurückgeben - LOI wurde empfangen
      return res.status(200).json({ 
        success: true, 
        message: 'LOI received (email notification failed)',
        emailError: error.message
      });
    }

    console.log('✅ LOI E-Mail gesendet, ID:', data?.id);

    return res.status(200).json({ 
      success: true, 
      message: 'LOI successfully submitted',
      data: {
        name: firstName + ' ' + lastName,
        email: email,
        category: categoryLabel
      }
    });

  } catch (error) {
    console.error('Error processing LOI:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
