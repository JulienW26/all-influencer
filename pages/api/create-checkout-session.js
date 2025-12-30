/**
 * Stripe Checkout Session API
 * Erstellt eine Checkout-Session für Influencer-Buchungen
 * 
 * MARKETPLACE MODEL:
 * - Brand zahlt an Plattform
 * - Plattform behält 20%
 * - Influencer erhält 80% (nach Connect-Einrichtung)
 */

import Stripe from 'stripe';

// Stripe mit expliziter API-Version initialisieren
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export default async function handler(req, res) {
  // CORS Headers für alle Requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Prüfe ob Stripe Key vorhanden ist
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY is not set');
    return res.status(500).json({ 
      error: 'Server-Konfigurationsfehler',
      details: 'Stripe ist nicht konfiguriert' 
    });
  }

  try {
    const { 
      category,
      rank,
      months,
      monthNames,
      pricePerMonth,
      totalAmount,
      influencerName,
      customerEmail 
    } = req.body;

    // Validierung
    if (!category || !months || !totalAmount) {
      return res.status(400).json({ 
        error: 'Fehlende Pflichtfelder',
        details: `category: ${category}, months: ${months}, totalAmount: ${totalAmount}`
      });
    }

    // Produktbeschreibung erstellen
    const categoryNames = {
      diamond: 'Diamond',
      platinum: 'Platin', 
      gold: 'Gold',
      risingStar: 'Rising Star'
    };

    const description = `${categoryNames[category] || category} Platz #${rank} - ${monthNames} 2026`;

    // Base URL ermitteln (funktioniert sowohl lokal als auch in Production)
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const baseUrl = `${protocol}://${host}`;

    console.log('Creating checkout session with baseUrl:', baseUrl);

    // Checkout Session erstellen
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Influencer Buchung: ${categoryNames[category] || category}`,
              description: description,
            },
            unit_amount: Math.round(totalAmount * 100), // Stripe erwartet Cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/?booking=cancelled`,
      customer_email: customerEmail || undefined,
      metadata: {
        category: category,
        rank: String(rank),
        months: Array.isArray(months) ? months.join(',') : String(months),
        influencerName: influencerName || '',
        type: 'influencer_booking'
      },
    });

    console.log('Checkout session created:', session.id);

    res.status(200).json({ 
      sessionId: session.id,
      url: session.url 
    });

  } catch (error) {
    console.error('Stripe Error:', error);
    res.status(500).json({ 
      error: 'Fehler beim Erstellen der Checkout-Session',
      details: error.message 
    });
  }
}
