import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Nur POST-Anfragen akzeptieren
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // E-Mail-Daten von Resend empfangen
    const { from, to, subject, html, text } = req.body;

    console.log('Eingehende E-Mail empfangen:', { from, to, subject });

    // E-Mail an Ihre ProtonMail weiterleiten
    await resend.emails.send({
      from: 'contact@all-influencer.com',
      to: 'bruderino@proton.me',
      subject: `[Weitergeleitet] ${subject}`,
      html: `
        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
          <p><strong>Weitergeleitet von:</strong> ${from}</p>
          <p><strong>Original an:</strong> ${to}</p>
          <p><strong>Betreff:</strong> ${subject}</p>
        </div>
        <hr>
        ${html || text || 'Keine Nachricht vorhanden'}
      `,
    });

    console.log('E-Mail erfolgreich weitergeleitet an bruderino@proton.me');
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Fehler beim Weiterleiten:', error);
    return res.status(500).json({ error: error.message });
  }
}
```

**✅ Ich habe Ihre ProtonMail-Adresse bereits eingefügt: `bruderino@proton.me`**

---

### **Schritt 5: Speichern**

1. Scrollen Sie nach unten
2. Im Feld **"Commit message"** steht automatisch etwas drin
3. Sie können es so lassen oder ändern zu: "Add email forwarding webhook"
4. Klicken Sie auf den grünen Button **"Commit new file"**

---

### **Schritt 6: Warten Sie ~1 Minute**

- GitHub speichert die Datei
- Vercel erkennt die Änderung automatisch
- Vercel deployt die neue Version (dauert ca. 30-60 Sekunden)

**Sie können den Fortschritt sehen:**
- Gehen Sie zu Vercel → Ihr Projekt → **"Deployments"**
- Der neueste Deployment sollte "Building..." oder "Ready" zeigen

---

### **Schritt 7: Webhook bei Resend konfigurieren**

**Jetzt kommt der letzte Schritt bei Resend:**

1. Gehen Sie zu: https://resend.com/webhooks
2. Klicken Sie auf **"Create Webhook"** oder **"Add Endpoint"**

**Geben Sie ein:**
```
Endpoint URL: https://www.all-influencer.com/api/resend-webhook
