/**
 * Logout API Route
 */

import { clearSessionCookie } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    clearSessionCookie(res);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Erfolgreich abgemeldet'
    });
    
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ error: 'Interner Serverfehler' });
  }
}
