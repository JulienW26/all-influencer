/**
 * useAdminLanguage Hook
 * Verwaltet die Admin-Dashboard-Sprache mit Cookie-Speicherung
 * 
 * Standard: Englisch (en)
 * Optional: Deutsch (de)
 */

import { useState, useEffect, useCallback } from 'react';

// Cookie Name
const COOKIE_NAME = 'admin_language';
const DEFAULT_LANGUAGE = 'en';

/**
 * Cookie setzen
 */
function setCookie(name, value, days = 365) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

/**
 * Cookie lesen
 */
function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop().split(';').shift());
  }
  return null;
}

/**
 * Hook zum Verwenden der Sprache
 */
export function useAdminLanguage() {
  const [lang, setLangState] = useState(DEFAULT_LANGUAGE);
  const [mounted, setMounted] = useState(false);

  // Sprache aus Cookie laden beim Mount
  useEffect(() => {
    const savedLang = getCookie(COOKIE_NAME);
    if (savedLang && (savedLang === 'en' || savedLang === 'de')) {
      setLangState(savedLang);
    }
    setMounted(true);
  }, []);

  // Sprache setzen und in Cookie speichern
  const setLang = useCallback((newLang) => {
    if (newLang === 'en' || newLang === 'de') {
      setLangState(newLang);
      setCookie(COOKIE_NAME, newLang);
    }
  }, []);

  // Toggle zwischen EN und DE
  const toggleLanguage = useCallback(() => {
    const newLang = lang === 'en' ? 'de' : 'en';
    setLang(newLang);
  }, [lang, setLang]);

  return {
    lang,
    setLang,
    isGerman: lang === 'de',
    isEnglish: lang === 'en',
    toggleLanguage,
    mounted,
  };
}

export default useAdminLanguage;
