/**
 * Session Check API Route
 */

import { getSession } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = getSession(req);
  
  if (!session) {
    return res.status(401).json({ authenticated: false });
  }
  
  return res.status(200).json({ 
    authenticated: true,
    username: session.username
  });
}
