/**
 * JWT Authentication Helper
 * Für All-Influencer Portal
 */

import jwt from 'jsonwebtoken';
import { parse, serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = 'portal_token';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 Tage

/**
 * JWT Token erstellen
 */
export function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

/**
 * JWT Token verifizieren
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

/**
 * Token Cookie setzen
 */
export function setTokenCookie(res, token) {
  const cookie = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  });
  res.setHeader('Set-Cookie', cookie);
}

/**
 * Token Cookie löschen
 */
export function clearTokenCookie(res) {
  const cookie = serialize(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
  res.setHeader('Set-Cookie', cookie);
}

/**
 * Token aus Request holen
 */
export function getTokenFromRequest(req) {
  const cookies = parse(req.headers.cookie || '');
  return cookies[COOKIE_NAME] || null;
}

/**
 * Benutzer aus Request holen
 */
export function getUserFromRequest(req) {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  return verifyToken(token);
}

/**
 * Auth Middleware für API Routes
 */
export function requirePortalAuth(handler) {
  return async (req, res) => {
    const user = getUserFromRequest(req);
    if (!user) {
      return res.status(401).json({ error: 'Nicht authentifiziert' });
    }
    req.user = user;
    return handler(req, res);
  };
}

export default {
  createToken,
  verifyToken,
  setTokenCookie,
  clearTokenCookie,
  getTokenFromRequest,
  getUserFromRequest,
  requirePortalAuth,
};
