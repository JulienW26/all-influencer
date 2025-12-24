/**
 * Login API Route
 */

import { validateCredentials, setSessionCookie } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Benutzername und Passwort erforderlich' });
  }

  try {
    const result = await validateCredentials(username, password);
    
    if (!result.valid) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return res.status(401).json({ error: 'Ungültige Anmeldedaten' });
    }

    setSessionCookie(res, result.username);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Erfolgreich angemeldet',
      username: result.username
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Interner Serverfehler' });
  }
}
