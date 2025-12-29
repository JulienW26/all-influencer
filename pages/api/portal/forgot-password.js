import dbConnect from '../../../lib/mongodb';
import PortalUser from '../../../models/PortalUser';
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'E-Mail-Adresse erforderlich' });
    }

    await dbConnect();

    const user = await PortalUser.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(200).json({ 
        success: true, 
        message: 'Falls ein Account existiert, wurde eine E-Mail gesendet.' 
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000);

    await PortalUser.findByIdAndUpdate(user._id, {
      resetToken: resetTokenHash,
      resetTokenExpiry: resetTokenExpiry
    });

    console.log('Password reset requested for:', email);
    console.log('Reset token (for development):', resetToken);

    res.status(200).json({ 
      success: true, 
      message: 'Falls ein Account existiert, wurde eine E-Mail gesendet.' 
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Server-Fehler' });
  }
}
