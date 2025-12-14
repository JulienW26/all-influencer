import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  console.log('=== WEBHOOK GESTARTET ===');
  console.log('Method:', req.method);
  
  if (req.method !== 'POST') {
    console.log('Nicht POST - abgelehnt');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // VOLLSTÄNDIGEN Body loggen
    console.log('=== REQUEST BODY (komplett) ===');
    console.log(JSON.stringify(req.body, null, 2));
    
    // API Key Check
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ KRITISCH: RESEND_API_KEY fehlt!');
      return res.status(500).json({ error: 'API Key fehlt' });
    }
    console.log('✅ API Key vorhanden:', process.env.RESEND_API_KEY.substring(0, 15) + '...');

    // Daten extrahieren - mehrere Varianten probieren
    let emailData;
    if (req.body.data) {
      console.log('Daten in req.body.data gefunden');
      emailData = req.body.data;
    } else if (req.body.record) {
      console.log('Daten in req.body.record gefunden');
      emailData = req.body.record;
    } else {
      console.log('Daten direkt in req.body');
      emailData = req.body;
    }

    console.log('=== EMAIL DATA ===');
    console.log(JSON.stringify(emailData, null, 2));

    const from = emailData.from || emailData.sender || emailData.from_email;
    const subject = emailData.subject || 'Kein Betreff';
    const htmlBody = emailData.html || emailData.html_body || emailData.body_html || '';
    const textBody = emailData.text || emailData.text_body || emailData.body_text || '';

    console.log('Extrahiert:');
    console.log('- Von:', from);
    console.log('- Betreff:', subject);
    console.log('- HTML vorhanden:', !!htmlBody);
    console.log('- Text vorhanden:', !!textBody);

    if (!from || !subject) {
      console.error('❌ FEHLER: from oder subject fehlt!');
      console.error('from:', from);
      console.error('subject:', subject);
      return res.status(400).json({ 
        error: 'Ungültige Daten',
        received: { from, subject }
      });
    }

    console.log('=== VERSUCHE E-MAIL ZU SENDEN ===');
    console.log('Von: contact@all-influencer.com');
    console.log('An: bruderino@proton.me');
    console.log('Betreff: [Weitergeleitet]', subject);

    const sendResult = await resend.emails.send({
      from: 'contact@all-influencer.com',
      to: 'bruderino@proton.me',
      subject: `[Weitergeleitet] ${subject}`,
      html: `
        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
          <p><strong>Weitergeleitet von:</strong> ${from}</p>
          <p><strong>Betreff:</strong> ${subject}</p>
          <p><strong>Zeit:</strong> ${new Date().toISOString()}</p>
        </div>
        <hr>
        ${htmlBody || textBody || 'Keine Nachricht vorhanden'}
      `,
    });

    console.log('✅ ✅ ✅ ERFOLGREICH GESENDET! ✅ ✅ ✅');
    console.log('Resend Response:', JSON.stringify(sendResult, null, 2));
    
    return res.status(200).json({ 
      success: true, 
      id: sendResult.id,
      message: 'E-Mail erfolgreich weitergeleitet'
    });

  } catch (error) {
    console.error('❌ ❌ ❌ FEHLER BEIM SENDEN ❌ ❌ ❌');
    console.error('Error Message:', error.message);
    console.error('Error Stack:', error.stack);
    console.error('Error Details:', JSON.stringify(error, null, 2));
    
    return res.status(500).json({ 
      error: error.message,
      stack: error.stack
    });
  }
}
