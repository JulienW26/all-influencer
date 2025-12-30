/**
 * Booking Success Page
 * Wird nach erfolgreicher Stripe-Zahlung angezeigt
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function BookingSuccess() {
  const router = useRouter();
  const { session_id } = router.query;
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (session_id) {
      // Optional: Session-Details vom Server abrufen
      setStatus('success');
    }
  }, [session_id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {status === 'loading' ? (
          <div className="w-12 h-12 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
        ) : (
          <>
            {/* Success Icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Buchung erfolgreich!
            </h1>

            {/* Message */}
            <p className="text-gray-400 mb-8">
              Vielen Dank für deine Buchung. Du erhältst in Kürze eine Bestätigungs-E-Mail mit allen Details.
            </p>

            {/* Info Box */}
            <div className="bg-gray-800/50 border border-amber-400/30 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-amber-400 mb-2">Nächste Schritte:</h3>
              <ul className="text-gray-300 text-sm text-left space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">1.</span>
                  <span>Prüfe dein E-Mail-Postfach für die Bestätigung</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">2.</span>
                  <span>Unser Team wird sich innerhalb von 24h bei dir melden</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">3.</span>
                  <span>Bereite deine Profilinfos und Medien vor</span>
                </li>
              </ul>
            </div>

            {/* Back Button */}
            <button
              onClick={() => router.push('/')}
              className="px-8 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black font-semibold rounded-lg transition-all"
            >
              Zurück zur Startseite
            </button>
          </>
        )}
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}
