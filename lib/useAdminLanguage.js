/**
 * useAdminLanguage Hook
 * Verwaltet die Admin-Dashboard-Sprache mit Cookie-Speicherung
 */

import { useState, useEffect, useCallback } from 'react';
import { getTranslation } from './admin-translations';

const COOKIE_NAME = 'admin_language';
const DEFAULT_LANGUAGE = 'en';

function setCookie(name, value, days = 365) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop().split(';').shift());
  }
  return null;
}

export function useAdminLanguage() {
  const [lang, setLangState] = useState(DEFAULT_LANGUAGE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = getCookie(COOKIE_NAME);
    if (savedLang && (savedLang === 'en' || savedLang === 'de')) {
      setLangState(savedLang);
    }
    setMounted(true);
  }, []);

  const setLang = useCallback((newLang) => {
    if (newLang === 'en' || newLang === 'de') {
      setLangState(newLang);
      setCookie(COOKIE_NAME, newLang);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    const newLang = lang === 'en' ? 'de' : 'en';
    setLang(newLang);
  }, [lang, setLang]);

  const t = useCallback((section) => {
    return getTranslation(section, lang);
  }, [lang]);

  return {
    lang,
    setLang,
    isGerman: lang === 'de',
    isEnglish: lang === 'en',
    toggleLanguage,
    mounted,
    t,
  };
}

export default useAdminLanguage;
