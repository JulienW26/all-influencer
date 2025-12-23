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

    // Validierung
    if (!firstName || !lastName || !email || !platform || !handle || !followers || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Kategorie-Namen für E-Mail
    const categoryNames = {
      diamond: 'Diamond (20M+ Followers)',
      platin: 'Platin (10-20M Followers)',
      gold: 'Gold (5-10M Followers)',
      rising: 'Rising Star (1-5M Followers)'
    };

    // Plattform-Namen
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

    // E-Mail an Admin senden
    const adminEmailContent = `
      Neue LOI-Anfrage von All-Influencer.com
      
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      
      Name: ${firstName} ${lastName}
      E-Mail: ${email}
      Plattform: ${platformNames[platform] || platform}
      Handle: ${handle}
      Follower: ${followers}
      Kategorie: ${categoryNames[category] || category}
      Datum: ${date}
      Sprache: ${language?.toUpperCase() || 'DE'}
      
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `;
    // Hier kannst du später einen E-Mail-Service einbinden
    // z.B. SendGrid, Resend, Nodemailer etc.
    
    console.log('=== NEUE LOI ANFRAGE ===');
    console.log(adminEmailContent);
    console.log('Signatur vorhanden:', !!signature);
    console.log('========================');

    // Optional: In Datenbank speichern
    // await saveToDatabase({ firstName, lastName, email, ... });

    // Optional: Bestätigungs-E-Mail an Influencer senden
    // await sendConfirmationEmail(email, firstName, language);

    // Erfolgreiche Antwort
    return res.status(200).json({ 
      success: true, 
      message: 'LOI successfully submitted',
      data: {
        name: `${firstName} ${lastName}`,
        email,
        category: categoryNames[category]
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
