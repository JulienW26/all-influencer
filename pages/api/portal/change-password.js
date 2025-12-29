import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../lib/mongodb';
import PortalUser from '../../../models/PortalUser';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = req.cookies.portal_token;

    if (!token) {
      return res.status(401).json({ error: 'Nicht autorisiert' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Aktuelles und neues Passwort erforderlich' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'Das neue Passwort muss mindestens 8 Zeichen lang sein' });
    }

    await dbConnect();

    const user = await PortalUser.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: 'Benutzer nicht gefunden' });
    }

    const isValidPassword = await bcrypt.compare(currentPassword, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ error: 'Aktuelles Passwort ist falsch' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await PortalUser.findByIdAndUpdate(decoded.userId, {
      password: hashedPassword,
      updatedAt: new Date()
    });

    res.status(200).json({
      success: true,
      message: 'Passwort erfolgreich geändert'
    });
  } catch (error) {
    console.error('Password change error:', error);
    
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token ungültig oder abgelaufen' });
    }
    
    res.status(500).json({ error: 'Server-Fehler beim Ändern des Passworts' });
  }
}
