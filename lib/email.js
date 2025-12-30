/**
 * E-Mail-Utility für ALL INFLUENCER
 * 
 * Verwendet Resend als E-Mail-Service
 * Kostenloser Plan: 100 E-Mails/Tag, 3000/Monat
 * 
 * Setup:
 * 1. Account erstellen: https://resend.com
 * 2. API Key erstellen
 * 3. Domain verifizieren (oder onboarding@resend.dev für Tests)
 * 4. RESEND_API_KEY in Vercel Environment Variables setzen
 */

// E-Mail Templates
const templates = {
  de: {
    welcome: {
      subject: 'Willkommen bei ALL INFLUENCER! 🎉',
      getHtml: (data) => `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #000; color: #fff; margin: 0; padding: 40px 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #111827; border-radius: 16px; padding: 40px; }
            .logo { color: #fbbf24; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 30px; }
            h1 { color: #fff; font-size: 28px; margin: 0 0 20px; }
            p { color: #9ca3af; line-height: 1.6; margin: 0 0 15px; }
            .highlight { color: #fbbf24; }
            .button { display: inline-block; background: #fbbf24; color: #000; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 20px 0; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #374151; text-align: center; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">ALL INFLUENCER</div>
            <h1>Willkommen, ${data.name || 'Creator'}! 🎉</h1>
            <p>Vielen Dank für deine Registrierung bei <span class="highlight">ALL INFLUENCER</span>.</p>
            <p>Dein Account wird derzeit von unserem Team überprüft. Dies dauert normalerweise <strong>24-48 Stunden</strong>.</p>
            <p>Sobald dein Account freigeschaltet wurde, erhältst du eine weitere E-Mail und kannst alle Funktionen der Plattform nutzen.</p>
            <a href="${data.loginUrl || 'https://all-influencer.com/portal/login'}" class="button">Zum Portal →</a>
            <div class="footer">
              <p>Bei Fragen erreichst du uns unter support@all-influencer.com</p>
              <p>© ${new Date().getFullYear()} ALL INFLUENCER. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </body>
        </html>
      `
    },
    approved: {
      subject: 'Dein Account wurde freigeschaltet! ✅',
      getHtml: (data) => `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #000; color: #fff; margin: 0; padding: 40px 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #111827; border-radius: 16px; padding: 40px; }
            .logo { color: #fbbf24; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 30px; }
            h1 { color: #fff; font-size: 28px; margin: 0 0 20px; }
            p { color: #9ca3af; line-height: 1.6; margin: 0 0 15px; }
            .highlight { color: #fbbf24; }
            .success-badge { display: inline-block; background: #059669; color: #fff; padding: 8px 16px; border-radius: 20px; font-size: 14px; margin-bottom: 20px; }
            .button { display: inline-block; background: #fbbf24; color: #000; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 20px 0; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #374151; text-align: center; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">ALL INFLUENCER</div>
            <span class="success-badge">✅ Account aktiviert</span>
            <h1>Herzlichen Glückwunsch!</h1>
            <p>Dein Account bei <span class="highlight">ALL INFLUENCER</span> wurde erfolgreich freigeschaltet.</p>
            <p>Du kannst jetzt alle Funktionen der Plattform nutzen:</p>
            <ul style="color: #9ca3af; padding-left: 20px;">
              <li>Dein Profil vervollständigen</li>
              <li>Mit Brands/Influencern kommunizieren</li>
              <li>Aufträge annehmen oder erstellen</li>
            </ul>
            <a href="${data.loginUrl || 'https://all-influencer.com/portal/login'}" class="button">Jetzt loslegen →</a>
            <div class="footer">
              <p>© ${new Date().getFullYear()} ALL INFLUENCER. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </body>
        </html>
      `
    },
    passwordReset: {
      subject: 'Passwort zurücksetzen - ALL INFLUENCER',
      getHtml: (data) => `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #000; color: #fff; margin: 0; padding: 40px 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #111827; border-radius: 16px; padding: 40px; }
            .logo { color: #fbbf24; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 30px; }
            h1 { color: #fff; font-size: 28px; margin: 0 0 20px; }
            p { color: #9ca3af; line-height: 1.6; margin: 0 0 15px; }
            .highlight { color: #fbbf24; }
            .button { display: inline-block; background: #fbbf24; color: #000; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 20px 0; }
            .warning { background: #7c2d12; border: 1px solid #ea580c; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .warning p { color: #fed7aa; margin: 0; font-size: 14px; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #374151; text-align: center; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">ALL INFLUENCER</div>
            <h1>Passwort zurücksetzen</h1>
            <p>Du hast angefordert, dein Passwort für <span class="highlight">ALL INFLUENCER</span> zurückzusetzen.</p>
            <p>Klicke auf den Button unten, um ein neues Passwort zu erstellen:</p>
            <a href="${data.resetUrl}" class="button">Neues Passwort erstellen →</a>
            <div class="warning">
              <p>⚠️ Dieser Link ist nur <strong>1 Stunde</strong> gültig. Falls du diese Anfrage nicht gestellt hast, ignoriere diese E-Mail.</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} ALL INFLUENCER. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </body>
        </html>
      `
    }
  },
  en: {
    welcome: {
      subject: 'Welcome to ALL INFLUENCER! 🎉',
      getHtml: (data) => `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #000; color: #fff; margin: 0; padding: 40px 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #111827; border-radius: 16px; padding: 40px; }
            .logo { color: #fbbf24; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 30px; }
            h1 { color: #fff; font-size: 28px; margin: 0 0 20px; }
            p { color: #9ca3af; line-height: 1.6; margin: 0 0 15px; }
            .highlight { color: #fbbf24; }
            .button { display: inline-block; background: #fbbf24; color: #000; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 20px 0; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #374151; text-align: center; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">ALL INFLUENCER</div>
            <h1>Welcome, ${data.name || 'Creator'}! 🎉</h1>
            <p>Thank you for registering at <span class="highlight">ALL INFLUENCER</span>.</p>
            <p>Your account is currently being reviewed by our team. This usually takes <strong>24-48 hours</strong>.</p>
            <p>Once your account is approved, you will receive another email and can use all platform features.</p>
            <a href="${data.loginUrl || 'https://all-influencer.com/portal/login'}" class="button">Go to Portal →</a>
            <div class="footer">
              <p>Questions? Contact us at support@all-influencer.com</p>
              <p>© ${new Date().getFullYear()} ALL INFLUENCER. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    },
    approved: {
      subject: 'Your account has been approved! ✅',
      getHtml: (data) => `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #000; color: #fff; margin: 0; padding: 40px 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #111827; border-radius: 16px; padding: 40px; }
            .logo { color: #fbbf24; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 30px; }
            h1 { color: #fff; font-size: 28px; margin: 0 0 20px; }
            p { color: #9ca3af; line-height: 1.6; margin: 0 0 15px; }
            .highlight { color: #fbbf24; }
            .success-badge { display: inline-block; background: #059669; color: #fff; padding: 8px 16px; border-radius: 20px; font-size: 14px; margin-bottom: 20px; }
            .button { display: inline-block; background: #fbbf24; color: #000; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 20px 0; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #374151; text-align: center; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">ALL INFLUENCER</div>
            <span class="success-badge">✅ Account activated</span>
            <h1>Congratulations!</h1>
            <p>Your account at <span class="highlight">ALL INFLUENCER</span> has been successfully approved.</p>
            <p>You can now use all platform features:</p>
            <ul style="color: #9ca3af; padding-left: 20px;">
              <li>Complete your profile</li>
              <li>Communicate with brands/influencers</li>
              <li>Accept or create orders</li>
            </ul>
            <a href="${data.loginUrl || 'https://all-influencer.com/portal/login'}" class="button">Get started →</a>
            <div class="footer">
              <p>© ${new Date().getFullYear()} ALL INFLUENCER. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    },
    passwordReset: {
      subject: 'Reset your password - ALL INFLUENCER',
      getHtml: (data) => `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #000; color: #fff; margin: 0; padding: 40px 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #111827; border-radius: 16px; padding: 40px; }
            .logo { color: #fbbf24; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 30px; }
            h1 { color: #fff; font-size: 28px; margin: 0 0 20px; }
            p { color: #9ca3af; line-height: 1.6; margin: 0 0 15px; }
            .highlight { color: #fbbf24; }
            .button { display: inline-block; background: #fbbf24; color: #000; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 20px 0; }
            .warning { background: #7c2d12; border: 1px solid #ea580c; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .warning p { color: #fed7aa; margin: 0; font-size: 14px; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #374151; text-align: center; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">ALL INFLUENCER</div>
            <h1>Reset your password</h1>
            <p>You requested to reset your password for <span class="highlight">ALL INFLUENCER</span>.</p>
            <p>Click the button below to create a new password:</p>
            <a href="${data.resetUrl}" class="button">Create new password →</a>
            <div class="warning">
              <p>⚠️ This link is only valid for <strong>1 hour</strong>. If you did not request this, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} ALL INFLUENCER. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    }
  },
  es: {
    welcome: {
      subject: '¡Bienvenido a ALL INFLUENCER! 🎉',
      getHtml: (data) => `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #000; color: #fff; margin: 0; padding: 40px 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #111827; border-radius: 16px; padding: 40px; }
            .logo { color: #fbbf24; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 30px; }
            h1 { color: #fff; font-size: 28px; margin: 0 0 20px; }
            p { color: #9ca3af; line-height: 1.6; margin: 0 0 15px; }
            .highlight { color: #fbbf24; }
            .button { display: inline-block; background: #fbbf24; color: #000; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 20px 0; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #374151; text-align: center; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">ALL INFLUENCER</div>
            <h1>¡Bienvenido, ${data.name || 'Creator'}! 🎉</h1>
            <p>Gracias por registrarte en <span class="highlight">ALL INFLUENCER</span>.</p>
            <p>Tu cuenta está siendo revisada por nuestro equipo. Esto normalmente toma <strong>24-48 horas</strong>.</p>
            <p>Una vez que tu cuenta sea aprobada, recibirás otro correo y podrás usar todas las funciones de la plataforma.</p>
            <a href="${data.loginUrl || 'https://all-influencer.com/portal/login'}" class="button">Ir al Portal →</a>
            <div class="footer">
              <p>¿Preguntas? Contáctanos en support@all-influencer.com</p>
              <p>© ${new Date().getFullYear()} ALL INFLUENCER. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
        </html>
      `
    },
    approved: {
      subject: '¡Tu cuenta ha sido aprobada! ✅',
      getHtml: (data) => `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #000; color: #fff; margin: 0; padding: 40px 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #111827; border-radius: 16px; padding: 40px; }
            .logo { color: #fbbf24; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 30px; }
            h1 { color: #fff; font-size: 28px; margin: 0 0 20px; }
            p { color: #9ca3af; line-height: 1.6; margin: 0 0 15px; }
            .highlight { color: #fbbf24; }
            .success-badge { display: inline-block; background: #059669; color: #fff; padding: 8px 16px; border-radius: 20px; font-size: 14px; margin-bottom: 20px; }
            .button { display: inline-block; background: #fbbf24; color: #000; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 20px 0; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #374151; text-align: center; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">ALL INFLUENCER</div>
            <span class="success-badge">✅ Cuenta activada</span>
            <h1>¡Felicitaciones!</h1>
            <p>Tu cuenta en <span class="highlight">ALL INFLUENCER</span> ha sido aprobada exitosamente.</p>
            <p>Ahora puedes usar todas las funciones de la plataforma:</p>
            <ul style="color: #9ca3af; padding-left: 20px;">
              <li>Completar tu perfil</li>
              <li>Comunicarte con marcas/influencers</li>
              <li>Aceptar o crear pedidos</li>
            </ul>
            <a href="${data.loginUrl || 'https://all-influencer.com/portal/login'}" class="button">Comenzar →</a>
            <div class="footer">
              <p>© ${new Date().getFullYear()} ALL INFLUENCER. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
        </html>
      `
    },
    passwordReset: {
      subject: 'Restablecer contraseña - ALL INFLUENCER',
      getHtml: (data) => `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #000; color: #fff; margin: 0; padding: 40px 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #111827; border-radius: 16px; padding: 40px; }
            .logo { color: #fbbf24; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 30px; }
            h1 { color: #fff; font-size: 28px; margin: 0 0 20px; }
            p { color: #9ca3af; line-height: 1.6; margin: 0 0 15px; }
            .highlight { color: #fbbf24; }
            .button { display: inline-block; background: #fbbf24; color: #000; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 20px 0; }
            .warning { background: #7c2d12; border: 1px solid #ea580c; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .warning p { color: #fed7aa; margin: 0; font-size: 14px; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #374151; text-align: center; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">ALL INFLUENCER</div>
            <h1>Restablecer contraseña</h1>
            <p>Solicitaste restablecer tu contraseña para <span class="highlight">ALL INFLUENCER</span>.</p>
            <p>Haz clic en el botón para crear una nueva contraseña:</p>
            <a href="${data.resetUrl}" class="button">Crear nueva contraseña →</a>
            <div class="warning">
              <p>⚠️ Este enlace solo es válido por <strong>1 hora</strong>. Si no solicitaste esto, ignora este correo.</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} ALL INFLUENCER. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
        </html>
      `
    }
  }
};

/**
 * Sendet eine E-Mail über Resend
 * @param {Object} options - E-Mail-Optionen
 * @param {string} options.to - Empfänger E-Mail
 * @param {string} options.template - Template-Name (welcome, approved, passwordReset)
 * @param {Object} options.data - Template-Daten
 * @param {string} options.lang - Sprache (de, en, es)
 */
export async function sendEmail({ to, template, data = {}, lang = 'de' }) {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.error('RESEND_API_KEY nicht konfiguriert');
    // In Entwicklung/ohne API Key: Log statt Fehler
    console.log('📧 E-Mail würde gesendet werden an:', to);
    console.log('📧 Template:', template, '| Sprache:', lang);
    console.log('📧 Daten:', data);
    return { success: true, mock: true };
  }

  // Template holen
  const langTemplates = templates[lang] || templates.de;
  const emailTemplate = langTemplates[template];
  
  if (!emailTemplate) {
    throw new Error(`Template "${template}" nicht gefunden`);
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || 'ALL INFLUENCER <noreply@all-influencer.com>',
        to: [to],
        subject: emailTemplate.subject,
        html: emailTemplate.getHtml(data)
     })
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Resend Fehler:', result);
      throw new Error(result.message || 'E-Mail konnte nicht gesendet werden');
    }

    console.log('✅ E-Mail gesendet an:', to);
    return { success: true, id: result.id };
  } catch (error) {
    console.error('E-Mail-Fehler:', error);
    throw error;
  }
}

/**
 * Sendet Welcome-E-Mail nach Registrierung
 */
export async function sendWelcomeEmail(email, data = {}, lang = 'de') {
  return sendEmail({
    to: email,
    template: 'welcome',
    data: {
      loginUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://all-influencer.com'}/portal/login`,
      ...data
    },
    lang
  });
}

/**
 * Sendet Approved-E-Mail nach Freischaltung
 */
export async function sendApprovedEmail(email, data = {}, lang = 'de') {
  return sendEmail({
    to: email,
    template: 'approved',
    data: {
      loginUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://all-influencer.com'}/portal/login`,
      ...data
    },
    lang
  });
}

/**
 * Sendet Passwort-Reset-E-Mail
 */
export async function sendPasswordResetEmail(email, resetToken, lang = 'de') {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://all-influencer.com';
  return sendEmail({
    to: email,
    template: 'passwordReset',
    data: {
      resetUrl: `${baseUrl}/portal/reset-password?token=${resetToken}`
    },
    lang
  });
}

export default {
  sendEmail,
  sendWelcomeEmail,
  sendApprovedEmail,
  sendPasswordResetEmail
};


