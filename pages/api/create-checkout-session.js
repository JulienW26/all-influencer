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

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
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
      return res.status(400).json({ error: 'Fehlende Pflichtfelder' });
    }

    // Produktbeschreibung erstellen
    const categoryNames = {
      diamond: 'Diamond',
      platinum: 'Platin', 
      gold: 'Gold',
      risingStar: 'Rising Star'
    };

    const description = `${categoryNames[category]} Platz #${rank} - ${monthNames} 2026`;

    // Checkout Session erstellen
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Influencer Buchung: ${categoryNames[category]}`,
              description: description,
              metadata: {
                category: category,
                rank: rank,
                months: months.join(',')
              }
            },
            unit_amount: totalAmount * 100, // Stripe erwartet Cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/?booking=cancelled`,
      customer_email: customerEmail || undefined,
      metadata: {
        category: category,
        rank: rank,
        months: months.join(','),
        influencerName: influencerName || '',
        type: 'influencer_booking'
      },
      // Für zukünftige Connect-Integration (wenn Influencer Stripe-Accounts haben):
      // payment_intent_data: {
      //   application_fee_amount: Math.round(totalAmount * 0.20 * 100), // 20% Plattform-Gebühr
      //   transfer_data: {
      //     destination: 'INFLUENCER_STRIPE_ACCOUNT_ID',
      //   },
      // },
    });

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
