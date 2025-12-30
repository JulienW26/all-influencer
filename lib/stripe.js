/**
 * Stripe Client Helper
 */

import { loadStripe } from '@stripe/stripe-js';

// Publishable Key direkt eingetragen (ist NICHT geheim, darf im Frontend sein)
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51Si4DjAAOnveno0EYdBEB8prNGMvXWKlxKT97LkNDQziqGdvnguwfLXXG1V2j8UWJ8k2jzHfRHX5QqKp0P73EUOU003NhE4EfO';

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export async function startCheckout(bookingData) {
  try {
    console.log('Starting checkout with data:', bookingData);
    
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });

    console.log('API Response status:', response.status);
    
    const data = await response.json();
    console.log('API Response data:', data);

    if (!response.ok) {
      throw new Error(data.error || data.details || 'Fehler beim Erstellen der Checkout-Session');
    }

    if (data.url) {
      window.location.href = data.url;
    } else {
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
      if (error) throw error;
    }
  } catch (error) {
    console.error('Checkout Error:', error);
    throw error;
  }
}

export default stripePromise;
