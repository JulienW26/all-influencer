import jwt from 'jsonwebtoken';
import dbConnect from '../../../lib/mongodb';
import PortalUser from '../../../models/PortalUser';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = req.cookies.portal_token;

    if (!token) {
      return res.status(401).json({ error: 'Nicht autorisiert' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await dbConnect();

    const user = await PortalUser.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'Benutzer nicht gefunden' });
    }

    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        userType: user.userType,
        status: user.status,
        profile: user.profile || {},
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Auth error:', error);
    
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token ungültig oder abgelaufen' });
    }
    
    res.status(500).json({ error: 'Server-Fehler' });
  }
}
