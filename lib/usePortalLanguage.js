/**
 * usePortalLanguage Hook
 * Verwaltet die Spracheinstellung für das Portal
 * 
 * Features:
 * - Speichert Sprache in localStorage
 * - Sprache bleibt beim Seitenwechsel erhalten
 * - Unterstützt: DE, EN, ES (erweiterbar)
 * 
 * Erweiterung für neue Sprachen:
 * 1. Sprache zu SUPPORTED_LANGUAGES hinzufügen
 * 2. Übersetzungen in den Portal-Seiten ergänzen
 * 3. Fertig!
 */

import { useState, useEffect } from 'react';

// Unterstützte Sprachen - hier neue Sprachen hinzufügen
export const SUPPORTED_LANGUAGES = ['de', 'en', 'es'];

// Standard-Sprache
export const DEFAULT_LANGUAGE = 'en';

// localStorage Key
const STORAGE_KEY = 'portal-language';

/**
 * Hook für Portal-Sprache
 * @returns {{ lang: string, setLang: function, supportedLanguages: string[] }}
 */
export function usePortalLanguage() {
  const [lang, setLangState] = useState(DEFAULT_LANGUAGE);
  const [isLoaded, setIsLoaded] = useState(false);

  // Beim ersten Laden: Sprache aus localStorage holen
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem(STORAGE_KEY);
      if (savedLang && SUPPORTED_LANGUAGES.includes(savedLang)) {
        setLangState(savedLang);
      }
      setIsLoaded(true);
    }
  }, []);

  // Sprache setzen und in localStorage speichern
  const setLang = (newLang) => {
    if (SUPPORTED_LANGUAGES.includes(newLang)) {
      setLangState(newLang);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, newLang);
      }
    }
  };

  return {
    lang,
    setLang,
    isLoaded,
    supportedLanguages: SUPPORTED_LANGUAGES
  };
}

export default usePortalLanguage;
