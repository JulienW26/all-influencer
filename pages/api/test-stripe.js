export default async function handler(req, res) {
  // Test 1: Prüfe ob STRIPE_SECRET_KEY existiert
  const hasKey = !!process.env.STRIPE_SECRET_KEY;
  const keyStart = process.env.STRIPE_SECRET_KEY 
    ? process.env.STRIPE_SECRET_KEY.substring(0, 12) + '...' 
    : 'NOT SET';
  
  // Test 2: Versuche Stripe zu initialisieren
  let stripeStatus = 'not tested';
  let stripeError = null;
  
  if (hasKey) {
    try {
      const Stripe = require('stripe');
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      
      // Test API Call
      const balance = await stripe.balance.retrieve();
      stripeStatus = 'working';
    } catch (error) {
      stripeStatus = 'error';
      stripeError = error.message;
    }
  }
  
  res.status(200).json({
    timestamp: new Date().toISOString(),
    environment: {
      STRIPE_SECRET_KEY: keyStart,
      hasKey: hasKey,
    },
    stripeTest: {
      status: stripeStatus,
      error: stripeError,
    }
  });
}
