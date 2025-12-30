/**
 * Stripe Client Helper
 * Wird im Frontend verwendet um zur Checkout-Seite weiterzuleiten
 */

import { loadStripe } from '@stripe/stripe-js';

// Stripe Promise initialisieren (nur einmal laden)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

/**
 * Startet den Stripe Checkout Prozess
 * 
 * @param {Object} bookingData - Buchungsdaten
 * @param {string} bookingData.category - Kategorie (diamond, platinum, gold, risingStar)
 * @param {number} bookingData.rank - Platz-Nummer
 * @param {number[]} bookingData.months - Array mit Monatsindizes (0-11)
 * @param {string} bookingData.monthNames - Monatsnamen als String
 * @param {number} bookingData.pricePerMonth - Preis pro Monat
 * @param {number} bookingData.totalAmount - Gesamtbetrag
 * @param {string} bookingData.influencerName - Name des Influencers (optional)
 * @param {string} bookingData.customerEmail - E-Mail des Kunden (optional)
 */
export async function startCheckout(bookingData) {
  try {
    // 1. Checkout Session auf dem Server erstellen
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Fehler beim Erstellen der Checkout-Session');
    }

    // 2. Zur Stripe Checkout-Seite weiterleiten
    if (data.url) {
      // Einfache Weiterleitung zur Stripe-hosted Checkout-Seite
      window.location.href = data.url;
    } else {
      // Fallback: Stripe.js verwenden
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (error) {
        throw error;
      }
    }

  } catch (error) {
    console.error('Checkout Error:', error);
    throw error;
  }
}

export default stripePromise;
