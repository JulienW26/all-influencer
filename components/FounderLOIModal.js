1   // components/FounderLOIModal.js
2   import { useState, useRef, useEffect } from 'react';
3   import { X, Upload, Download, Check } from 'lucide-react';
4   
5   const translations = {
6     de: {
7       title: "Letter of Intent",
8       subtitle: "Gründungsmitgliedschaft",
9       intro: "Mit dieser Absichtserklärung bekunde ich mein ernsthaftes Interesse, als eines der ersten 100 Gründungsmitglieder Teil von All-Influencer.com zu werden.",
10      firstName: "Vorname",
11      lastName: "Nachname",
12      email: "E-Mail-Adresse",
13      platform: "Primäre Plattform",
14      platformPlaceholder: "Bitte wählen...",
15      handle: "Handle / Nutzername",
16      followers: "Follower-Anzahl",
17      followersPlaceholder: "z.B. 1.500.000",
18      category: "Angestrebte Kategorie",
19      categoryPlaceholder: "Bitte wählen...",
20      date: "Datum",
21      signature: "Unterschrift",
22      signatureDraw: "Hier unterschreiben",
23      signatureUpload: "oder Bild hochladen",
24      clear: "Löschen",
25      consent: "Hiermit bestätige ich mein Interesse an einer Gründungsmitgliedschaft bei All-Influencer.com. Diese Absichtserklärung ist unverbindlich und dokumentiert mein ernsthaftes Interesse.",
26      submit: "Absenden & PDF herunterladen",
27      submitting: "Wird verarbeitet...",
28      success: "Erfolgreich versendet!",
29      required: "Pflichtfeld",
30      infoBox: "Gründervorteil: Als eines der ersten 100 Mitglieder erhalten Sie 24 Monate kostenfreien Zugang sowie die exklusive Möglichkeit, Unternehmensanteile zum Gründungspreis von 50€ pro Anteil zu erwerben.",
31      categories: {
32        diamond: "Diamond (20M+ Followers) - 10.000€/Monat regulär",
33        platin: "Platin (10-20M Followers) - 5.000€/Monat regulär",
34        gold: "Gold (5-10M Followers) - 1.000€/Monat regulär",
35        rising: "Rising Star (1-5M Followers) - 250€/Monat regulär"
36      },
37      platforms: {
38        instagram: "Instagram",
39        youtube: "YouTube",
40        tiktok: "TikTok",
41        x: "X (Twitter)",
42        linkedin: "LinkedIn",
43        facebook: "Facebook",
44        twitch: "Twitch",
45        other: "Sonstige"
46      }
47    },
48    en: {
49      title: "Letter of Intent",
50      subtitle: "Founding Membership",
51      intro: "With this letter of intent, I express my serious interest in becoming one of the first 100 founding members of All-Influencer.com.",
52      firstName: "First Name",
53      lastName: "Last Name",
54      email: "Email Address",
55      platform: "Primary Platform",
56      platformPlaceholder: "Please select...",
57      handle: "Handle / Username",
58      followers: "Follower Count",
59      followersPlaceholder: "e.g. 1,500,000",
60      category: "Desired Category",
61      categoryPlaceholder: "Please select...",
62      date: "Date",
63      signature: "Signature",
64      signatureDraw: "Sign here",
65      signatureUpload: "or upload image",
66      clear: "Clear",
67      consent: "I hereby confirm my interest in a founding membership at All-Influencer.com. This letter of intent is non-binding and documents my serious interest.",
68      submit: "Submit & Download PDF",
69      submitting: "Processing...",
70      success: "Successfully sent!",
71      required: "Required",
72      infoBox: "Founder Advantage: As one of the first 100 members, you receive 24 months of free access and the exclusive opportunity to acquire company shares at the founding price of €50 per share.",
73      categories: {
74        diamond: "Diamond (20M+ Followers) - €10,000/month regular",
75        platin: "Platin (10-20M Followers) - €5,000/month regular",
76        gold: "Gold (5-10M Followers) - €1,000/month regular",
77        rising: "Rising Star (1-5M Followers) - €250/month regular"
78      },
79      platforms: {
80        instagram: "Instagram",
  81        youtube: "YouTube",
82        tiktok: "TikTok",
83        x: "X (Twitter)",
84        linkedin: "LinkedIn",
85        facebook: "Facebook",
86        twitch: "Twitch",
87        other: "Other"
88      }
89    },
90    es: {
91      title: "Carta de Intención",
92      subtitle: "Membresía Fundadora",
93      intro: "Con esta carta de intención, expreso mi serio interés en convertirme en uno de los primeros 100 miembros fundadores de All-Influencer.com.",
94      firstName: "Nombre",
95      lastName: "Apellido",
96      email: "Correo Electrónico",
97      platform: "Plataforma Principal",
98      platformPlaceholder: "Por favor seleccione...",
99      handle: "Usuario / Handle",
100     followers: "Número de Seguidores",
101     followersPlaceholder: "ej. 1.500.000",
102     category: "Categoría Deseada",
103     categoryPlaceholder: "Por favor seleccione...",
104     date: "Fecha",
105     signature: "Firma",
106     signatureDraw: "Firmar aquí",
107     signatureUpload: "o subir imagen",
108     clear: "Borrar",
109     consent: "Por la presente confirmo mi interés en una membresía fundadora en All-Influencer.com. Esta carta de intención no es vinculante y documenta mi interés serio.",
110     submit: "Enviar y Descargar PDF",
111     submitting: "Procesando...",
112     success: "¡Enviado con éxito!",
113     required: "Requerido",
114     infoBox: "Ventaja Fundadora: Como uno de los primeros 100 miembros, recibes 24 meses de acceso gratuito y la oportunidad exclusiva de adquirir acciones de la empresa al precio fundador de 50€ por acción.",
115     categories: {
116       diamond: "Diamond (20M+ Seguidores) - 10.000€/mes regular",
117       platin: "Platin (10-20M Seguidores) - 5.000€/mes regular",
118       gold: "Gold (5-10M Seguidores) - 1.000€/mes regular",
119       rising: "Rising Star (1-5M Seguidores) - 250€/mes regular"
120     },
121     platforms: {
122       instagram: "Instagram",
123       youtube: "YouTube",
124       tiktok: "TikTok",
125       x: "X (Twitter)",
126       linkedin: "LinkedIn",
127       facebook: "Facebook",
128       twitch: "Twitch",
129       other: "Otros"
130     }
131   }
132 };
133
134 export default function FounderLOIModal({ isOpen, onClose, language = 'de' }) {
135   const t = translations[language];
136   const canvasRef = useRef(null);
137   const fileInputRef = useRef(null);
138   const [isDrawing, setIsDrawing] = useState(false);
139   const [hasSignature, setHasSignature] = useState(false);
140   const [isSubmitting, setIsSubmitting] = useState(false);
141   const [showSuccess, setShowSuccess] = useState(false);
142   
143   const [formData, setFormData] = useState({
144     firstName: '',
145     lastName: '',
146     email: '',
147     platform: '',
148     handle: '',
149     followers: '',
150     category: '',
151     date: new Date().toISOString().split('T')[0],
152     consent: false
153   });
154
155   useEffect(() => {
156     if (isOpen && canvasRef.current) {
157       const canvas = canvasRef.current;
158       const ctx = canvas.getContext('2d');
159       ctx.strokeStyle = '#D4AF37';
160       ctx.lineWidth = 2;
  161       ctx.lineCap = 'round';
162     }
163   }, [isOpen]);
164
165   const startDrawing = (e) => {
166     setIsDrawing(true);
167     const canvas = canvasRef.current;
168     const ctx = canvas.getContext('2d');
169     const rect = canvas.getBoundingClientRect();
170     const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
171     const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
172     ctx.beginPath();
173     ctx.moveTo(x, y);
174   };
175
176   const draw = (e) => {
177     if (!isDrawing) return;
178     e.preventDefault();
179     const canvas = canvasRef.current;
180     const ctx = canvas.getContext('2d');
181     const rect = canvas.getBoundingClientRect();
182     const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
183     const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
184     ctx.lineTo(x, y);
185     ctx.stroke();
186     setHasSignature(true);
187   };
188
189   const stopDrawing = () => {
190     setIsDrawing(false);
191   };
192
193   const clearSignature = () => {
194     const canvas = canvasRef.current;
195     const ctx = canvas.getContext('2d');
196     ctx.clearRect(0, 0, canvas.width, canvas.height);
197     setHasSignature(false);
198   };
199
200   const handleFileUpload = (e) => {
201     const file = e.target.files?.[0];
202     if (file && file.type.startsWith('image/')) {
203       const reader = new FileReader();
204       reader.onload = (event) => {
205         const img = new Image();
206         img.onload = () => {
207           const canvas = canvasRef.current;
208           const ctx = canvas.getContext('2d');
209           ctx.clearRect(0, 0, canvas.width, canvas.height);
210           ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
211           setHasSignature(true);
212         };
213         img.src = event.target.result;
214       };
215       reader.readAsDataURL(file);
216     }
217   };
218
219   const handleChange = (e) => {
220     const { name, value, type, checked } = e.target;
221     setFormData(prev => ({
222       ...prev,
223       [name]: type === 'checkbox' ? checked : value
224     }));
225   };
226
227   const isFormValid = () => {
228     return (
229       formData.firstName &&
230       formData.lastName &&
231       formData.email &&
232       formData.platform &&
233       formData.handle &&
234       formData.followers &&
235       formData.category &&
236       formData.date &&
237       formData.consent &&
238       hasSignature
239     );
240   };
  241
242   const handleSubmit = async () => {
243     if (!isFormValid()) return;
244
245     setIsSubmitting(true);
246
247     try {
248       const signatureData = canvasRef.current.toDataURL('image/png');
249       
250       const response = await fetch('/api/submit-loi', {
251         method: 'POST',
252         headers: { 'Content-Type': 'application/json' },
253         body: JSON.stringify({
254           ...formData,
255           signature: signatureData,
256           language
257         })
258       });
259
260       if (response.ok) {
261         setShowSuccess(true);
262         
263         setTimeout(() => {
264           setShowSuccess(false);
265           onClose();
266           setFormData({
267             firstName: '',
268             lastName: '',
269             email: '',
270             platform: '',
271             handle: '',
272             followers: '',
273             category: '',
274             date: new Date().toISOString().split('T')[0],
275             consent: false
276           });
277           clearSignature();
278         }, 2000);
279       }
280     } catch (error) {
281       console.error('Error submitting LOI:', error);
282     } finally {
283       setIsSubmitting(false);
284     }
285   };
286
287   if (!isOpen) return null;
288
289   return (
290     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm">
291       <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl shadow-2xl border border-yellow-600/30">
292         <button
293           onClick={onClose}
294           className="absolute top-4 right-4 z-10 p-2 text-yellow-400 hover:text-yellow-300 transition-colors"
295         >
296           <X size={24} />
297         </button>
298
299         <div className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 p-8 text-center">
300           <h1 className="text-3xl font-bold text-black mb-2">{t.title}</h1>
301           <p className="text-black/80">{t.subtitle} | All-Influencer.com</p>
302         </div>
303
304         <div className="p-8">
305           <div className="mb-8">
306             <p className="text-yellow-400 font-semibold mb-2">All-Influencer.com - Die 333</p>
307             <p className="text-gray-300 leading-relaxed">{t.intro}</p>
308           </div>
309
310           <div className="space-y-6">
311             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
312               <div>
313                 <label className="block text-yellow-400 font-medium mb-2">
314                   {t.firstName} *
315                 </label>
316                 <input
317                   type="text"
318                   name="firstName"
319                   value={formData.firstName}
320                   onChange={handleChange}
  321                   className="w-full px-4 py-3 bg-gray-800 border border-yellow-600/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
322                   required
323                 />
324               </div>
325               <div>
326                 <label className="block text-yellow-400 font-medium mb-2">
327                   {t.lastName} *
328                 </label>
329                 <input
330                   type="text"
331                   name="lastName"
332                   value={formData.lastName}
333                   onChange={handleChange}
334                   className="w-full px-4 py-3 bg-gray-800 border border-yellow-600/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
335                   required
336                 />
337               </div>
338             </div>
339
340             <div>
341               <label className="block text-yellow-400 font-medium mb-2">
342                 {t.email} *
343               </label>
344               <input
345                 type="email"
346                 name="email"
347                 value={formData.email}
348                 onChange={handleChange}
349                 className="w-full px-4 py-3 bg-gray-800 border border-yellow-600/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
350                 required
351               />
352             </div>
353
354             <div>
355               <label className="block text-yellow-400 font-medium mb-2">
356                 {t.platform} *
357               </label>
358               <select
359                 name="platform"
360                 value={formData.platform}
361                 onChange={handleChange}
362                 className="w-full px-4 py-3 bg-gray-800 border border-yellow-600/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
363                 required
364               >
365                 <option value="">{t.platformPlaceholder}</option>
366                 {Object.entries(t.platforms).map(([key, value]) => (
367                   <option key={key} value={key}>{value}</option>
368                 ))}
369               </select>
370             </div>
371
372             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
373               <div>
374                 <label className="block text-yellow-400 font-medium mb-2">
375                   {t.handle} *
376                 </label>
377                 <input
378                   type="text"
379                   name="handle"
380                   value={formData.handle}
381                   onChange={handleChange}
382                   placeholder="@username"
383                   className="w-full px-4 py-3 bg-gray-800 border border-yellow-600/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
384                   required
385                 />
386               </div>
387               <div>
388                 <label className="block text-yellow-400 font-medium mb-2">
389                   {t.followers} *
390                 </label>
391                 <input
392                   type="text"
393                   name="followers"
394                   value={formData.followers}
395                   onChange={handleChange}
396                   placeholder={t.followersPlaceholder}
397                   className="w-full px-4 py-3 bg-gray-800 border border-yellow-600/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
398                   required
399                 />
400               </div>
401             </div>
402
403             <div>
404               <label className="block text-yellow-400 font-medium mb-2">
405                 {t.category} *
406               </label>
407               <select
408                 name="category"
409                 value={formData.category}
410                 onChange={handleChange}
411                 className="w-full px-4 py-3 bg-gray-800 border border-yellow-600/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
412                 required
413               >
414                 <option value="">{t.categoryPlaceholder}</option>
415                 {Object.entries(t.categories).map(([key, value]) => (
416                   <option key={key} value={key}>{value}</option>
417                 ))}
418               </select>
419             </div>
420
421             <div className="bg-yellow-600/10 border border-yellow-600/30 rounded-lg p-4">
422               <p className="text-yellow-400 text-sm leading-relaxed">{t.infoBox}</p>
423             </div>
424
425             <div>
426               <label className="block text-yellow-400 font-medium mb-2">
427                 {t.date} *
428               </label>
429               <input
430                 type="date"
431                 name="date"
432                 value={formData.date}
433                 onChange={handleChange}
434                 className="w-full px-4 py-3 bg-gray-800 border border-yellow-600/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
435                 required
436               />
437             </div>
438
439             <div>
440               <label className="block text-yellow-400 font-medium mb-2">
441                 {t.signature} *
442               </label>
443               <div className="border-2 border-dashed border-yellow-600/50 rounded-lg p-4 bg-gray-800/50">
444                 <canvas
445                   ref={canvasRef}
446                   width={700}
447                   height={200}
448                   onMouseDown={startDrawing}
449                   onMouseMove={draw}
450                   onMouseUp={stopDrawing}
451                   onMouseLeave={stopDrawing}
452                   onTouchStart={startDrawing}
453                   onTouchMove={draw}
454                   onTouchEnd={stopDrawing}
455                   className="w-full h-48 bg-white rounded cursor-crosshair"
456                 />
457                 <div className="flex gap-3 mt-3">
458                   <button
459                     type="button"
460                     onClick={clearSignature}
461                     className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
462                   >
463                     <X size={16} />
464                     {t.clear}
465                   </button>
466                   <button
467                     type="button"
468                     onClick={() => fileInputRef.current?.click()}
469                     className="px-4 py-2 bg-yellow-600 text-black rounded-lg hover:bg-yellow-500 transition-colors flex items-center gap-2"
470                   >
471                     <Upload size={16} />
472                     {t.signatureUpload}
473                   </button>
474                   <input
475                     ref={fileInputRef}
476                     type="file"
477                     accept="image/*"
478                     onChange={handleFileUpload}
479                     className="hidden"
480                   />
481                 </div>
482               </div>
483             </div>
484
485             <div className="bg-gray-800/50 border border-yellow-600/30 rounded-lg p-4">
486               <label className="flex items-start gap-3 cursor-pointer">
487                 <input
488                   type="checkbox"
489                   name="consent"
490                   checked={formData.consent}
491                   onChange={handleChange}
492                   className="mt-1 w-5 h-5 accent-yellow-600"
493                   required
494                 />
495                 <span className="text-gray-300 text-sm leading-relaxed">
496                   {t.consent}
497                 </span>
498               </label>
499             </div>
500
501             <button
502               type="button"
503               onClick={handleSubmit}
504               disabled={!isFormValid() || isSubmitting}
505               className="w-full py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
506             >
507               {showSuccess ? (
508                 <>
509                   <Check size={20} />
510                   {t.success}
511                 </>
512               ) : isSubmitting ? (
513                 t.submitting
514               ) : (
515                 <>
516                   <Download size={20} />
517                   {t.submit}
518                 </>
519               )}
520             </button>
521           </div>
522         </div>
523       </div>
524     </div>
525   );
526 }
