1   // pages/api/submit-loi.js
2   import { Resend } from 'resend';
3   
4   const resend = new Resend(process.env.RESEND_API_KEY);
5   
6   export default async function handler(req, res) {
7     if (req.method !== 'POST') {
8       return res.status(405).json({ error: 'Method not allowed' });
9     }
10  
11    try {
12      const {
13        firstName,
14        lastName,
15        email,
16        platform,
17        handle,
18        followers,
19        category,
20        date,
21        signature,
22        language
23      } = req.body;
24  
25      // Email templates for different languages
26      const emailTemplates = {
27        de: {
28          subject: `Neue LOI: ${firstName} ${lastName} - ${category}`,
29          body: `
30            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
31              <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 20px; text-align: center;">
32                <h1 style="color: white; margin: 0;">ALL INFLUENCER</h1>
33                <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Neue Letter of Intent</p>
34              </div>
35              <div style="padding: 30px; background: #1f2937; color: white;">
36                <h2 style="color: #f59e0b; margin-top: 0;">Gründungsmitglied LOI</h2>
37                <table style="width: 100%; border-collapse: collapse;">
38                  <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">Name:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151;">${firstName} ${lastName}</td></tr>
39                  <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">E-Mail:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151;"><a href="mailto:${email}" style="color: #f59e0b;">${email}</a></td></tr>
40                  <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">Plattform:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151;">${platform} (${handle})</td></tr>
41                  <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">Follower:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151;">${followers}</td></tr>
42                  <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">Kategorie:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #f59e0b; font-weight: bold;">${category}</td></tr>
43                  <tr><td style="padding: 10px 0; color: #9ca3af;">Datum:</td><td style="padding: 10px 0;">${date}</td></tr>
44                </table>
45                <h3 style="color: #f59e0b; margin-top: 20px;">Unterschrift:</h3>
46                <img src="${signature}" alt="Unterschrift" style="max-width: 400px; border: 1px solid #ddd; padding: 10px; background: white;" />
47                <p style="margin-top: 20px; padding: 15px; background: #374151; border-radius: 8px; color: #9ca3af;">
48                  <strong style="color: white;">Hinweis:</strong> Freigabe erfolgt ausschließlich durch den Administrator.
49                </p>
50              </div>
51            </div>
52          `
53        },
54        en: {
55          subject: `New LOI: ${firstName} ${lastName} - ${category}`,
56          body: `
57            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
58              <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 20px; text-align: center;">
59                <h1 style="color: white; margin: 0;">ALL INFLUENCER</h1>
60                <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">New Letter of Intent</p>
61              </div>
62              <div style="padding: 30px; background: #1f2937; color: white;">
63                <h2 style="color: #f59e0b; margin-top: 0;">Founding Member LOI</h2>
64                <table style="width: 100%; border-collapse: collapse;">
65                  <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">Name:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151;">${firstName} ${lastName}</td></tr>
66                  <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">Email:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151;"><a href="mailto:${email}" style="color: #f59e0b;">${email}</a></td></tr>
67                  <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">Platform:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151;">${platform} (${handle})</td></tr>
68                  <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">Followers:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151;">${followers}</td></tr>
69                  <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">Category:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #f59e0b; font-weight: bold;">${category}</td></tr>
70                  <tr><td style="padding: 10px 0; color: #9ca3af;">Date:</td><td style="padding: 10px 0;">${date}</td></tr>
71                </table>
72                <h3 style="color: #f59e0b; margin-top: 20px;">Signature:</h3>
73                <img src="${signature}" alt="Signature" style="max-width: 400px; border: 1px solid #ddd; padding: 10px; background: white;" />
74                <p style="margin-top: 20px; padding: 15px; background: #374151; border-radius: 8px; color: #9ca3af;">
75                  <strong style="color: white;">Note:</strong> Approval is exclusively granted by the administrator.
76                </p>
77              </div>
78            </div>
79          `
80        },
81        es: {
82          subject: `Nueva LOI: ${firstName} ${lastName} - ${category}`,
83          body: `
84            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
85              <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 20px; text-align: center;">
86                <h1 style="color: white; margin: 0;">ALL INFLUENCER</h1>
87                <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Nueva Carta de Intención</p>
88              </div>
89              <div style="padding: 30px; background: #1f2937; color: white;">
90                <h2 style="color: #f59e0b; margin-top: 0;">LOI Miembro Fundador</h2>
91                <table style="width: 100%; border-collapse: collapse;">
92                  <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">Nombre:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151;">${firstName} ${lastName}</td></tr>
93                  <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">Email:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151;"><a href="mailto:${email}" style="color: #f59e0b;">${email}</a></td></tr>
94                  <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">Plataforma:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151;">${platform} (${handle})</td></tr>
95                  <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">Seguidores:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151;">${followers}</td></tr>
96                  <tr><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #9ca3af;">Categoría:</td><td style="padding: 10px 0; border-bottom: 1px solid #374151; color: #f59e0b; font-weight: bold;">${category}</td></tr>
97                  <tr><td style="padding: 10px 0; color: #9ca3af;">Fecha:</td><td style="padding: 10px 0;">${date}</td></tr>
98                </table>
99                <h3 style="color: #f59e0b; margin-top: 20px;">Firma:</h3>
100               <img src="${signature}" alt="Firma" style="max-width: 400px; border: 1px solid #ddd; padding: 10px; background: white;" />
101               <p style="margin-top: 20px; padding: 15px; background: #374151; border-radius: 8px; color: #9ca3af;">
102                 <strong style="color: white;">Nota:</strong> La aprobación es otorgada exclusivamente por el administrador.
103               </p>
104             </div>
105           </div>
106         `
107       }
108     };
109 
110     const template = emailTemplates[language] || emailTemplates.de;
111 
112     // Send email via Resend
113     const data = await resend.emails.send({
114       from: 'All-Influencer LOI <noreply@all-influencer.com>',
115       to: process.env.ADMIN_EMAIL || 'contact@all-influencer.com',
116       subject: template.subject,
117       html: template.body,
118     });
119 
120     // Optional: Send confirmation email to the influencer
121     const confirmationTemplates = {
122       de: {
123         subject: 'Ihre Letter of Intent wurde empfangen',
124         body: `
125           <h2>Vielen Dank, ${firstName}!</h2>
126           <p>Wir haben Ihre Letter of Intent für die Gründungsmitgliedschaft bei All-Influencer.com erhalten.</p>
127           <p>Unser Team wird Ihre Bewerbung prüfen und sich innerhalb von 48 Stunden bei Ihnen melden.</p>
128           <br />
129           <p><strong>Ihre Daten:</strong></p>
130           <ul>
131             <li>Kategorie: ${category}</li>
132             <li>Plattform: ${platform} (${handle})</li>
133             <li>Follower: ${followers}</li>
134           </ul>
135           <br />
136           <p>Bei Fragen können Sie uns jederzeit kontaktieren.</p>
137           <p>Mit freundlichen Grüßen,<br />Das All-Influencer.com Team</p>
138         `
139       },
140       en: {
141         subject: 'Your Letter of Intent has been received',
142         body: `
143           <h2>Thank you, ${firstName}!</h2>
144           <p>We have received your Letter of Intent for founding membership at All-Influencer.com.</p>
145           <p>Our team will review your application and get back to you within 48 hours.</p>
146           <br />
147           <p><strong>Your information:</strong></p>
148           <ul>
149             <li>Category: ${category}</li>
150             <li>Platform: ${platform} (${handle})</li>
151             <li>Followers: ${followers}</li>
152           </ul>
153           <br />
154           <p>If you have any questions, feel free to contact us.</p>
155           <p>Best regards,<br />The All-Influencer.com Team</p>
156         `
157       },
158       es: {
159         subject: 'Su Carta de Intención ha sido recibida',
160         body: `
161           <h2>¡Gracias, ${firstName}!</h2>
162           <p>Hemos recibido su Carta de Intención para la membresía fundadora en All-Influencer.com.</p>
163           <p>Nuestro equipo revisará su solicitud y se comunicará con usted dentro de 48 horas.</p>
164           <br />
165           <p><strong>Su información:</strong></p>
166           <ul>
167             <li>Categoría: ${category}</li>
168             <li>Plataforma: ${platform} (${handle})</li>
169             <li>Seguidores: ${followers}</li>
170           </ul>
171           <br />
172           <p>Si tiene alguna pregunta, no dude en contactarnos.</p>
173           <p>Saludos cordiales,<br />El equipo de All-Influencer.com</p>
174         `
175       }
176     };
177 
178     const confirmTemplate = confirmationTemplates[language] || confirmationTemplates.de;
179 
180     await resend.emails.send({
181       from: 'All-Influencer Team <noreply@all-influencer.com>',
182       to: email,
183       subject: confirmTemplate.subject,
184       html: confirmTemplate.body,
185     });
186 
187     return res.status(200).json({ 
188       success: true, 
189       message: 'LOI submitted successfully',
190       id: data.id 
191     });
192 
193   } catch (error) {
194     console.error('Error processing LOI:', error);
195     return res.status(500).json({ 
196       error: 'Failed to process LOI',
197       details: error.message 
198     });
199   }
200 }
201 
202 export const config = {
203   api: {
204     bodyParser: {
205       sizeLimit: '10mb',
206     },
207   },
208 };
