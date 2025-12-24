/**
 * All-Influencer.com - E-Mail Templates
 */

export const config = {
  sender: {
    name: "Julien Weiss",
    title: "Geschäftsführer, All-Influencer.com | Die 333",
    phone: "+49 163 260 0084",
    email: "contact@all-influencer.com"
  },
  loiBaseUrl: "https://all-influencer.com/?loi=true",
  colors: {
    primary: "#f59e0b",
    primaryDark: "#d97706",
    background: "#030712",
    backgroundSecondary: "#111827",
    textLight: "#ffffff",
    textMuted: "#9ca3af",
    textGray: "#d1d5db",
    success: "#22c55e",
    border: "rgba(251, 191, 36, 0.3)"
  }
};

export const emailTemplates = {
  de: {
    diamond: {
      id: "de-diamond",
      name: "Diamond & Platin (10M+) - Deutsch",
      category: "diamond",
      language: "de",
      subject: "Eigentum statt Bezahlung – Einladung für {{NAME}}",
      subjectAlt1: "Spot #{{SPOT}} – Gründungsmitglied bei All-Influencer.com",
      subjectAlt2: "{{NAME}}, 24 Monate kostenfrei + Unternehmensanteile",
      greeting: "Liebe/r {{NAME}},",
      intro: "Du baust Reichweite. Du lieferst Performance. Aber das Vermögen? Das landet bei den Plattformen.",
      highlight: "All-Influencer.com ändert das: Die erste Premium-Plattform, bei der Creator Miteigentümer werden.",
      modelTitle: "Das Modell:",
      model: [
        "333 Spots weltweit – exklusiv für das Top 1% (ab 1M Followers). Keine Masse. Brands finden nicht irgendwen – sie finden die Besten.",
        "80% Cash bei jedem vermittelten Auftrag direkt an dich.",
        "20% werden zu Anteilen – du baust Vermögen auf, während du arbeitest.",
        "Anti-Verwässerungsschutz in der Satzung: Creator + Gründer = dauerhafte Mehrheit. Kein VC kann das kippen."
      ],
      benefitsTitle: "Dein Gründervorteil (nur die ersten 100):",
      benefits: [
        "24 Monate komplett kostenfrei (regulär: 5.000–10.000€/Monat)",
        "Anteilskauf zum Gründungspreis: 50€/Anteil – ein Preis, der später nicht mehr verfügbar ist",
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
      id: "de-gold",
      name: "Gold & Rising Star (1-10M) - Deutsch",
      category: "gold",
      language: "de",
      subject: "Private Einladung: Gründungsmitglied bei All-Influencer.com",
      subjectAlt1: "{{NAME}}, einer von 100 Gründungsplätzen ist für dich reserviert",
      subjectAlt2: "24 Monate kostenfrei + Unternehmensanteile – nur für die ersten 100",
      greeting: "Liebe/r {{NAME}},",
      intro: "Es gibt Plattformen für jedermann. Und dann gibt es All-Influencer.com – die Plattform für das Top 1%.",
      highlight: "Du bist eingeladen, Teil einer geschlossenen Gruppe zu werden, in der nicht Followerzahl allein zählt – sondern Qualität, Impact und Potenzial.",
      modelTitle: "Was All-Influencer.com anders macht:",
      model: [
        "333 Premium-Spots weltweit – sichtbar, kuratiert, exklusiv. Keine endlosen Listen, keine Algorithmen, die dich verstecken.",
        "Du wirst Shareholder: 80% Cash bei jedem Auftrag direkt an dich. 20% wandeln sich in Unternehmensanteile.",
        "Struktureller Schutz: Ein Anti-Verwässerungsmechanismus garantiert, dass Creator + Gründer die Mehrheit behalten. Immer."
      ],
      benefitsTitle: "Dein Gründervorteil (nur die ersten 100):",
      benefits: [
        "24 Monate komplett kostenfrei (regulär: 250–1.000€/Monat)",
        "Anteilskauf zum Gründungspreis: 50€/Anteil – dieser Preis ist später nicht mehr verfügbar",
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
      id: "en-diamond",
      name: "Diamond & Platinum (10M+) - English",
      category: "diamond",
      language: "en",
      subject: "Ownership instead of payment – Invitation for {{NAME}}",
      subjectAlt1: "Spot #{{SPOT}} – Founding member at All-Influencer.com",
      subjectAlt2: "{{NAME}}, 24 months free + company shares",
      greeting: "Dear {{NAME}},",
      intro: "You build reach. You deliver performance. But the wealth? It ends up with the platforms.",
      highlight: "All-Influencer.com changes that: The first premium platform where creators become co-owners.",
      modelTitle: "The Model:",
      model: [
        "333 spots worldwide – exclusively for the top 1% (1M+ followers). No mass market. Brands don't find just anyone – they find the best.",
        "80% cash from every deal goes directly to you.",
        "20% converts to equity – you build wealth while you work.",
        "Anti-dilution protection in our bylaws: Creators + Founders = permanent majority. No VC can change that."
      ],
      benefitsTitle: "Your Founder Advantage (first 100 only):",
      benefits: [
        "24 months completely free (regular: €5,000–10,000/month)",
        "Share purchase at founder price: €50/share – a price that won't be available later",
        "Purchase option guaranteed for 24 months"
      ],
      ctaTitle: "Next Step:",
      ctaText: "I'd love to explain the model to you personally in 15 minutes. Alternatively, you can submit a non-binding letter of intent:",
      buttonText: "Fill out non-binding LOI (2 min) →",
      spotText: "Spot #{{SPOT}} is reserved for you.",
      closing: "In true partnership,",
      ps: "P.S.: After spot #100, everyone pays from day 1. The founding phase is limited."
    },
    gold: {
      id: "en-gold",
      name: "Gold & Rising Star (1-10M) - English",
      category: "gold",
      language: "en",
      subject: "Private Invitation: Founding Member at All-Influencer.com",
      subjectAlt1: "{{NAME}}, one of 100 founding spots is reserved for you",
      subjectAlt2: "24 months free + company shares – only for the first 100",
      greeting: "Dear {{NAME}},",
      intro: "There are platforms for everyone. And then there's All-Influencer.com – the platform for the top 1%.",
      highlight: "You're invited to join an exclusive group where follower count alone doesn't matter – but quality, impact, and potential do.",
      modelTitle: "What makes All-Influencer.com different:",
      model: [
        "333 premium spots worldwide – visible, curated, exclusive. No endless lists, no algorithms hiding you.",
        "You become a shareholder: 80% cash from every deal goes directly to you. 20% converts to company shares.",
        "Structural protection: An anti-dilution mechanism guarantees that Creators + Founders keep the majority. Always."
      ],
      benefitsTitle: "Your Founder Advantage (first 100 only):",
      benefits: [
        "24 months completely free (regular: €250–1,000/month)",
        "Share purchase at founder price: €50/share – this price won't be available later",
        "2 years purchase right guaranteed",
        "Lifetime Founder Badge on your profile"
      ],
      ctaTitle: "Interested?",
      ctaText: "Fill out a non-binding letter of intent – no obligation, just an expression of interest:",
      buttonText: "Fill out non-binding LOI (2 min) →",
      spotText: "Spot #{{SPOT}} is waiting for you.",
      closing: "Welcome to the top 1%.",
      ps: "P.S.: This invitation went to a hand-picked group. After spot #100, every new member pays from day 1."
    }
  },
  es: {
    diamond: {
      id: "es-diamond",
      name: "Diamond & Platino (10M+) - Español",
      category: "diamond",
      language: "es",
      subject: "Propiedad en lugar de pago – Invitación para {{NAME}}",
      subjectAlt1: "Spot #{{SPOT}} – Miembro fundador en All-Influencer.com",
      subjectAlt2: "{{NAME}}, 24 meses gratis + acciones de la empresa",
      greeting: "Querido/a {{NAME}},",
      intro: "Construyes alcance. Entregas resultados. ¿Pero la riqueza? Termina en las plataformas.",
      highlight: "All-Influencer.com cambia eso: La primera plataforma premium donde los creadores se convierten en copropietarios.",
      modelTitle: "El Modelo:",
      model: [
        "333 spots en todo el mundo – exclusivamente para el top 1% (1M+ seguidores). Sin mercado masivo. Las marcas no encuentran a cualquiera – encuentran a los mejores.",
        "80% en efectivo de cada trato va directamente a ti.",
        "20% se convierte en acciones – construyes patrimonio mientras trabajas.",
        "Protección anti-dilución en nuestros estatutos: Creadores + Fundadores = mayoría permanente. Ningún VC puede cambiar eso."
      ],
      benefitsTitle: "Tu Ventaja de Fundador (solo los primeros 100):",
      benefits: [
        "24 meses completamente gratis (regular: €5,000–10,000/mes)",
        "Compra de acciones a precio de fundador: €50/acción – un precio que no estará disponible después",
        "Opción de compra garantizada por 24 meses"
      ],
      ctaTitle: "Siguiente Paso:",
      ctaText: "Me encantaría explicarte el modelo personalmente en 15 minutos. Alternativamente, puedes enviar una carta de intención no vinculante:",
      buttonText: "Completar LOI no vinculante (2 min) →",
      spotText: "El Spot #{{SPOT}} está reservado para ti.",
      closing: "En verdadera asociación,",
      ps: "P.D.: Después del spot #100, todos pagan desde el día 1. La fase de fundación es limitada."
    },
    gold: {
      id: "es-gold",
      name: "Gold & Rising Star (1-10M) - Español",
      category: "gold",
      language: "es",
      subject: "Invitación Privada: Miembro Fundador en All-Influencer.com",
      subjectAlt1: "{{NAME}}, uno de 100 spots de fundador está reservado para ti",
      subjectAlt2: "24 meses gratis + acciones de la empresa – solo para los primeros 100",
      greeting: "Querido/a {{NAME}},",
      intro: "Hay plataformas para todos. Y luego está All-Influencer.com – la plataforma para el top 1%.",
      highlight: "Estás invitado/a a unirte a un grupo exclusivo donde el número de seguidores no es lo único que importa – sino la calidad, el impacto y el potencial.",
      modelTitle: "Lo que hace diferente a All-Influencer.com:",
      model: [
        "333 spots premium en todo el mundo – visibles, curados, exclusivos. Sin listas interminables, sin algoritmos que te oculten.",
        "Te conviertes en accionista: 80% en efectivo de cada trato va directamente a ti. 20% se convierte en acciones de la empresa.",
        "Protección estructural: Un mecanismo anti-dilución garantiza que Creadores + Fundadores mantengan la mayoría. Siempre."
      ],
      benefitsTitle: "Tu Ventaja de Fundador (solo los primeros 100):",
      benefits: [
        "24 meses completamente gratis (regular: €250–1,000/mes)",
        "Compra de acciones a precio de fundador: €50/acción – este precio no estará disponible después",
        "2 años de derecho de compra garantizado",
        "Insignia de Fundador de por vida en tu perfil"
      ],
      ctaTitle: "¿Interesado/a?",
      ctaText: "Completa una carta de intención no vinculante – sin obligación, solo una expresión de interés:",
      buttonText: "Completar LOI no vinculante (2 min) →",
      spotText: "El Spot #{{SPOT}} te está esperando.",
      closing: "Bienvenido/a al top 1%.",
      ps: "P.D.: Esta invitación fue enviada a un grupo seleccionado. Después del spot #100, cada nuevo miembro paga desde el día 1."
    }
  }
};

export function getTemplate(language, category) {
  return emailTemplates[language]?.[category] || null;
}

export function listTemplates() {
  const list = [];
  for (const [lang, categories] of Object.entries(emailTemplates)) {
    for (const [cat, template] of Object.entries(categories)) {
      list.push(template);
    }
  }
  return list;
}

export function replacePlaceholders(text, data) {
  if (!text) return '';
  return text
    .replace(/\{\{NAME\}\}/g, data.NAME || '[Name]')
    .replace(/\{\{SPOT\}\}/g, data.SPOT || '[XX]');
}

export function getLoiUrl(language) {
  return `${config.loiBaseUrl}&lang=${language}`;
}

export function generateEmailHTML(template, data = {}) {
  const t = typeof template === 'string' 
    ? getTemplate(data.language || 'de', template)
    : template;
  if (!t) return null;
  const { colors, sender } = config;
  const loiUrl = getLoiUrl(t.language);
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>All-Influencer.com</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${colors.background}; font-family: 'Segoe UI', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: ${colors.background};">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: ${colors.backgroundSecondary}; border-radius: 16px; border: 1px solid ${colors.border}; overflow: hidden;">
          <tr>
            <td style="background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%); padding: 30px; text-align: center;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <div style="width: 50px; height: 50px; background-color: #000; border-radius: 12px; display: inline-block; line-height: 50px; font-weight: bold; color: ${colors.primary}; font-size: 18px;">AI</div>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 15px;">
                    <h1 style="margin: 0; color: #000; font-size: 24px; font-weight: bold; letter-spacing: 2px;">ALL INFLUENCER</h1>
                    <p style="margin: 5px 0 0 0; color: rgba(0,0,0,0.7); font-size: 12px; letter-spacing: 3px;">PREMIUM NETWORK</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: ${colors.textLight}; font-size: 16px; margin: 0 0 20px 0;">${replacePlaceholders(t.greeting, data)}</p>
              <p style="color: ${colors.textMuted}; font-size: 15px; line-height: 1.6; margin: 0 0 15px 0;">${t.intro}</p>
              <div style="background: linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(217, 119, 6, 0.1) 100%); border-left: 4px solid ${colors.primary}; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
                <p style="color: #fbbf24; font-size: 15px; margin: 0; font-weight: 500;">${t.highlight}</p>
              </div>
              <h3 style="color: ${colors.primary}; font-size: 16px; margin: 30px 0 15px 0; font-weight: 600;">${t.modelTitle}</h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                ${t.model.map(item => `<tr><td style="padding: 8px 0;"><table role="presentation" cellspacing="0" cellpadding="0"><tr><td style="color: ${colors.primary}; font-size: 14px; vertical-align: top; padding-right: 10px;">▸</td><td style="color: ${colors.textGray}; font-size: 14px; line-height: 1.5;">${item}</td></tr></table></td></tr>`).join('')}
              </table>
              <h3 style="color: ${colors.primary}; font-size: 16px; margin: 30px 0 15px 0; font-weight: 600;">${t.benefitsTitle}</h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: rgba(251, 191, 36, 0.05); border-radius: 8px;">
                ${t.benefits.map(item => `<tr><td style="padding: 10px 15px;"><table role="presentation" cellspacing="0" cellpadding="0"><tr><td style="color: ${colors.success}; font-size: 14px; vertical-align: top; padding-right: 10px;">✓</td><td style="color: ${colors.textLight}; font-size: 14px; line-height: 1.5;">${item}</td></tr></table></td></tr>`).join('')}
              </table>
              <h3 style="color: ${colors.textLight}; font-size: 16px; margin: 30px 0 10px 0; font-weight: 600;">${t.ctaTitle}</h3>
              <p style="color: ${colors.textMuted}; font-size: 14px; line-height: 1.6; margin: 0 0 25px 0;">${t.ctaText}</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="${loiUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%); color: #000000; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: bold; font-size: 15px; letter-spacing: 0.5px;">${t.buttonText}</a>
                  </td>
                </tr>
              </table>
              <p style="color: ${colors.primary}; font-size: 14px; text-align: center; margin: 25px 0; font-weight: 500;">${replacePlaceholders(t.spotText, data)}</p>
              <div style="margin-top: 40px; padding-top: 25px; border-top: 1px solid ${colors.border};">
                <p style="color: ${colors.textMuted}; font-size: 14px; margin: 0 0 20px 0;">${t.closing}</p>
                <p style="color: ${colors.textLight}; font-size: 16px; font-weight: 700; margin: 0;">${sender.name}</p>
                <p style="color: ${colors.textGray}; font-size: 14px; margin: 8px 0 0 0;">${sender.title}</p>
                <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top: 15px;">
                  <tr>
                    <td style="padding-right: 20px;">
                      <a href="tel:${sender.phone.replace(/\s/g, '')}" style="color: #fbbf24; font-size: 14px; text-decoration: none; font-weight: 500;">📱 ${sender.phone}</a>
                    </td>
                    <td>
                      <a href="mailto:${sender.email}" style="color: #fbbf24; font-size: 14px; text-decoration: none; font-weight: 500;">✉️ ${sender.email}</a>
                    </td>
                  </tr>
                </table>
              </div>
              <div style="margin-top: 30px; padding: 15px; background-color: rgba(251, 191, 36, 0.08); border-left: 3px solid ${colors.primary}; border-radius: 0 8px 8px 0;">
                <p style="color: ${colors.textGray}; font-size: 13px; margin: 0; font-style: italic;">${t.ps}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color: #000000; padding: 25px 30px; text-align: center; border-top: 1px solid rgba(251, 191, 36, 0.2);">
              <p style="color: #6b7280; font-size: 11px; margin: 0;">© 2025 ALL INFLUENCER. All rights reserved.</p>
              <p style="color: #4b5563; font-size: 10px; margin: 10px 0 0 0;">
                <a href="https://all-influencer.com" style="color: ${colors.primary}; text-decoration: none;">all-influencer.com</a>
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

export function generatePlainText(template, data = {}) {
  const t = typeof template === 'string' 
    ? getTemplate(data.language || 'de', template)
    : template;
  if (!t) return null;
  const loiUrl = getLoiUrl(t.language);
  const { sender } = config;
  return `${replacePlaceholders(t.greeting, data)}

${t.intro}

${t.highlight}

${t.modelTitle}
${t.model.map(item => '• ' + item).join('\n')}

${t.benefitsTitle}
${t.benefits.map(item => '✓ ' + item).join('\n')}

${t.ctaTitle}
${t.ctaText}

👉 ${t.buttonText}
${loiUrl}

${replacePlaceholders(t.spotText, data)}

${t.closing}

${sender.name}
${sender.title}
📱 ${sender.phone}
✉️ ${sender.email}

${t.ps}`;
}

export default {
  config,
  emailTemplates,
  getTemplate,
  listTemplates,
  replacePlaceholders,
  getLoiUrl,
  generateEmailHTML,
  generatePlainText
};
