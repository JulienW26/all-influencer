/**
 * Auth Helper für All-Influencer Admin
 */

import crypto from 'crypto';
import { parse, serialize } from 'cookie';

const COOKIE_NAME = 'ai_admin_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;
const SALT = 'all-influencer-salt-2024';

export function hashPassword(password) {
  return crypto.createHash('sha256').update(password + SALT).digest('hex');
}

export async function verifyPassword(password, hashedPassword) {
  const hash = hashPassword(password);
  return hash === hashedPassword;
}

function createSessionToken(username) {
  const timestamp = Date.now();
  const data = `${username}:${timestamp}`;
  return Buffer.from(data).toString('base64');
}

function decodeSessionToken(token) {
  try {
    const data = Buffer.from(token, 'base64').toString('utf-8');
    const [username, timestamp] = data.split(':');
    return { username, timestamp: parseInt(timestamp) };
  } catch {
    return null;
  }
}

export function setSessionCookie(res, username) {
  const token = createSessionToken(username);
  const cookie = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });
  res.setHeader('Set-Cookie', cookie);
}

export function clearSessionCookie(res) {
  const cookie = serialize(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
  res.setHeader('Set-Cookie', cookie);
}

export function getSession(req) {
  const cookies = parse(req.headers.cookie || '');
  const token = cookies[COOKIE_NAME];
  if (!token) return null;
  const session = decodeSessionToken(token);
  if (!session) return null;
  const maxAge = SESSION_MAX_AGE * 1000;
  if (Date.now() - session.timestamp > maxAge) {
    return null;
  }
  return session;
}

export function requireAuth(handler) {
  return async (req, res) => {
    const session = getSession(req);
    if (!session) {
      return res.status(401).json({ error: 'Nicht authentifiziert' });
    }
    req.user = session;
    return handler(req, res);
  };
}

export async function validateCredentials(username, password) {
  if (username === process.env.ADMIN_USER_1) {
    const hash = process.env.ADMIN_HASH_1;
    if (hash && await verifyPassword(password, hash)) {
      return { valid: true, username };
    }
  }
  if (username === process.env.ADMIN_USER_2) {
    const hash = process.env.ADMIN_HASH_2;
    if (hash && await verifyPassword(password, hash)) {
      return { valid: true, username };
    }
  }
  return { valid: false };
}
