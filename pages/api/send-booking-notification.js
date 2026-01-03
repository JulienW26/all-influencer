import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { session_id } = req.body;
  
  if (!session_id) {
    return res.status(400).json({ error: 'Missing session_id' });
  }
  
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items', 'customer_details']
    });
    
    const customerEmail = session.customer_details?.email || 'Unknown';
    const customerName = session.customer_details?.name || 'Unknown';
    const amount = (session.amount_total / 100).toFixed(2);
    const currency = session.currency?.toUpperCase() || 'EUR';
    const productName = session.line_items?.data?.[0]?.description || 'Influencer Buchung';
    const paymentStatus = session.payment_status;
    const createdAt = new Date(session.created * 1000).toLocaleString('de-DE', {
      dateStyle: 'full',
      timeStyle: 'short'
    });
    
    const emailSubject = `Neue Buchung: ${productName} - ${customerName}`;
    
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
    .detail-row { padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
    .label { font-weight: bold; color: #6b7280; }
    .footer { background: #1f2937; color: #9ca3af; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">🎉 Neue Buchung!</h1>
    </div>
    <div class="content">
      <h2 style="color: #d97706; margin-top: 0;">Buchungsdetails</h2>
      <div class="detail-row"><span class="label">Kunde:</span> ${customerName}</div>
      <div class="detail-row"><span class="label">E-Mail:</span> <a href="mailto:${customerEmail}">${customerEmail}</a></div>
      <div class="detail-row"><span class="label">Produkt:</span> ${productName}</div>
      <div class="detail-row"><span class="label">Betrag:</span> <strong>${currency} ${amount}</strong></div>
      <div class="detail-row"><span class="label">Status:</span> ${paymentStatus === 'paid' ? '✅ Bezahlt' : '⏳ ' + paymentStatus}</div>
      <div class="detail-row"><span class="label">Datum:</span> ${createdAt}</div>
      <p style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
        <strong>⏰ Erinnerung:</strong> Bitte kontaktiere den Kunden innerhalb von 24 Stunden.
      </p>
    </div>
    <div class="footer">
      <p style="margin: 0;">all-influencer.com</p>
    </div>
  </div>
</body>
</html>`;

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromAddress = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    
    if (resendApiKey) {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: fromAddress,
          to: ['contact@all-influencer.com'],
          subject: emailSubject,
          html: emailHtml
        })
      });
      
      const emailResult = await emailResponse.json();
      
      if (!emailResponse.ok) {
        console.error('Resend API error:', emailResult);
        return res.status(200).json({ success: true, emailSent: false, error: emailResult });
      }
      
      return res.status(200).json({ success: true, emailSent: true, emailId: emailResult.id });
    }
    
    return res.status(200).json({ success: true, emailSent: false, message: 'No API key' });
    
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
