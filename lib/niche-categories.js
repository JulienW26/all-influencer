/**
 * Nischen-Kategorien für ALL INFLUENCER
 * 
 * 8 Haupt-Kategorien + 1 "Sonstiges" mit Custom-Text
 * Influencer müssen 1-3 Kategorien wählen
 */

// Minimale und maximale Anzahl Nischen
export const NICHE_MIN = 1;
export const NICHE_MAX = 3;

// Alle verfügbaren Nischen-Kategorien
export const NICHE_CATEGORIES = [
  {
    id: 'fashion',
    icon: '👗',
    label: {
      de: 'Mode & Styling',
      en: 'Fashion & Styling',
      es: 'Moda y Estilo'
    }
  },
  {
    id: 'beauty',
    icon: '💄',
    label: {
      de: 'Beauty & Hautpflege',
      en: 'Beauty & Skincare',
      es: 'Belleza y Cuidado'
    }
  },
  {
    id: 'lifestyle',
    icon: '✨',
    label: {
      de: 'Lifestyle',
      en: 'Lifestyle',
      es: 'Estilo de Vida'
    }
  },
  {
    id: 'gaming',
    icon: '🎮',
    label: {
      de: 'Gaming & Entertainment',
      en: 'Gaming & Entertainment',
      es: 'Gaming y Entretenimiento'
    }
  },
  {
    id: 'travel',
    icon: '✈️',
    label: {
      de: 'Reisen & Abenteuer',
      en: 'Travel & Adventure',
      es: 'Viajes y Aventura'
    }
  },
  {
    id: 'fitness',
    icon: '💪',
    label: {
      de: 'Fitness, Gesundheit & Wellness',
      en: 'Fitness, Health & Wellness',
      es: 'Fitness, Salud y Bienestar'
    }
  },
  {
    id: 'food',
    icon: '🍳',
    label: {
      de: 'Food & Kulinarik',
      en: 'Food & Culinary',
      es: 'Comida y Gastronomía'
    }
  },
  {
    id: 'tech',
    icon: '📱',
    label: {
      de: 'Tech & Gadgets',
      en: 'Tech & Gadgets',
      es: 'Tecnología y Gadgets'
    }
  },
  {
    id: 'other',
    icon: '📌',
    label: {
      de: 'Sonstiges',
      en: 'Other',
      es: 'Otros'
    }
  }
];

/**
 * Nische nach ID finden
 */
export function getNicheById(id) {
  return NICHE_CATEGORIES.find(n => n.id === id) || null;
}

/**
 * Nischen-Label in bestimmter Sprache
 */
export function getNicheLabel(id, lang = 'de') {
  const niche = getNicheById(id);
  if (!niche) return id;
  return niche.label[lang] || niche.label.de;
}

/**
 * Nischen-Icon
 */
export function getNicheIcon(id) {
  const niche = getNicheById(id);
  return niche?.icon || '📌';
}

/**
 * Prüfen ob "other" in den Kategorien ist
 */
export function hasOtherNiche(categories) {
  if (!Array.isArray(categories)) return false;
  return categories.includes('other');
}

/**
 * Nischen-Auswahl validieren
 */
export function validateNicheSelection(categories, customNiche = null) {
  const errors = [];
  
  // Array-Check
  if (!Array.isArray(categories)) {
    errors.push({
      de: 'Ungültiges Nischen-Format',
      en: 'Invalid niche format',
      es: 'Formato de nicho inválido'
    });
    return { valid: false, errors };
  }
  
  // Mindestens 1
  if (categories.length < NICHE_MIN) {
    errors.push({
      de: `Mindestens ${NICHE_MIN} Nische erforderlich`,
      en: `At least ${NICHE_MIN} niche required`,
      es: `Se requiere al menos ${NICHE_MIN} nicho`
    });
  }
  
  // Maximal 3
  if (categories.length > NICHE_MAX) {
    errors.push({
      de: `Maximal ${NICHE_MAX} Nischen erlaubt`,
      en: `Maximum ${NICHE_MAX} niches allowed`,
      es: `Máximo ${NICHE_MAX} nichos permitidos`
    });
  }
  
  // Gültige IDs
  const validIds = NICHE_CATEGORIES.map(n => n.id);
  const invalidCategories = categories.filter(c => !validIds.includes(c));
  if (invalidCategories.length > 0) {
    errors.push({
      de: `Ungültige Nische(n): ${invalidCategories.join(', ')}`,
      en: `Invalid niche(s): ${invalidCategories.join(', ')}`,
      es: `Nicho(s) inválido(s): ${invalidCategories.join(', ')}`
    });
  }
  
  // Custom-Nische bei "other"
  if (hasOtherNiche(categories) && (!customNiche || !customNiche.trim())) {
    errors.push({
      de: 'Bitte eigene Nische angeben',
      en: 'Please specify your custom niche',
      es: 'Por favor especifica tu nicho personalizado'
    });
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

export default NICHE_CATEGORIES;
