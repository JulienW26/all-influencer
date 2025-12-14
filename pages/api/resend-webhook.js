import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Nur POST-Anfragen akzeptieren
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('=== WEBHOOK EMPFANGEN ===');
    
    // WICHTIG: Resend sendet Daten in req.body.data
    const emailData = req.body.data || req.body;
    
    const from = emailData.from;
    const to = emailData.to || emailData.email;
    const subject = emailData.subject;
    const htmlBody = emailData.html || emailData.html_body || '';
    const textBody = emailData.text || emailData.text_body || '';

    console.log('Von:', from);
    console.log('An:', to);
    console.log('Betreff:', subject);

    // Prüfen ob Daten vorhanden sind
    if (!from || !subject) {
      console.error('FEHLER: Keine from/subject Daten empfangen');
      return res.status(400).json({ error: 'Ungültige Daten' });
    }

    console.log('Leite weiter an: bruderino@proton.me');

    // E-Mail an ProtonMail weiterleiten
    const result = await resend.emails.send({
      from: 'contact@all-influencer.com',
      to: 'bruderino@proton.me',
      subject: `[Weitergeleitet] ${subject}`,
      html: `
        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
          <p><strong>Weitergeleitet von:</strong> ${from}</p>
          <p><strong>Original an:</strong> ${to || 'contact@all-influencer.com'}</p>
          <p><strong>Betreff:</strong> ${subject}</p>
        </div>
        <hr>
        ${htmlBody || textBody || 'Keine Nachricht vorhanden'}
      `,
    });

    console.log('✅ ERFOLGREICH! E-Mail weitergeleitet!');
    console.log('Resend ID:', result.id);
    
    return res.status(200).json({ success: true, id: result.id });
  } catch (error) {
    console.error('❌ FEHLER:', error.message);
    return res.status(500).json({ error: error.message });
  }
}
