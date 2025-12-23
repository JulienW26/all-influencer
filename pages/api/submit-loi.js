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

    console.log('=== NEUE LOI ANFRAGE ===');
    console.log('Name:', firstName, lastName);
    console.log('Email:', email);
    console.log('Plattform:', platformNames[platform] || platform);
    console.log('Handle:', handle);
    console.log('Follower:', followers);
    console.log('Kategorie:', categoryNames[category] || category);
    console.log('Signatur vorhanden:', !!signature);
    console.log('========================');

    return res.status(200).json({ 
      success: true, 
      message: 'LOI successfully submitted',
      data: {
        name: firstName + ' ' + lastName,
        email: email,
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
