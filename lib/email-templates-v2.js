/**
 * E-Mail Templates V3 - Alle Sprachen und Kategorien
 * 
 * Enthält:
 * - Alte Templates (Cold Outreach - kurz)
 * - NEU: Entwurf 1 "Das Eigentümer-Modell" (Diamond/Platin)
 * - NEU: Entwurf 2 "Inner Circle Einladung" (Gold/Rising Star)
 * 
 * Alle Templates in DE, EN, ES
 */

// ============================================================================
// UI ÜBERSETZUNGEN
// ============================================================================

export const ui = {
  de: {
    title: "E-Mail Templates",
    langLabel: "🌐 Sprache wählen:",
    catLabel: "👑 Kategorie wählen:",
    templateLabel: "📧 Template wählen:",
    personalTitle: "✏️ Personalisierung:",
    nameLabel: "Vorname des Influencers:",
    namePlaceholder: "z.B. Max",
    spotLabel: "Spot-Nummer:",
    spotPlaceholder: "z.B. 42",
    brevoLabel: "Für Brevo/Resend:",
    brevoBtn: "Codes einfügen",
    editLabel: "Text bearbeiten",
    editTitle: "📝 Texte anpassen:",
    editHint: "Ändere die Texte und sieh die Vorschau live aktualisiert.",
    editSubject: "Betreffzeile:",
    editGreeting: "Begrüßung:",
    editIntro: "Einleitung:",
    editHighlight: "Highlight-Box:",
    editCta: "CTA Text:",
    editButton: "Button-Text:",
    editPs: "P.S.:",
    resetBtn: "↺ Auf Original zurücksetzen",
    subjectLabel: "📧 Betreffzeile:",
    copyHtml: "📋 HTML kopieren",
    copyText: "📝 Nur Text",
    download: "💾 Download",
    previewLabel: "👁️ Vorschau:",
    instructionsTitle: "📚 Anleitung",
    instructions: [
      "Wähle die Sprache (DE/EN/ES)",
      "Wähle die Kategorie (Diamond/Platin/Gold/Rising Star)",
      "Wähle das Template (Kurz oder Ausführlich)",
      "Gib den Vornamen und die Spot-Nummer ein",
      "Optional: Klicke 'Text bearbeiten' um Inhalte anzupassen",
      "Kopiere den HTML-Code oder lade die Datei herunter"
    ],
    copied: "✅ Kopiert!",
    copiedSubject: "Betreffzeile kopiert!",
    textCopied: "Text kopiert!",
    senderTitle: "Geschäftsführer"
  },
  en: {
    title: "Email Templates",
    langLabel: "🌐 Select language:",
    catLabel: "👑 Select category:",
    templateLabel: "📧 Select template:",
    personalTitle: "✏️ Personalization:",
    nameLabel: "Influencer's first name:",
    namePlaceholder: "e.g. Max",
    spotLabel: "Spot number:",
    spotPlaceholder: "e.g. 42",
    brevoLabel: "For Brevo/Resend:",
    brevoBtn: "Insert codes",
    editLabel: "Edit text",
    editTitle: "📝 Customize texts:",
    editHint: "Change the texts and see the preview update live.",
    editSubject: "Subject line:",
    editGreeting: "Greeting:",
    editIntro: "Introduction:",
    editHighlight: "Highlight box:",
    editCta: "CTA text:",
    editButton: "Button text:",
    editPs: "P.S.:",
    resetBtn: "↺ Reset to original",
    subjectLabel: "📧 Subject line:",
    copyHtml: "📋 Copy HTML",
    copyText: "📝 Text only",
    download: "💾 Download",
    previewLabel: "👁️ Preview:",
    instructionsTitle: "📚 Instructions",
    instructions: [
      "Select the language (DE/EN/ES)",
      "Select the category (Diamond/Platinum/Gold/Rising Star)",
      "Select the template (Short or Detailed)",
      "Enter the first name and spot number",
      "Optional: Click 'Edit text' to customize content",
      "Copy the HTML code or download the file"
    ],
    copied: "✅ Copied!",
    copiedSubject: "Subject line copied!",
    textCopied: "Text copied!",
    senderTitle: "CEO"
  },
  es: {
    title: "Plantillas de Email",
    langLabel: "🌐 Seleccionar idioma:",
    catLabel: "👑 Seleccionar categoría:",
    templateLabel: "📧 Seleccionar plantilla:",
    personalTitle: "✏️ Personalización:",
    nameLabel: "Nombre del influencer:",
    namePlaceholder: "ej. Max",
    spotLabel: "Número de spot:",
    spotPlaceholder: "ej. 42",
    brevoLabel: "Para Brevo/Resend:",
    brevoBtn: "Insertar códigos",
    editLabel: "Editar texto",
    editTitle: "📝 Personalizar textos:",
    editHint: "Cambia los textos y ve la vista previa actualizarse en vivo.",
    editSubject: "Línea de asunto:",
    editGreeting: "Saludo:",
    editIntro: "Introducción:",
    editHighlight: "Caja destacada:",
    editCta: "Texto CTA:",
    editButton: "Texto del botón:",
    editPs: "P.D.:",
    resetBtn: "↺ Restablecer al original",
    subjectLabel: "📧 Línea de asunto:",
    copyHtml: "📋 Copiar HTML",
    copyText: "📝 Solo texto",
    download: "💾 Descargar",
    previewLabel: "👁️ Vista previa:",
    instructionsTitle: "📚 Instrucciones",
    instructions: [
      "Selecciona el idioma (DE/EN/ES)",
      "Selecciona la categoría (Diamond/Platino/Gold/Rising Star)",
      "Selecciona la plantilla (Corta o Detallada)",
      "Ingresa el nombre y el número de spot",
      "Opcional: Haz clic en 'Editar texto' para personalizar",
      "Copia el código HTML o descarga el archivo"
    ],
    copied: "✅ ¡Copiado!",
    copiedSubject: "¡Asunto copiado!",
    textCopied: "¡Texto copiado!",
    senderTitle: "CEO"
  }
};

// ============================================================================
// TEMPLATE TYPEN
// ============================================================================

export const templateTypes = [
  { id: 'short', label: { de: '⚡ Kurz (Original)', en: '⚡ Short (Original)', es: '⚡ Corto (Original)' } },
  { id: 'detailed', label: { de: '📄 Ausführlich (Neu)', en: '📄 Detailed (New)', es: '📄 Detallado (Nuevo)' } }
];

// ============================================================================
// KATEGORIEN
// ============================================================================

export const categories = [
  { id: 'diamond', label: '💎 Diamond (20M+)' },
  { id: 'platin', label: '💠 Platin (10M+)' },
  { id: 'gold', label: '🥇 Gold (5M+)' },
  { id: 'rising', label: '⭐ Rising Star (1M+)' }
];

export const languages = [
  { id: 'de', label: '🇩🇪 Deutsch' },
  { id: 'en', label: '🇬🇧 English' },
  { id: 'es', label: '🇪🇸 Español' }
];

// ============================================================================
// ALTE TEMPLATES (KURZ) - V2 kompatibel
// ============================================================================

export const templatesShort = {
  de: {
    diamond: {
      subject: "Eigentum statt Bezahlung – Einladung für {{NAME}}",
      greeting: "Liebe/r {{NAME}},",
      intro: "Du baust Reichweite. Du lieferst Performance. Aber das Vermögen? Das landet bei den Plattformen.",
      highlight: "All-Influencer.com ändert das: Die erste Premium-Plattform, bei der Creator Miteigentümer werden.",
      modelTitle: "Das Modell:",
      model: [
        "333 Spots weltweit – exklusiv für das Top 1% (ab 1M Followers). Keine Masse. Brands finden nicht irgendwen – sie finden die Besten.",
        "80% Cash bei jedem vermittelten Auftrag direkt an dich.",
        "20% werden zu Anteilen – du baust Vermögen auf, während du arbeitest.",
        "Anti-Verwässerungsschutz in der Satzung: Creator + Gründer = dauerhafte Mehrheit."
      ],
      benefitsTitle: "Dein Gründervorteil (nur die ersten 100):",
      benefits: [
        "24 Monate komplett kostenfrei (regulär: 5.000–10.000€/Monat)",
        "Anteilskauf zum Gründungspreis: 50€/Anteil",
        "Kaufoption für 24 Monate garantiert"
      ],
      ctaTitle: "Der nächste Schritt:",
      ctaText: "Ich würde dir das Modell gern in 15 Minuten persönlich erklären. Alternativ kannst du direkt eine unverbindliche Absichtserklärung abgeben:",
      buttonText: "Unverbindlichen LOI ausfüllen (2 Min) →",
      spotText: "Spot #{{SPOT}} ist für dich reserviert.",
      closing: "In echter Partnerschaft,",
      ps: "P.S.: Nach Platz #100 zahlt jeder ab Tag 1. Die Gründungsphase ist zeitlich begrenzt."
    },
    platin: {
      subject: "Eigentum statt Bezahlung – Einladung für {{NAME}}",
      greeting: "Liebe/r {{NAME}},",
      intro: "Du baust Reichweite. Du lieferst Performance. Aber das Vermögen? Das landet bei den Plattformen.",
      highlight: "All-Influencer.com ändert das: Die erste Premium-Plattform, bei der Creator Miteigentümer werden.",
      modelTitle: "Das Modell:",
      model: [
        "333 Spots weltweit – exklusiv für das Top 1% (ab 1M Followers). Keine Masse. Brands finden nicht irgendwen – sie finden die Besten.",
        "80% Cash bei jedem vermittelten Auftrag direkt an dich.",
        "20% werden zu Anteilen – du baust Vermögen auf, während du arbeitest.",
        "Anti-Verwässerungsschutz in der Satzung: Creator + Gründer = dauerhafte Mehrheit."
      ],
      benefitsTitle: "Dein Gründervorteil (nur die ersten 100):",
      benefits: [
        "24 Monate komplett kostenfrei (regulär: 5.000–10.000€/Monat)",
        "Anteilskauf zum Gründungspreis: 50€/Anteil",
        "Kaufoption für 24 Monate garantiert"
      ],
      ctaTitle: "Der nächste Schritt:",
      ctaText: "Ich würde dir das Modell gern in 15 Minuten persönlich erklären. Alternativ kannst du direkt eine unverbindliche Absichtserklärung abgeben:",
      buttonText: "Unverbindlichen LOI ausfüllen (2 Min) →",
      spotText: "Spot #{{SPOT}} ist für dich reserviert.",
      closing: "In echter Partnerschaft,",
      ps: "P.S.: Nach Platz #100 zahlt jeder ab Tag 1. Die Gründungsphase ist zeitlich begrenzt."
    },
    gold: {
      subject: "Private Einladung: Gründungsmitglied bei All-Influencer.com",
      greeting: "Liebe/r {{NAME}},",
      intro: "Es gibt Plattformen für jedermann. Und dann gibt es All-Influencer.com – die Plattform für das Top 1%.",
      highlight: "Du bist eingeladen, Teil einer geschlossenen Gruppe zu werden, in der nicht Followerzahl allein zählt – sondern Qualität, Impact und Potenzial.",
      modelTitle: "Was All-Influencer.com anders macht:",
      model: [
        "333 Premium-Spots weltweit – sichtbar, kuratiert, exklusiv.",
        "Du wirst Miteigentümer: 80% Cash direkt an dich. 20% wandeln sich in Anteile.",
        "Anti-Verwässerungsschutz: Creator + Gründer behalten die Mehrheit. Immer."
      ],
      benefitsTitle: "Dein Gründervorteil (nur die ersten 100):",
      benefits: [
        "24 Monate komplett kostenfrei (regulär: 250–1.000€/Monat)",
        "Anteilskauf zum Gründungspreis: 50€/Anteil",
        "2 Jahre Kaufrecht garantiert",
        "Lifetime Founder-Badge auf deinem Profil"
      ],
      ctaTitle: "Interesse?",
      ctaText: "Fülle eine unverbindliche Absichtserklärung aus – keine Verpflichtung, nur eine Interessensbekundung:",
      buttonText: "Unverbindlichen LOI ausfüllen (2 Min) →",
      spotText: "Spot #{{SPOT}} wartet auf dich.",
      closing: "Willkommen im Top 1%.",
      ps: "P.S.: Diese Einladung ging an eine handverlesene Gruppe. Nach Platz #100 zahlt jeder Neue ab Tag 1."
    },
    rising: {
      subject: "Private Einladung: Gründungsmitglied bei All-Influencer.com",
      greeting: "Liebe/r {{NAME}},",
      intro: "Es gibt Plattformen für jedermann. Und dann gibt es All-Influencer.com – die Plattform für das Top 1%.",
      highlight: "Du bist eingeladen, Teil einer geschlossenen Gruppe zu werden, in der nicht Followerzahl allein zählt – sondern Qualität, Impact und Potenzial.",
      modelTitle: "Was All-Influencer.com anders macht:",
      model: [
        "333 Premium-Spots weltweit – sichtbar, kuratiert, exklusiv.",
        "Du wirst Miteigentümer: 80% Cash direkt an dich. 20% wandeln sich in Anteile.",
        "Anti-Verwässerungsschutz: Creator + Gründer behalten die Mehrheit. Immer."
      ],
      benefitsTitle: "Dein Gründervorteil (nur die ersten 100):",
      benefits: [
        "24 Monate komplett kostenfrei (regulär: 250–1.000€/Monat)",
        "Anteilskauf zum Gründungspreis: 50€/Anteil",
        "2 Jahre Kaufrecht garantiert",
        "Lifetime Founder-Badge auf deinem Profil"
      ],
      ctaTitle: "Interesse?",
      ctaText: "Fülle eine unverbindliche Absichtserklärung aus – keine Verpflichtung, nur eine Interessensbekundung:",
      buttonText: "Unverbindlichen LOI ausfüllen (2 Min) →",
      spotText: "Spot #{{SPOT}} wartet auf dich.",
      closing: "Willkommen im Top 1%.",
      ps: "P.S.: Diese Einladung ging an eine handverlesene Gruppe. Nach Platz #100 zahlt jeder Neue ab Tag 1."
    }
  },
  en: {
    diamond: {
      subject: "Ownership Instead of Payment – Invitation for {{NAME}}",
      greeting: "Dear {{NAME}},",
      intro: "You build reach. You deliver performance. But the wealth? It ends up with the platforms.",
      highlight: "All-Influencer.com changes that: The first premium platform where creators become co-owners.",
      modelTitle: "The Model:",
      model: [
        "333 spots worldwide – exclusively for the top 1% (1M+ followers). No masses. Brands don't find just anyone – they find the best.",
        "80% cash from every brokered deal directly to you.",
        "20% becomes equity – you build wealth while you work.",
        "Anti-dilution protection in our bylaws: Creators + Founders = permanent majority."
      ],
      benefitsTitle: "Your Founder Advantage (first 100 only):",
      benefits: [
        "24 months completely free (regular: €5,000–10,000/month)",
        "Share purchase at founder price: €50/share",
        "Purchase option guaranteed for 24 months"
      ],
      ctaTitle: "Next Step:",
      ctaText: "I'd love to explain the model to you personally in 15 minutes. Alternatively, you can submit a non-binding letter of intent:",
      buttonText: "Fill Out Non-Binding LOI (2 Min) →",
      spotText: "Spot #{{SPOT}} is reserved for you.",
      closing: "In true partnership,",
      ps: "P.S.: After spot #100, everyone pays from day 1. The founding phase is time-limited."
    },
    platin: {
      subject: "Ownership Instead of Payment – Invitation for {{NAME}}",
      greeting: "Dear {{NAME}},",
      intro: "You build reach. You deliver performance. But the wealth? It ends up with the platforms.",
      highlight: "All-Influencer.com changes that: The first premium platform where creators become co-owners.",
      modelTitle: "The Model:",
      model: [
        "333 spots worldwide – exclusively for the top 1% (1M+ followers). No masses. Brands don't find just anyone – they find the best.",
        "80% cash from every brokered deal directly to you.",
        "20% becomes equity – you build wealth while you work.",
        "Anti-dilution protection in our bylaws: Creators + Founders = permanent majority."
      ],
      benefitsTitle: "Your Founder Advantage (first 100 only):",
      benefits: [
        "24 months completely free (regular: €5,000–10,000/month)",
        "Share purchase at founder price: €50/share",
        "Purchase option guaranteed for 24 months"
      ],
      ctaTitle: "Next Step:",
      ctaText: "I'd love to explain the model to you personally in 15 minutes. Alternatively, you can submit a non-binding letter of intent:",
      buttonText: "Fill Out Non-Binding LOI (2 Min) →",
      spotText: "Spot #{{SPOT}} is reserved for you.",
      closing: "In true partnership,",
      ps: "P.S.: After spot #100, everyone pays from day 1. The founding phase is time-limited."
    },
    gold: {
      subject: "Private Invitation: Founding Member at All-Influencer.com",
      greeting: "Dear {{NAME}},",
      intro: "There are platforms for everyone. And then there's All-Influencer.com – the platform for the top 1%.",
      highlight: "You're invited to join an exclusive group where it's not just follower count that matters – but quality, impact, and potential.",
      modelTitle: "What Makes All-Influencer.com Different:",
      model: [
        "333 premium spots worldwide – visible, curated, exclusive.",
        "You become a co-owner: 80% cash directly to you. 20% converts to equity.",
        "Anti-dilution protection: Creators + Founders keep the majority. Always."
      ],
      benefitsTitle: "Your Founder Advantage (first 100 only):",
      benefits: [
        "24 months completely free (regular: €250–1,000/month)",
        "Share purchase at founder price: €50/share",
        "2-year purchase right guaranteed",
        "Lifetime Founder Badge on your profile"
      ],
      ctaTitle: "Interested?",
      ctaText: "Fill out a non-binding letter of intent – no obligation, just an expression of interest:",
      buttonText: "Fill Out Non-Binding LOI (2 Min) →",
      spotText: "Spot #{{SPOT}} is waiting for you.",
      closing: "Welcome to the top 1%.",
      ps: "P.S.: This invitation went to a hand-picked group. After spot #100, every new member pays from day 1."
    },
    rising: {
      subject: "Private Invitation: Founding Member at All-Influencer.com",
      greeting: "Dear {{NAME}},",
      intro: "There are platforms for everyone. And then there's All-Influencer.com – the platform for the top 1%.",
      highlight: "You're invited to join an exclusive group where it's not just follower count that matters – but quality, impact, and potential.",
      modelTitle: "What Makes All-Influencer.com Different:",
      model: [
        "333 premium spots worldwide – visible, curated, exclusive.",
        "You become a co-owner: 80% cash directly to you. 20% converts to equity.",
        "Anti-dilution protection: Creators + Founders keep the majority. Always."
      ],
      benefitsTitle: "Your Founder Advantage (first 100 only):",
      benefits: [
        "24 months completely free (regular: €250–1,000/month)",
        "Share purchase at founder price: €50/share",
        "2-year purchase right guaranteed",
        "Lifetime Founder Badge on your profile"
      ],
      ctaTitle: "Interested?",
      ctaText: "Fill out a non-binding letter of intent – no obligation, just an expression of interest:",
      buttonText: "Fill Out Non-Binding LOI (2 Min) →",
      spotText: "Spot #{{SPOT}} is waiting for you.",
      closing: "Welcome to the top 1%.",
      ps: "P.S.: This invitation went to a hand-picked group. After spot #100, every new member pays from day 1."
    }
  },
  es: {
    diamond: {
      subject: "Propiedad en Lugar de Pago – Invitación para {{NAME}}",
      greeting: "Querido/a {{NAME}},",
      intro: "Tú construyes el alcance. Tú entregas el rendimiento. ¿Pero la riqueza? Termina en las plataformas.",
      highlight: "All-Influencer.com cambia eso: La primera plataforma premium donde los creadores se convierten en copropietarios.",
      modelTitle: "El Modelo:",
      model: [
        "333 spots en todo el mundo – exclusivamente para el top 1% (1M+ seguidores). Sin masas. Las marcas no encuentran a cualquiera – encuentran a los mejores.",
        "80% en efectivo de cada trato intermediado directamente a ti.",
        "20% se convierte en acciones – construyes riqueza mientras trabajas.",
        "Protección anti-dilución en nuestros estatutos: Creadores + Fundadores = mayoría permanente."
      ],
      benefitsTitle: "Tu Ventaja de Fundador (solo los primeros 100):",
      benefits: [
        "24 meses completamente gratis (regular: €5.000–10.000/mes)",
        "Compra de acciones al precio fundador: €50/acción",
        "Opción de compra garantizada por 24 meses"
      ],
      ctaTitle: "Siguiente Paso:",
      ctaText: "Me encantaría explicarte el modelo personalmente en 15 minutos. Alternativamente, puedes enviar una carta de intención no vinculante:",
      buttonText: "Completar LOI no vinculante (2 min) →",
      spotText: "El Spot #{{SPOT}} está reservado para ti.",
      closing: "En verdadera asociación,",
      ps: "P.D.: Después del puesto #100, todos pagan desde el día 1. La fase de fundación es limitada."
    },
    platin: {
      subject: "Propiedad en Lugar de Pago – Invitación para {{NAME}}",
      greeting: "Querido/a {{NAME}},",
      intro: "Tú construyes el alcance. Tú entregas el rendimiento. ¿Pero la riqueza? Termina en las plataformas.",
      highlight: "All-Influencer.com cambia eso: La primera plataforma premium donde los creadores se convierten en copropietarios.",
      modelTitle: "El Modelo:",
      model: [
        "333 spots en todo el mundo – exclusivamente para el top 1% (1M+ seguidores). Sin masas. Las marcas no encuentran a cualquiera – encuentran a los mejores.",
        "80% en efectivo de cada trato intermediado directamente a ti.",
        "20% se convierte en acciones – construyes riqueza mientras trabajas.",
        "Protección anti-dilución en nuestros estatutos: Creadores + Fundadores = mayoría permanente."
      ],
      benefitsTitle: "Tu Ventaja de Fundador (solo los primeros 100):",
      benefits: [
        "24 meses completamente gratis (regular: €5.000–10.000/mes)",
        "Compra de acciones al precio fundador: €50/acción",
        "Opción de compra garantizada por 24 meses"
      ],
      ctaTitle: "Siguiente Paso:",
      ctaText: "Me encantaría explicarte el modelo personalmente en 15 minutos. Alternativamente, puedes enviar una carta de intención no vinculante:",
      buttonText: "Completar LOI no vinculante (2 min) →",
      spotText: "El Spot #{{SPOT}} está reservado para ti.",
      closing: "En verdadera asociación,",
      ps: "P.D.: Después del puesto #100, todos pagan desde el día 1. La fase de fundación es limitada."
    },
    gold: {
      subject: "Invitación Privada: Miembro Fundador en All-Influencer.com",
      greeting: "Querido/a {{NAME}},",
      intro: "Hay plataformas para todos. Y luego está All-Influencer.com – la plataforma para el top 1%.",
      highlight: "Estás invitado/a a unirte a un grupo exclusivo donde importa la calidad, el impacto y el potencial – no solo los seguidores.",
      modelTitle: "Qué hace diferente a All-Influencer.com:",
      model: [
        "333 spots premium en todo el mundo – visibles, curados, exclusivos.",
        "Te conviertes en copropietario: 80% en efectivo directamente a ti. 20% se convierte en acciones.",
        "Protección anti-dilución: Creadores + Fundadores mantienen la mayoría. Siempre."
      ],
      benefitsTitle: "Tu Ventaja de Fundador (solo los primeros 100):",
      benefits: [
        "24 meses completamente gratis (regular: €250–1.000/mes)",
        "Compra de acciones al precio fundador: €50/acción",
        "Opción de compra de 2 años garantizada",
        "Insignia de Fundador de por vida en tu perfil"
      ],
      ctaTitle: "¿Interesado/a?",
      ctaText: "Completa una carta de intención no vinculante – sin obligación, solo una expresión de interés:",
      buttonText: "Completar LOI no vinculante (2 min) →",
      spotText: "El Spot #{{SPOT}} te está esperando.",
      closing: "Bienvenido/a al top 1%.",
      ps: "P.D.: Esta invitación fue a un grupo seleccionado. Después del puesto #100, cada nuevo miembro paga desde el día 1."
    },
    rising: {
      subject: "Invitación Privada: Miembro Fundador en All-Influencer.com",
      greeting: "Querido/a {{NAME}},",
      intro: "Hay plataformas para todos. Y luego está All-Influencer.com – la plataforma para el top 1%.",
      highlight: "Estás invitado/a a unirte a un grupo exclusivo donde importa la calidad, el impacto y el potencial – no solo los seguidores.",
      modelTitle: "Qué hace diferente a All-Influencer.com:",
      model: [
        "333 spots premium en todo el mundo – visibles, curados, exclusivos.",
        "Te conviertes en copropietario: 80% en efectivo directamente a ti. 20% se convierte en acciones.",
        "Protección anti-dilución: Creadores + Fundadores mantienen la mayoría. Siempre."
      ],
      benefitsTitle: "Tu Ventaja de Fundador (solo los primeros 100):",
      benefits: [
        "24 meses completamente gratis (regular: €250–1.000/mes)",
        "Compra de acciones al precio fundador: €50/acción",
        "Opción de compra de 2 años garantizada",
        "Insignia de Fundador de por vida en tu perfil"
      ],
      ctaTitle: "¿Interesado/a?",
      ctaText: "Completa una carta de intención no vinculante – sin obligación, solo una expresión de interés:",
      buttonText: "Completar LOI no vinculante (2 min) →",
      spotText: "El Spot #{{SPOT}} te está esperando.",
      closing: "Bienvenido/a al top 1%.",
      ps: "P.D.: Esta invitación fue a un grupo seleccionado. Después del puesto #100, cada nuevo miembro paga desde el día 1."
    }
  }
};

// ============================================================================
// NEUE TEMPLATES (AUSFÜHRLICH) - Entwurf 1 & 2
// ============================================================================

export const templatesDetailed = {
  de: {
    // Entwurf 1: Das Eigentümer-Modell (Diamond & Platin)
    diamond: {
      subject: "Gründungseinladung – Werde Miteigentümer von All-Influencer.com",
      greeting: "Liebe/r {{NAME}},",
      intro: "Die Plattform-Ökonomie hat ein strukturelles Problem: Du baust die Reichweite. Du lieferst die Performance. <strong>Aber das Vermögen landet woanders.</strong>",
      highlight: "Wir lösen dieses Problem – mit Beteiligung statt Bezahlung.",
      sections: [
        {
          title: "All-Influencer.com: Das Schaufenster gehört den Stars",
          content: "Wir bauen die erste Premium-Influencer-Plattform nach dem <strong>\"Own the Studio\"-Prinzip</strong>.\n\nWährend andere Plattformen Masse spielen, kuratieren wir Exzellenz:\n\n<strong>333 sichtbare Spots weltweit</strong> – ausschließlich für das Top 1% (ab 1 Million Followers). Keine endlosen Scroll-Listen. Brands finden nicht irgendwen – sie finden <strong>die Besten</strong>.\n\nUnd diese Besten? Das bist du. Und du wirst nicht nur präsentiert – du wirst <strong>Miteigentümer</strong>."
        },
        {
          title: "Das Umsatz-zu-Anteilen-Modell",
          list: [
            "<strong>80% direkt an dich:</strong> Du behältst den Löwenanteil jedes Deals.",
            "<strong>20% werden zu Unternehmensanteilen:</strong> Diese Provision baut nicht nur die Plattform – sie wandelt sich automatisch in Unternehmensanteile für dich."
          ],
          note: "Wichtig: Du bleibst völlig frei. Aufträge außerhalb der Plattform? Jederzeit. Aber hier verdienst du zweifach – heute Cash, morgen Vermögen."
        },
        {
          title: "Der Anti-Verwässerungs-Mechanismus",
          content: "Wir haben das <strong>Gründer-Matching-System</strong> in unsere Satzung geschrieben:",
          highlight: "\"Für jeden Anteil, der an Creator oder Partner ausgegeben wird, erhält das Gründungsteam einen identischen Anteil.\"",
          after: "Das Ergebnis: <strong>Creator (Du) + Platform-Team (Wir) = Dauerhafte Mehrheit.</strong>"
        }
      ],
      benefitsTitle: "Dein Gründungsvorteil – Die ersten 100",
      benefitsIntro: "Reguläre Kosten: 5.000€ - 10.000€ pro Monat",
      benefits: [
        "<strong>24 Monate komplett kostenfrei</strong> – volle Sichtbarkeit, null Gebühren",
        "<strong>Anteilskauf zum Gründungspreis:</strong> 50€ pro Anteil (z.B. Diamond: 240.000€ ÷ 50€ = 4.800 Anteile)",
        "<strong>24 Monate Kaufrecht:</strong> Du entscheidest innerhalb von zwei Jahren",
        "<strong>Bevorzugter Zugang</strong> zu den ersten Premium-Kampagnen"
      ],
      spotText: "Spot #{{SPOT}} wartet auf deine Aktivierung.",
      buttonText: "Gründer-Status aktivieren →",
      videoButtonText: "3-minütige Videoeinladung ansehen",
      closing: "In echter Partnerschaft,",
      ps: "P.S.: Nach Mitglied #100 endet die kostenfreie Phase. Alle weiteren zahlen ab dem ersten Monat – und erhalten Anteile erst durch vermittelte Aufträge, nicht durch vergünstigten Direktkauf."
    },
    platin: {
      subject: "Gründungseinladung – Werde Miteigentümer von All-Influencer.com",
      greeting: "Liebe/r {{NAME}},",
      intro: "Die Plattform-Ökonomie hat ein strukturelles Problem: Du baust die Reichweite. Du lieferst die Performance. <strong>Aber das Vermögen landet woanders.</strong>",
      highlight: "Wir lösen dieses Problem – mit Beteiligung statt Bezahlung.",
      sections: [
        {
          title: "All-Influencer.com: Das Schaufenster gehört den Stars",
          content: "Wir bauen die erste Premium-Influencer-Plattform nach dem <strong>\"Own the Studio\"-Prinzip</strong>.\n\nWährend andere Plattformen Masse spielen, kuratieren wir Exzellenz:\n\n<strong>333 sichtbare Spots weltweit</strong> – ausschließlich für das Top 1% (ab 1 Million Followers). Keine endlosen Scroll-Listen. Brands finden nicht irgendwen – sie finden <strong>die Besten</strong>.\n\nUnd diese Besten? Das bist du. Und du wirst nicht nur präsentiert – du wirst <strong>Miteigentümer</strong>."
        },
        {
          title: "Das Umsatz-zu-Anteilen-Modell",
          list: [
            "<strong>80% direkt an dich:</strong> Du behältst den Löwenanteil jedes Deals.",
            "<strong>20% werden zu Unternehmensanteilen:</strong> Diese Provision baut nicht nur die Plattform – sie wandelt sich automatisch in Unternehmensanteile für dich."
          ],
          note: "Wichtig: Du bleibst völlig frei. Aufträge außerhalb der Plattform? Jederzeit. Aber hier verdienst du zweifach – heute Cash, morgen Vermögen."
        },
        {
          title: "Der Anti-Verwässerungs-Mechanismus",
          content: "Wir haben das <strong>Gründer-Matching-System</strong> in unsere Satzung geschrieben:",
          highlight: "\"Für jeden Anteil, der an Creator oder Partner ausgegeben wird, erhält das Gründungsteam einen identischen Anteil.\"",
          after: "Das Ergebnis: <strong>Creator (Du) + Platform-Team (Wir) = Dauerhafte Mehrheit.</strong>"
        }
      ],
      benefitsTitle: "Dein Gründungsvorteil – Die ersten 100",
      benefitsIntro: "Reguläre Kosten: 5.000€ - 10.000€ pro Monat",
      benefits: [
        "<strong>24 Monate komplett kostenfrei</strong> – volle Sichtbarkeit, null Gebühren",
        "<strong>Anteilskauf zum Gründungspreis:</strong> 50€ pro Anteil (z.B. Platin: 120.000€ ÷ 50€ = 2.400 Anteile)",
        "<strong>24 Monate Kaufrecht:</strong> Du entscheidest innerhalb von zwei Jahren",
        "<strong>Bevorzugter Zugang</strong> zu den ersten Premium-Kampagnen"
      ],
      spotText: "Spot #{{SPOT}} wartet auf deine Aktivierung.",
      buttonText: "Gründer-Status aktivieren →",
      videoButtonText: "3-minütige Videoeinladung ansehen",
      closing: "In echter Partnerschaft,",
      ps: "P.S.: Nach Mitglied #100 endet die kostenfreie Phase. Alle weiteren zahlen ab dem ersten Monat – und erhalten Anteile erst durch vermittelte Aufträge, nicht durch vergünstigten Direktkauf."
    },
    // Entwurf 2: Inner Circle Einladung (Gold & Rising Star)
    gold: {
      subject: "Private Einladung – Gründungsmitglied bei All-Influencer.com (100 Spots)",
      greeting: "Liebe/r {{NAME}},",
      intro: "Es gibt Plattformen für jedermann. Und dann gibt es All-Influencer.com – <strong>die Plattform für das Top 1%.</strong>",
      highlight: "Du bist eingeladen, Teil einer geschlossenen Gruppe zu werden, in der nicht deine Followerzahl allein zählt, sondern Qualität, Impact und Potenzial.",
      sections: [
        {
          title: "Was All-Influencer.com anders macht",
          content: "Keine endlosen Profile. Keine Preiskämpfe. Keine Algorithmen, die dich verstecken.\n\nStattdessen: <strong>333 Premium-Spots weltweit</strong> – sichtbar, kuratiert, exklusiv.",
          categories: true,
          after: "Brands kommen zu uns nicht, um zu suchen – sondern um zu finden. Und sie zahlen <strong>Premium-Preise für Premium-Creator</strong>."
        },
        {
          title: "Das Umsatz-zu-Anteilen-System",
          content: "All-Influencer.com ist keine Agentur, die dir 30% abzieht. Wir sind ein Tech-Start-up, in dem <strong>du Miteigentümer wirst</strong>.",
          list: [
            "<strong>80% Cash direkt an dich:</strong> Bei jedem vermittelten Auftrag behältst du den Großteil sofort.",
            "<strong>20% werden zu Unternehmensanteilen:</strong> Je erfolgreicher du über uns arbeitest, desto mehr gehört dir vom Unternehmen."
          ],
          note: "Wichtig: Du bist nicht exklusiv gebunden. Aber hier baust du nebenbei echtes Vermögen auf."
        },
        {
          title: "Der Verwässerungsschutz",
          highlight: "Creator + Platform-Gründer = Strukturelle Mehrheit. Unmöglich für externe Investoren, die Kontrolle zu übernehmen."
        }
      ],
      benefitsTitle: "Dein Gründungsvorteil – Die ersten 100",
      benefitsIntro: "Reguläre Kosten: 250€ - 1.000€ pro Monat",
      benefits: [
        "<strong>24 Monate völlig kostenfrei</strong> – volle Präsenz, null Gebühren",
        "<strong>Anteilskauf zum Startpreis:</strong> 50€ pro Anteil (z.B. Gold: 24.000€ ÷ 50€ = 480 Anteile)",
        "<strong>2 Jahre Kaufrecht:</strong> Du hast die gesamte Laufzeit Zeit zu entscheiden",
        "<strong>Lifetime Founder-Badge</strong> auf deinem Profil – sichtbar für jede Brand"
      ],
      valueNote: "Regulärer Wert: 6.000€ - 24.000€ über 24 Monate. Dein Startpreis: 0€.",
      spotText: "Dein Spot #{{SPOT}} wartet auf Aktivierung.",
      buttonText: "Gründungsmitglied werden →",
      videoButtonText: "3-minütige Videoeinladung ansehen",
      closing: "Willkommen im Top 1%.",
      ps: "P.S.: Diese Nachricht ging an eine handverlesene Gruppe. Nach Platz #100 zahlt jeder Neue ab Tag 1 – und erhält Anteile nur durch erfolgreiche Aufträge, nicht durch Direktkauf zu Vorzugspreisen."
    },
    rising: {
      subject: "Private Einladung – Gründungsmitglied bei All-Influencer.com (100 Spots)",
      greeting: "Liebe/r {{NAME}},",
      intro: "Es gibt Plattformen für jedermann. Und dann gibt es All-Influencer.com – <strong>die Plattform für das Top 1%.</strong>",
      highlight: "Du bist eingeladen, Teil einer geschlossenen Gruppe zu werden, in der nicht deine Followerzahl allein zählt, sondern Qualität, Impact und Potenzial.",
      sections: [
        {
          title: "Was All-Influencer.com anders macht",
          content: "Keine endlosen Profile. Keine Preiskämpfe. Keine Algorithmen, die dich verstecken.\n\nStattdessen: <strong>333 Premium-Spots weltweit</strong> – sichtbar, kuratiert, exklusiv.",
          categories: true,
          after: "Brands kommen zu uns nicht, um zu suchen – sondern um zu finden. Und sie zahlen <strong>Premium-Preise für Premium-Creator</strong>."
        },
        {
          title: "Das Umsatz-zu-Anteilen-System",
          content: "All-Influencer.com ist keine Agentur, die dir 30% abzieht. Wir sind ein Tech-Start-up, in dem <strong>du Miteigentümer wirst</strong>.",
          list: [
            "<strong>80% Cash direkt an dich:</strong> Bei jedem vermittelten Auftrag behältst du den Großteil sofort.",
            "<strong>20% werden zu Unternehmensanteilen:</strong> Je erfolgreicher du über uns arbeitest, desto mehr gehört dir vom Unternehmen."
          ],
          note: "Wichtig: Du bist nicht exklusiv gebunden. Aber hier baust du nebenbei echtes Vermögen auf."
        },
        {
          title: "Der Verwässerungsschutz",
          highlight: "Creator + Platform-Gründer = Strukturelle Mehrheit. Unmöglich für externe Investoren, die Kontrolle zu übernehmen."
        }
      ],
      benefitsTitle: "Dein Gründungsvorteil – Die ersten 100",
      benefitsIntro: "Reguläre Kosten: 250€ - 1.000€ pro Monat",
      benefits: [
        "<strong>24 Monate völlig kostenfrei</strong> – volle Präsenz, null Gebühren",
        "<strong>Anteilskauf zum Startpreis:</strong> 50€ pro Anteil (z.B. Rising Star: 6.000€ ÷ 50€ = 120 Anteile)",
        "<strong>2 Jahre Kaufrecht:</strong> Du hast die gesamte Laufzeit Zeit zu entscheiden",
        "<strong>Lifetime Founder-Badge</strong> auf deinem Profil – sichtbar für jede Brand"
      ],
      valueNote: "Regulärer Wert: 6.000€ - 24.000€ über 24 Monate. Dein Startpreis: 0€.",
      spotText: "Dein Spot #{{SPOT}} wartet auf Aktivierung.",
      buttonText: "Gründungsmitglied werden →",
      videoButtonText: "3-minütige Videoeinladung ansehen",
      closing: "Willkommen im Top 1%.",
      ps: "P.S.: Diese Nachricht ging an eine handverlesene Gruppe. Nach Platz #100 zahlt jeder Neue ab Tag 1 – und erhält Anteile nur durch erfolgreiche Aufträge, nicht durch Direktkauf zu Vorzugspreisen."
    }
  },
  en: {
    diamond: {
      subject: "Founding Invitation – Become a Co-Owner of All-Influencer.com",
      greeting: "Dear {{NAME}},",
      intro: "The platform economy has a structural problem: You build the reach. You deliver the performance. <strong>But the wealth ends up elsewhere.</strong>",
      highlight: "We're solving this problem – with ownership instead of payment.",
      sections: [
        {
          title: "All-Influencer.com: The Showcase Belongs to the Stars",
          content: "We're building the first premium influencer platform based on the <strong>\"Own the Studio\" principle</strong>.\n\nWhile other platforms play the numbers game, we curate excellence:\n\n<strong>333 visible spots worldwide</strong> – exclusively for the top 1% (1 million+ followers). No endless scroll lists. Brands don't find just anyone – they find <strong>the best</strong>.\n\nAnd those best? That's you. And you won't just be featured – you'll become a <strong>co-owner</strong>."
        },
        {
          title: "The Revenue-to-Equity Model",
          list: [
            "<strong>80% directly to you:</strong> You keep the lion's share of every deal.",
            "<strong>20% becomes company equity:</strong> This commission doesn't just build the platform – it automatically converts into company shares for you."
          ],
          note: "Important: You remain completely free. Jobs outside the platform? Anytime. But here you earn twice – cash today, wealth tomorrow."
        },
        {
          title: "The Anti-Dilution Mechanism",
          content: "We've written the <strong>Founder Matching System</strong> into our bylaws:",
          highlight: "\"For every share issued to creators or partners, the founding team receives an identical share.\"",
          after: "The result: <strong>Creators (You) + Platform Team (Us) = Permanent Majority.</strong>"
        }
      ],
      benefitsTitle: "Your Founding Advantage – The First 100",
      benefitsIntro: "Regular costs: €5,000 - €10,000 per month",
      benefits: [
        "<strong>24 months completely free</strong> – full visibility, zero fees",
        "<strong>Share purchase at founder price:</strong> €50 per share (e.g. Diamond: €240,000 ÷ €50 = 4,800 shares)",
        "<strong>24-month purchase right:</strong> You decide within two years",
        "<strong>Priority access</strong> to the first premium campaigns"
      ],
      spotText: "Spot #{{SPOT}} is waiting for your activation.",
      buttonText: "Activate Founder Status →",
      videoButtonText: "Watch 3-Minute Video Invitation",
      closing: "In true partnership,",
      ps: "P.S.: After member #100, the free phase ends. All subsequent members pay from day one – and receive shares only through brokered deals, not through discounted direct purchase."
    },
    platin: {
      subject: "Founding Invitation – Become a Co-Owner of All-Influencer.com",
      greeting: "Dear {{NAME}},",
      intro: "The platform economy has a structural problem: You build the reach. You deliver the performance. <strong>But the wealth ends up elsewhere.</strong>",
      highlight: "We're solving this problem – with ownership instead of payment.",
      sections: [
        {
          title: "All-Influencer.com: The Showcase Belongs to the Stars",
          content: "We're building the first premium influencer platform based on the <strong>\"Own the Studio\" principle</strong>.\n\nWhile other platforms play the numbers game, we curate excellence:\n\n<strong>333 visible spots worldwide</strong> – exclusively for the top 1% (1 million+ followers). No endless scroll lists. Brands don't find just anyone – they find <strong>the best</strong>.\n\nAnd those best? That's you. And you won't just be featured – you'll become a <strong>co-owner</strong>."
        },
        {
          title: "The Revenue-to-Equity Model",
          list: [
            "<strong>80% directly to you:</strong> You keep the lion's share of every deal.",
            "<strong>20% becomes company equity:</strong> This commission doesn't just build the platform – it automatically converts into company shares for you."
          ],
          note: "Important: You remain completely free. Jobs outside the platform? Anytime. But here you earn twice – cash today, wealth tomorrow."
        },
        {
          title: "The Anti-Dilution Mechanism",
          content: "We've written the <strong>Founder Matching System</strong> into our bylaws:",
          highlight: "\"For every share issued to creators or partners, the founding team receives an identical share.\"",
          after: "The result: <strong>Creators (You) + Platform Team (Us) = Permanent Majority.</strong>"
        }
      ],
      benefitsTitle: "Your Founding Advantage – The First 100",
      benefitsIntro: "Regular costs: €5,000 - €10,000 per month",
      benefits: [
        "<strong>24 months completely free</strong> – full visibility, zero fees",
        "<strong>Share purchase at founder price:</strong> €50 per share (e.g. Platinum: €120,000 ÷ €50 = 2,400 shares)",
        "<strong>24-month purchase right:</strong> You decide within two years",
        "<strong>Priority access</strong> to the first premium campaigns"
      ],
      spotText: "Spot #{{SPOT}} is waiting for your activation.",
      buttonText: "Activate Founder Status →",
      videoButtonText: "Watch 3-Minute Video Invitation",
      closing: "In true partnership,",
      ps: "P.S.: After member #100, the free phase ends. All subsequent members pay from day one – and receive shares only through brokered deals, not through discounted direct purchase."
    },
    gold: {
      subject: "Private Invitation – Founding Member at All-Influencer.com (100 Spots)",
      greeting: "Dear {{NAME}},",
      intro: "There are platforms for everyone. And then there's All-Influencer.com – <strong>the platform for the top 1%.</strong>",
      highlight: "You're invited to join an exclusive group where it's not just your follower count that matters, but quality, impact, and potential.",
      sections: [
        {
          title: "What Makes All-Influencer.com Different",
          content: "No endless profiles. No price wars. No algorithms hiding you.\n\nInstead: <strong>333 premium spots worldwide</strong> – visible, curated, exclusive.",
          categories: true,
          after: "Brands come to us not to search – but to find. And they pay <strong>premium prices for premium creators</strong>."
        },
        {
          title: "The Revenue-to-Equity System",
          content: "All-Influencer.com is not an agency that takes 30%. We're a tech startup where <strong>you become a co-owner</strong>.",
          list: [
            "<strong>80% cash directly to you:</strong> You keep the majority of every brokered deal immediately.",
            "<strong>20% becomes company shares:</strong> The more successful you work through us, the more of the company you own."
          ],
          note: "Important: You're not exclusively bound. But here you build real wealth on the side."
        },
        {
          title: "Dilution Protection",
          highlight: "Creators + Platform Founders = Structural Majority. Impossible for external investors to take control."
        }
      ],
      benefitsTitle: "Your Founding Advantage – The First 100",
      benefitsIntro: "Regular costs: €250 - €1,000 per month",
      benefits: [
        "<strong>24 months completely free</strong> – full presence, zero fees",
        "<strong>Share purchase at starter price:</strong> €50 per share (e.g. Gold: €24,000 ÷ €50 = 480 shares)",
        "<strong>2-year purchase right:</strong> You have the full term to decide",
        "<strong>Lifetime Founder Badge</strong> on your profile – visible to every brand"
      ],
      valueNote: "Regular value: €6,000 - €24,000 over 24 months. Your starting price: €0.",
      spotText: "Your Spot #{{SPOT}} is waiting for activation.",
      buttonText: "Become a Founding Member →",
      videoButtonText: "Watch 3-Minute Video Invitation",
      closing: "Welcome to the top 1%.",
      ps: "P.S.: This message went to a hand-picked group. After spot #100, every new member pays from day 1 – and receives shares only through successful deals, not through discounted direct purchase."
    },
    rising: {
      subject: "Private Invitation – Founding Member at All-Influencer.com (100 Spots)",
      greeting: "Dear {{NAME}},",
      intro: "There are platforms for everyone. And then there's All-Influencer.com – <strong>the platform for the top 1%.</strong>",
      highlight: "You're invited to join an exclusive group where it's not just your follower count that matters, but quality, impact, and potential.",
      sections: [
        {
          title: "What Makes All-Influencer.com Different",
          content: "No endless profiles. No price wars. No algorithms hiding you.\n\nInstead: <strong>333 premium spots worldwide</strong> – visible, curated, exclusive.",
          categories: true,
          after: "Brands come to us not to search – but to find. And they pay <strong>premium prices for premium creators</strong>."
        },
        {
          title: "The Revenue-to-Equity System",
          content: "All-Influencer.com is not an agency that takes 30%. We're a tech startup where <strong>you become a co-owner</strong>.",
          list: [
            "<strong>80% cash directly to you:</strong> You keep the majority of every brokered deal immediately.",
            "<strong>20% becomes company shares:</strong> The more successful you work through us, the more of the company you own."
          ],
          note: "Important: You're not exclusively bound. But here you build real wealth on the side."
        },
        {
          title: "Dilution Protection",
          highlight: "Creators + Platform Founders = Structural Majority. Impossible for external investors to take control."
        }
      ],
      benefitsTitle: "Your Founding Advantage – The First 100",
      benefitsIntro: "Regular costs: €250 - €1,000 per month",
      benefits: [
        "<strong>24 months completely free</strong> – full presence, zero fees",
        "<strong>Share purchase at starter price:</strong> €50 per share (e.g. Rising Star: €6,000 ÷ €50 = 120 shares)",
        "<strong>2-year purchase right:</strong> You have the full term to decide",
        "<strong>Lifetime Founder Badge</strong> on your profile – visible to every brand"
      ],
      valueNote: "Regular value: €6,000 - €24,000 over 24 months. Your starting price: €0.",
      spotText: "Your Spot #{{SPOT}} is waiting for activation.",
      buttonText: "Become a Founding Member →",
      videoButtonText: "Watch 3-Minute Video Invitation",
      closing: "Welcome to the top 1%.",
      ps: "P.S.: This message went to a hand-picked group. After spot #100, every new member pays from day 1 – and receives shares only through successful deals, not through discounted direct purchase."
    }
  },
  es: {
    diamond: {
      subject: "Invitación de Fundación – Conviértete en Copropietario de All-Influencer.com",
      greeting: "Querido/a {{NAME}},",
      intro: "La economía de plataformas tiene un problema estructural: Tú construyes el alcance. Tú entregas el rendimiento. <strong>Pero la riqueza termina en otro lugar.</strong>",
      highlight: "Estamos resolviendo este problema – con propiedad en lugar de pago.",
      sections: [
        {
          title: "All-Influencer.com: El Escaparate Pertenece a las Estrellas",
          content: "Estamos construyendo la primera plataforma premium de influencers basada en el principio <strong>\"Own the Studio\"</strong>.\n\nMientras otras plataformas juegan al juego de los números, nosotros curamos la excelencia:\n\n<strong>333 spots visibles en todo el mundo</strong> – exclusivamente para el top 1% (más de 1 millón de seguidores). Sin listas de desplazamiento infinitas. Las marcas no encuentran a cualquiera – encuentran <strong>a los mejores</strong>.\n\n¿Y esos mejores? Eres tú. Y no solo serás presentado – te convertirás en <strong>copropietario</strong>."
        },
        {
          title: "El Modelo de Ingresos a Acciones",
          list: [
            "<strong>80% directamente para ti:</strong> Te quedas con la mayor parte de cada trato.",
            "<strong>20% se convierte en acciones:</strong> Esta comisión no solo construye la plataforma – se convierte automáticamente en acciones de la empresa para ti."
          ],
          note: "Importante: Permaneces completamente libre. ¿Trabajos fuera de la plataforma? En cualquier momento. Pero aquí ganas el doble – efectivo hoy, riqueza mañana."
        },
        {
          title: "El Mecanismo Anti-Dilución",
          content: "Hemos escrito el <strong>Sistema de Matching de Fundadores</strong> en nuestros estatutos:",
          highlight: "\"Por cada acción emitida a creadores o socios, el equipo fundador recibe una acción idéntica.\"",
          after: "El resultado: <strong>Creadores (Tú) + Equipo de Plataforma (Nosotros) = Mayoría Permanente.</strong>"
        }
      ],
      benefitsTitle: "Tu Ventaja de Fundador – Los Primeros 100",
      benefitsIntro: "Costes regulares: 5.000€ - 10.000€ por mes",
      benefits: [
        "<strong>24 meses completamente gratis</strong> – visibilidad total, cero comisiones",
        "<strong>Compra de acciones al precio fundador:</strong> 50€ por acción (ej. Diamond: 240.000€ ÷ 50€ = 4.800 acciones)",
        "<strong>Derecho de compra de 24 meses:</strong> Decides en dos años",
        "<strong>Acceso prioritario</strong> a las primeras campañas premium"
      ],
      spotText: "El Spot #{{SPOT}} está esperando tu activación.",
      buttonText: "Activar Estado de Fundador →",
      videoButtonText: "Ver Video de Invitación (3 min)",
      closing: "En verdadera asociación,",
      ps: "P.D.: Después del miembro #100, termina la fase gratuita. Todos los siguientes pagan desde el día uno – y reciben acciones solo a través de contratos intermediados, no mediante compra directa con descuento."
    },
    platin: {
      subject: "Invitación de Fundación – Conviértete en Copropietario de All-Influencer.com",
      greeting: "Querido/a {{NAME}},",
      intro: "La economía de plataformas tiene un problema estructural: Tú construyes el alcance. Tú entregas el rendimiento. <strong>Pero la riqueza termina en otro lugar.</strong>",
      highlight: "Estamos resolviendo este problema – con propiedad en lugar de pago.",
      sections: [
        {
          title: "All-Influencer.com: El Escaparate Pertenece a las Estrellas",
          content: "Estamos construyendo la primera plataforma premium de influencers basada en el principio <strong>\"Own the Studio\"</strong>.\n\nMientras otras plataformas juegan al juego de los números, nosotros curamos la excelencia:\n\n<strong>333 spots visibles en todo el mundo</strong> – exclusivamente para el top 1% (más de 1 millón de seguidores). Sin listas de desplazamiento infinitas. Las marcas no encuentran a cualquiera – encuentran <strong>a los mejores</strong>.\n\n¿Y esos mejores? Eres tú. Y no solo serás presentado – te convertirás en <strong>copropietario</strong>."
        },
        {
          title: "El Modelo de Ingresos a Acciones",
          list: [
            "<strong>80% directamente para ti:</strong> Te quedas con la mayor parte de cada trato.",
            "<strong>20% se convierte en acciones:</strong> Esta comisión no solo construye la plataforma – se convierte automáticamente en acciones de la empresa para ti."
          ],
          note: "Importante: Permaneces completamente libre. ¿Trabajos fuera de la plataforma? En cualquier momento. Pero aquí ganas el doble – efectivo hoy, riqueza mañana."
        },
        {
          title: "El Mecanismo Anti-Dilución",
          content: "Hemos escrito el <strong>Sistema de Matching de Fundadores</strong> en nuestros estatutos:",
          highlight: "\"Por cada acción emitida a creadores o socios, el equipo fundador recibe una acción idéntica.\"",
          after: "El resultado: <strong>Creadores (Tú) + Equipo de Plataforma (Nosotros) = Mayoría Permanente.</strong>"
        }
      ],
      benefitsTitle: "Tu Ventaja de Fundador – Los Primeros 100",
      benefitsIntro: "Costes regulares: 5.000€ - 10.000€ por mes",
      benefits: [
        "<strong>24 meses completamente gratis</strong> – visibilidad total, cero comisiones",
        "<strong>Compra de acciones al precio fundador:</strong> 50€ por acción (ej. Platino: 120.000€ ÷ 50€ = 2.400 acciones)",
        "<strong>Derecho de compra de 24 meses:</strong> Decides en dos años",
        "<strong>Acceso prioritario</strong> a las primeras campañas premium"
      ],
      spotText: "El Spot #{{SPOT}} está esperando tu activación.",
      buttonText: "Activar Estado de Fundador →",
      videoButtonText: "Ver Video de Invitación (3 min)",
      closing: "En verdadera asociación,",
      ps: "P.D.: Después del miembro #100, termina la fase gratuita. Todos los siguientes pagan desde el día uno – y reciben acciones solo a través de contratos intermediados, no mediante compra directa con descuento."
    },
    gold: {
      subject: "Invitación Privada – Miembro Fundador en All-Influencer.com (100 Spots)",
      greeting: "Querido/a {{NAME}},",
      intro: "Hay plataformas para todos. Y luego está All-Influencer.com – <strong>la plataforma para el top 1%.</strong>",
      highlight: "Estás invitado/a a unirte a un grupo exclusivo donde no solo importa tu número de seguidores, sino la calidad, el impacto y el potencial.",
      sections: [
        {
          title: "Qué Hace Diferente a All-Influencer.com",
          content: "Sin perfiles infinitos. Sin guerras de precios. Sin algoritmos que te ocultan.\n\nEn su lugar: <strong>333 spots premium en todo el mundo</strong> – visibles, curados, exclusivos.",
          categories: true,
          after: "Las marcas vienen a nosotros no para buscar – sino para encontrar. Y pagan <strong>precios premium por creadores premium</strong>."
        },
        {
          title: "El Sistema de Ingresos a Acciones",
          content: "All-Influencer.com no es una agencia que te quita el 30%. Somos una startup tecnológica donde <strong>te conviertes en copropietario</strong>.",
          list: [
            "<strong>80% en efectivo directamente para ti:</strong> Te quedas con la mayoría de cada contrato intermediado inmediatamente.",
            "<strong>20% se convierte en acciones:</strong> Cuanto más éxito tengas trabajando con nosotros, más parte de la empresa te pertenece."
          ],
          note: "Importante: No estás vinculado exclusivamente. Pero aquí construyes riqueza real de forma paralela."
        },
        {
          title: "Protección contra Dilución",
          highlight: "Creadores + Fundadores de Plataforma = Mayoría Estructural. Imposible para inversores externos tomar el control."
        }
      ],
      benefitsTitle: "Tu Ventaja de Fundador – Los Primeros 100",
      benefitsIntro: "Costes regulares: 250€ - 1.000€ por mes",
      benefits: [
        "<strong>24 meses completamente gratis</strong> – presencia completa, cero comisiones",
        "<strong>Compra de acciones al precio inicial:</strong> 50€ por acción (ej. Gold: 24.000€ ÷ 50€ = 480 acciones)",
        "<strong>Derecho de compra de 2 años:</strong> Tienes todo el plazo para decidir",
        "<strong>Insignia de Fundador de por vida</strong> en tu perfil – visible para cada marca"
      ],
      valueNote: "Valor regular: 6.000€ - 24.000€ en 24 meses. Tu precio inicial: 0€.",
      spotText: "Tu Spot #{{SPOT}} está esperando activación.",
      buttonText: "Convertirte en Miembro Fundador →",
      videoButtonText: "Ver Video de Invitación (3 min)",
      closing: "Bienvenido/a al top 1%.",
      ps: "P.D.: Este mensaje fue enviado a un grupo seleccionado a mano. Después del puesto #100, cada nuevo miembro paga desde el día 1 – y recibe acciones solo a través de contratos exitosos, no mediante compra directa con descuento."
    },
    rising: {
      subject: "Invitación Privada – Miembro Fundador en All-Influencer.com (100 Spots)",
      greeting: "Querido/a {{NAME}},",
      intro: "Hay plataformas para todos. Y luego está All-Influencer.com – <strong>la plataforma para el top 1%.</strong>",
      highlight: "Estás invitado/a a unirte a un grupo exclusivo donde no solo importa tu número de seguidores, sino la calidad, el impacto y el potencial.",
      sections: [
        {
          title: "Qué Hace Diferente a All-Influencer.com",
          content: "Sin perfiles infinitos. Sin guerras de precios. Sin algoritmos que te ocultan.\n\nEn su lugar: <strong>333 spots premium en todo el mundo</strong> – visibles, curados, exclusivos.",
          categories: true,
          after: "Las marcas vienen a nosotros no para buscar – sino para encontrar. Y pagan <strong>precios premium por creadores premium</strong>."
        },
        {
          title: "El Sistema de Ingresos a Acciones",
          content: "All-Influencer.com no es una agencia que te quita el 30%. Somos una startup tecnológica donde <strong>te conviertes en copropietario</strong>.",
          list: [
            "<strong>80% en efectivo directamente para ti:</strong> Te quedas con la mayoría de cada contrato intermediado inmediatamente.",
            "<strong>20% se convierte en acciones:</strong> Cuanto más éxito tengas trabajando con nosotros, más parte de la empresa te pertenece."
          ],
          note: "Importante: No estás vinculado exclusivamente. Pero aquí construyes riqueza real de forma paralela."
        },
        {
          title: "Protección contra Dilución",
          highlight: "Creadores + Fundadores de Plataforma = Mayoría Estructural. Imposible para inversores externos tomar el control."
        }
      ],
      benefitsTitle: "Tu Ventaja de Fundador – Los Primeros 100",
      benefitsIntro: "Costes regulares: 250€ - 1.000€ por mes",
      benefits: [
        "<strong>24 meses completamente gratis</strong> – presencia completa, cero comisiones",
        "<strong>Compra de acciones al precio inicial:</strong> 50€ por acción (ej. Rising Star: 6.000€ ÷ 50€ = 120 acciones)",
        "<strong>Derecho de compra de 2 años:</strong> Tienes todo el plazo para decidir",
        "<strong>Insignia de Fundador de por vida</strong> en tu perfil – visible para cada marca"
      ],
      valueNote: "Valor regular: 6.000€ - 24.000€ en 24 meses. Tu precio inicial: 0€.",
      spotText: "Tu Spot #{{SPOT}} está esperando activación.",
      buttonText: "Convertirte en Miembro Fundador →",
      videoButtonText: "Ver Video de Invitación (3 min)",
      closing: "Bienvenido/a al top 1%.",
      ps: "P.D.: Este mensaje fue enviado a un grupo seleccionado a mano. Después del puesto #100, cada nuevo miembro paga desde el día 1 – y recibe acciones solo a través de contratos exitosos, no mediante compra directa con descuento."
    }
  }
};

// ============================================================================
// HILFSFUNKTIONEN
// ============================================================================

export function replacePlaceholders(text, name, spot) {
  if (!text) return '';
  return text
    .replace(/\{\{NAME\}\}/g, name || '[Name]')
    .replace(/\{\{SPOT\}\}/g, spot || '[XX]');
}

// Kategorie-Tags HTML
const categoryTagsHTML = `
<table role="presentation" cellspacing="0" cellpadding="0" style="margin:15px 0;">
  <tr>
    <td style="padding:5px 8px;background:rgba(251,191,36,0.1);border:1px solid rgba(251,191,36,0.3);border-radius:20px;margin-right:8px;">
      <span style="color:#fbbf24;font-size:11px;">💎 Diamond (20M+)</span>
    </td>
    <td style="width:8px;"></td>
    <td style="padding:5px 8px;background:rgba(251,191,36,0.1);border:1px solid rgba(251,191,36,0.3);border-radius:20px;">
      <span style="color:#fbbf24;font-size:11px;">💠 Platin (10-20M)</span>
    </td>
  </tr>
  <tr><td colspan="3" style="height:8px;"></td></tr>
  <tr>
    <td style="padding:5px 8px;background:rgba(251,191,36,0.1);border:1px solid rgba(251,191,36,0.3);border-radius:20px;">
      <span style="color:#fbbf24;font-size:11px;">🥇 Gold (5-10M)</span>
    </td>
    <td style="width:8px;"></td>
    <td style="padding:5px 8px;background:rgba(251,191,36,0.1);border:1px solid rgba(251,191,36,0.3);border-radius:20px;">
      <span style="color:#fbbf24;font-size:11px;">⭐ Rising Star (1-5M)</span>
    </td>
  </tr>
</table>`;

// ============================================================================
// HTML GENERIERUNG - KURZE TEMPLATES (V2 kompatibel)
// ============================================================================

export function generateHTMLShort(lang, cat, template, name, spot) {
  const t = template;
  const loiUrl = `https://all-influencer.com/?loi=true&lang=${lang}`;
  const senderTitle = ui[lang].senderTitle;
  
  return `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${replacePlaceholders(t.subject, name, spot)}</title></head><body style="margin:0;padding:0;background-color:#030712;font-family:'Segoe UI',Arial,sans-serif;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#030712;"><tr><td align="center" style="padding:40px 20px;"><table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color:#111827;border-radius:16px;border:1px solid rgba(251,191,36,0.3);overflow:hidden;"><tr><td style="background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);padding:30px;text-align:center;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center"><div style="width:50px;height:50px;background-color:#000;border-radius:12px;display:inline-block;line-height:50px;font-weight:bold;color:#f59e0b;font-size:18px;">AI</div></td></tr><tr><td align="center" style="padding-top:15px;"><h1 style="margin:0;color:#000;font-size:24px;font-weight:bold;letter-spacing:2px;">ALL INFLUENCER</h1><p style="margin:5px 0 0 0;color:rgba(0,0,0,0.7);font-size:12px;letter-spacing:3px;">PREMIUM NETWORK</p></td></tr></table></td></tr><tr><td style="padding:40px 30px;"><p style="color:#ffffff;font-size:16px;margin:0 0 20px 0;">${replacePlaceholders(t.greeting, name, spot)}</p><p style="color:#9ca3af;font-size:15px;line-height:1.6;margin:0 0 15px 0;">${t.intro}</p><div style="background:linear-gradient(135deg,rgba(251,191,36,0.15) 0%,rgba(217,119,6,0.1) 100%);border-left:4px solid #f59e0b;padding:20px;margin:25px 0;border-radius:0 8px 8px 0;"><p style="color:#fbbf24;font-size:15px;margin:0;font-weight:500;">${t.highlight}</p></div><h3 style="color:#f59e0b;font-size:16px;margin:30px 0 15px 0;font-weight:600;">${t.modelTitle}</h3><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${t.model.map(item => `<tr><td style="padding:8px 0;"><table role="presentation" cellspacing="0" cellpadding="0"><tr><td style="color:#f59e0b;font-size:14px;vertical-align:top;padding-right:10px;">▸</td><td style="color:#d1d5db;font-size:14px;line-height:1.5;">${item}</td></tr></table></td></tr>`).join('')}</table><h3 style="color:#f59e0b;font-size:16px;margin:30px 0 15px 0;font-weight:600;">${t.benefitsTitle}</h3><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:rgba(251,191,36,0.05);border-radius:8px;">${t.benefits.map(item => `<tr><td style="padding:10px 15px;"><table role="presentation" cellspacing="0" cellpadding="0"><tr><td style="color:#22c55e;font-size:14px;vertical-align:top;padding-right:10px;">✓</td><td style="color:#ffffff;font-size:14px;line-height:1.5;">${item}</td></tr></table></td></tr>`).join('')}</table><h3 style="color:#ffffff;font-size:16px;margin:30px 0 10px 0;font-weight:600;">${t.ctaTitle}</h3><p style="color:#9ca3af;font-size:14px;line-height:1.6;margin:0 0 25px 0;">${t.ctaText}</p><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center"><a href="${loiUrl}" target="_blank" style="display:inline-block;background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#000000;text-decoration:none;padding:16px 40px;border-radius:8px;font-weight:bold;font-size:15px;letter-spacing:0.5px;">${t.buttonText}</a></td></tr></table><p style="color:#f59e0b;font-size:14px;text-align:center;margin:25px 0;font-weight:500;">${replacePlaceholders(t.spotText, name, spot)}</p><div style="margin-top:40px;padding-top:25px;border-top:1px solid rgba(251,191,36,0.3);"><p style="color:#9ca3af;font-size:14px;margin:0 0 20px 0;">${t.closing}</p><p style="color:#ffffff;font-size:16px;font-weight:700;margin:0;">Julien Weiss</p><p style="color:#d1d5db;font-size:14px;margin:8px 0 0 0;">${senderTitle}, All-Influencer.com | Die 333</p><table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:15px;"><tr><td style="padding-right:20px;"><a href="tel:+491632600084" style="color:#fbbf24;font-size:14px;text-decoration:none;font-weight:500;">📱 +49 163 260 0084</a></td><td><a href="mailto:contact@all-influencer.com" style="color:#fbbf24;font-size:14px;text-decoration:none;font-weight:500;">✉️ contact@all-influencer.com</a></td></tr></table></div><div style="margin-top:30px;padding:15px;background-color:rgba(251,191,36,0.08);border-left:3px solid #f59e0b;border-radius:0 8px 8px 0;"><p style="color:#d1d5db;font-size:13px;margin:0;font-style:italic;">${t.ps}</p></div></td></tr><tr><td style="background-color:#000000;padding:25px 30px;text-align:center;border-top:1px solid rgba(251,191,36,0.2);"><p style="color:#6b7280;font-size:11px;margin:0;">© 2025 ALL INFLUENCER. All rights reserved.</p><p style="color:#4b5563;font-size:10px;margin:10px 0 0 0;"><a href="https://all-influencer.com" style="color:#f59e0b;text-decoration:none;">all-influencer.com</a></p></td></tr></table></td></tr></table></body></html>`;
}

// ============================================================================
// HTML GENERIERUNG - AUSFÜHRLICHE TEMPLATES (NEU)
// ============================================================================

export function generateHTMLDetailed(lang, cat, template, name, spot) {
  const t = template;
  const loiUrl = `https://all-influencer.com/?loi=true&lang=${lang}`;
  const videoUrl = `https://all-influencer.com/video/founder-invitation?lang=${lang}`;
  const senderTitle = ui[lang].senderTitle;
  
  // Sections HTML generieren
  let sectionsHTML = '';
  if (t.sections) {
    t.sections.forEach(section => {
      sectionsHTML += `<h3 style="color:#f59e0b;font-size:16px;margin:30px 0 15px 0;font-weight:600;">${section.title}</h3>`;
      
      if (section.content) {
        const paragraphs = section.content.split('\n\n');
        paragraphs.forEach(p => {
          if (p.trim()) {
            sectionsHTML += `<p style="color:#9ca3af;font-size:14px;line-height:1.7;margin:0 0 14px 0;">${p}</p>`;
          }
        });
      }
      
      if (section.categories) {
        sectionsHTML += categoryTagsHTML;
      }
      
      if (section.list) {
        sectionsHTML += `<table role="presentation" width="100%" cellspacing="0" cellpadding="0">`;
        section.list.forEach(item => {
          sectionsHTML += `<tr><td style="padding:8px 0;"><table role="presentation" cellspacing="0" cellpadding="0"><tr><td style="color:#f59e0b;font-size:14px;vertical-align:top;padding-right:10px;">▸</td><td style="color:#d1d5db;font-size:14px;line-height:1.5;">${item}</td></tr></table></td></tr>`;
        });
        sectionsHTML += `</table>`;
      }
      
      if (section.note) {
        // High contrast für wichtige Hinweise
        sectionsHTML += `<p style="color:#e5e7eb;font-size:14px;line-height:1.7;margin:14px 0;">${section.note}</p>`;
      }
      
      if (section.highlight) {
        sectionsHTML += `<div style="background:linear-gradient(135deg,rgba(251,191,36,0.15) 0%,rgba(217,119,6,0.1) 100%);border-left:4px solid #f59e0b;padding:16px 18px;margin:20px 0;border-radius:0 8px 8px 0;"><p style="color:#fbbf24;font-size:14px;margin:0;font-weight:500;line-height:1.6;">${section.highlight}</p></div>`;
      }
      
      if (section.after) {
        sectionsHTML += `<p style="color:#9ca3af;font-size:14px;line-height:1.7;margin:14px 0 0 0;">${section.after}</p>`;
      }
    });
  }

  // Value Note (nur bei Gold/Rising Star)
  let valueNoteHTML = '';
  if (t.valueNote) {
    valueNoteHTML = `<p style="color:#e5e7eb;font-size:13px;font-weight:500;margin:15px 0;">${t.valueNote}</p>`;
  }
  
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>${replacePlaceholders(t.subject, name, spot)}</title>
</head>
<body style="margin:0;padding:0;background-color:#030712;font-family:'Segoe UI',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#030712;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color:#111827;border-radius:16px;border:1px solid rgba(251,191,36,0.3);overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);padding:30px;text-align:center;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <div style="width:50px;height:50px;background-color:#000;border-radius:12px;display:inline-block;line-height:50px;font-weight:bold;color:#f59e0b;font-size:18px;">AI</div>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top:15px;">
                    <h1 style="margin:0;color:#000;font-size:24px;font-weight:bold;letter-spacing:2px;">ALL INFLUENCER</h1>
                    <p style="margin:5px 0 0 0;color:rgba(0,0,0,0.7);font-size:12px;letter-spacing:3px;">PREMIUM NETWORK</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding:40px 30px;">
              
              <!-- Greeting -->
              <p style="color:#ffffff;font-size:16px;margin:0 0 20px 0;">${replacePlaceholders(t.greeting, name, spot)}</p>
              
              <!-- Intro -->
              <p style="color:#9ca3af;font-size:15px;line-height:1.7;margin:0 0 15px 0;">${t.intro}</p>
              
              <!-- Main Highlight -->
              <div style="background:linear-gradient(135deg,rgba(251,191,36,0.15) 0%,rgba(217,119,6,0.1) 100%);border-left:4px solid #f59e0b;padding:20px;margin:25px 0;border-radius:0 8px 8px 0;">
                <p style="color:#fbbf24;font-size:15px;margin:0;font-weight:500;">${t.highlight}</p>
              </div>
              
              <!-- Dynamic Sections -->
              ${sectionsHTML}
              
              <!-- Benefits -->
              <h3 style="color:#f59e0b;font-size:16px;margin:30px 0 15px 0;font-weight:600;">${t.benefitsTitle}</h3>
              <p style="color:#9ca3af;font-size:14px;margin:0 0 15px 0;">${t.benefitsIntro}</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:rgba(251,191,36,0.05);border-radius:8px;">
                ${t.benefits.map(item => `
                <tr>
                  <td style="padding:10px 15px;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="color:#22c55e;font-size:14px;vertical-align:top;padding-right:10px;">✓</td>
                        <td style="color:#ffffff;font-size:14px;line-height:1.5;">${item}</td>
                      </tr>
                    </table>
                  </td>
                </tr>`).join('')}
              </table>
              
              ${valueNoteHTML}
              
              <!-- Spot Text -->
              <p style="color:#f59e0b;font-size:14px;text-align:center;margin:25px 0 15px 0;font-weight:500;">${replacePlaceholders(t.spotText, name, spot)}</p>
              
              <!-- Buttons -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:10px 0;">
                    <a href="${loiUrl}" target="_blank" style="display:inline-block;background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#000000;text-decoration:none;padding:16px 40px;border-radius:8px;font-weight:bold;font-size:15px;letter-spacing:0.5px;">📝 ${t.buttonText}</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:10px 0;">
                    <a href="${videoUrl}" target="_blank" style="display:inline-block;background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#000000;text-decoration:none;padding:16px 40px;border-radius:8px;font-weight:bold;font-size:15px;letter-spacing:0.5px;">🎬 ${t.videoButtonText}</a>
                  </td>
                </tr>
              </table>
              
              <!-- Closing -->
              <div style="margin-top:40px;padding-top:25px;border-top:1px solid rgba(251,191,36,0.3);">
                <p style="color:#9ca3af;font-size:14px;margin:0 0 20px 0;">${t.closing}</p>
                <p style="color:#ffffff;font-size:16px;font-weight:700;margin:0;">Julien Weiss</p>
                <p style="color:#d1d5db;font-size:14px;margin:8px 0 0 0;">${senderTitle}, All-Influencer.com | Die 333</p>
                <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:15px;">
                  <tr>
                    <td style="padding-right:20px;">
                      <a href="tel:+491632600084" style="color:#fbbf24;font-size:14px;text-decoration:none;font-weight:500;">📱 +49 163 260 0084</a>
                    </td>
                    <td>
                      <a href="mailto:contact@all-influencer.com" style="color:#fbbf24;font-size:14px;text-decoration:none;font-weight:500;">✉️ contact@all-influencer.com</a>
                    </td>
                  </tr>
                </table>
              </div>
              
              <!-- P.S. -->
              <div style="margin-top:30px;padding:15px;background-color:rgba(251,191,36,0.08);border-left:3px solid #f59e0b;border-radius:0 8px 8px 0;">
                <p style="color:#d1d5db;font-size:13px;margin:0;font-style:italic;">${t.ps}</p>
              </div>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color:#000000;padding:25px 30px;text-align:center;border-top:1px solid rgba(251,191,36,0.2);">
              <p style="color:#6b7280;font-size:11px;margin:0;">© 2025 ALL INFLUENCER. All rights reserved.</p>
              <p style="color:#4b5563;font-size:10px;margin:10px 0 0 0;">
                <a href="https://all-influencer.com" style="color:#f59e0b;text-decoration:none;">all-influencer.com</a>
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ============================================================================
// PLAIN TEXT GENERIERUNG
// ============================================================================

export function generatePlainTextShort(lang, template, name, spot) {
  const t = template;
  const loiUrl = `https://all-influencer.com/?loi=true&lang=${lang}`;
  const senderTitle = ui[lang].senderTitle;
  
  return `${replacePlaceholders(t.greeting, name, spot)}\n\n${t.intro}\n\n${t.highlight}\n\n${t.modelTitle}\n${t.model.map(item => '• ' + item).join('\n')}\n\n${t.benefitsTitle}\n${t.benefits.map(item => '✓ ' + item).join('\n')}\n\n${t.ctaTitle}\n${t.ctaText}\n\n👉 ${t.buttonText}\n${loiUrl}\n\n${replacePlaceholders(t.spotText, name, spot)}\n\n${t.closing}\n\nJulien Weiss\n${senderTitle}, All-Influencer.com | Die 333\n📱 +49 163 260 0084\n✉️ contact@all-influencer.com\n\n${t.ps}`;
}

export function generatePlainTextDetailed(lang, template, name, spot) {
  const t = template;
  const loiUrl = `https://all-influencer.com/?loi=true&lang=${lang}`;
  const videoUrl = `https://all-influencer.com/video/founder-invitation?lang=${lang}`;
  const senderTitle = ui[lang].senderTitle;
  
  // HTML Tags entfernen
  const stripHtml = (html) => html.replace(/<[^>]*>/g, '');
  
  let sectionsText = '';
  if (t.sections) {
    t.sections.forEach(section => {
      sectionsText += `\n\n${section.title}\n${'─'.repeat(section.title.length)}\n`;
      if (section.content) sectionsText += stripHtml(section.content) + '\n';
      if (section.list) sectionsText += section.list.map(item => '• ' + stripHtml(item)).join('\n') + '\n';
      if (section.note) sectionsText += '\n' + stripHtml(section.note) + '\n';
      if (section.highlight) sectionsText += '\n» ' + stripHtml(section.highlight) + '\n';
      if (section.after) sectionsText += '\n' + stripHtml(section.after) + '\n';
    });
  }
  
  return `${replacePlaceholders(t.greeting, name, spot)}

${stripHtml(t.intro)}

» ${t.highlight}
${sectionsText}

${t.benefitsTitle}
${t.benefitsIntro}
${t.benefits.map(item => '✓ ' + stripHtml(item)).join('\n')}
${t.valueNote ? '\n' + t.valueNote : ''}

${replacePlaceholders(t.spotText, name, spot)}

👉 ${t.buttonText}
${loiUrl}

🎬 ${t.videoButtonText}
${videoUrl}

${t.closing}

Julien Weiss
${senderTitle}, All-Influencer.com | Die 333
📱 +49 163 260 0084
✉️ contact@all-influencer.com

${t.ps}`;
}

// ============================================================================
// HAUPT-EXPORT FUNKTIONEN (Wrapper für Kompatibilität)
// ============================================================================

export function generateHTML(lang, cat, template, name, spot, templateType = 'short') {
  if (templateType === 'detailed') {
    return generateHTMLDetailed(lang, cat, template, name, spot);
  }
  return generateHTMLShort(lang, cat, template, name, spot);
}

export function generatePlainText(lang, template, name, spot, templateType = 'short') {
  if (templateType === 'detailed') {
    return generatePlainTextDetailed(lang, template, name, spot);
  }
  return generatePlainTextShort(lang, template, name, spot);
}

// Für Abwärtskompatibilität
export const templates = templatesShort;
