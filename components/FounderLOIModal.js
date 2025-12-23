import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Download, Check } from 'lucide-react';

const translations = {
  de: {
    title: "Letter of Intent",
    subtitle: "Gründungsmitgliedschaft",
    intro: "Mit dieser Absichtserklärung bekunde ich mein ernsthaftes Interesse, als eines der ersten 100 Gründungsmitglieder Teil von All-Influencer.com zu werden.",
    firstName: "Vorname",
    lastName: "Nachname",
    email: "E-Mail-Adresse",
    platform: "Primäre Plattform",
    platformPlaceholder: "Bitte wählen...",
    handle: "Handle / Nutzername",
    followers: "Follower-Anzahl",
    followersPlaceholder: "z.B. 1.500.000",
    category: "Angestrebte Kategorie",
    categoryPlaceholder: "Bitte wählen...",
    date: "Datum",
    signature: "Unterschrift",
    signatureDraw: "Hier unterschreiben",
    signatureUpload: "oder Bild hochladen",
    clear: "Löschen",
    consent: "Hiermit bestätige ich mein Interesse an einer Gründungsmitgliedschaft bei All-Influencer.com. Diese Absichtserklärung ist unverbindlich und dokumentiert mein ernsthaftes Interesse.",
    submit: "Absenden & PDF herunterladen",
    submitting: "Wird verarbeitet...",
    success: "Erfolgreich versendet!",
    openModal: "LOI Modal öffnen",
    infoBox: "Gründervorteil: Als eines der ersten 100 Mitglieder erhalten Sie 24 Monate kostenfreien Zugang sowie die exklusive Möglichkeit, Unternehmensanteile zum Gründungspreis von 50€ pro Anteil zu erwerben.",
    brandName: "All-Influencer.com - Die 333",
    categories: {
      diamond: "Diamond (20M+ Followers) - 10.000€/Monat regulär",
      platin: "Platin (10-20M Followers) - 5.000€/Monat regulär",
      gold: "Gold (5-10M Followers) - 1.000€/Monat regulär",
      rising: "Rising Star (1-5M Followers) - 250€/Monat regulär"
    },
    platforms: {
      instagram: "Instagram",
      youtube: "YouTube",
      tiktok: "TikTok",
      x: "X (Twitter)",
      linkedin: "LinkedIn",
      facebook: "Facebook",
      twitch: "Twitch",
      other: "Sonstige"
    }
  },
  en: {
    title: "Letter of Intent",
    subtitle: "Founding Membership",
    intro: "With this letter of intent, I express my serious interest in becoming one of the first 100 founding members of All-Influencer.com.",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    platform: "Primary Platform",
    platformPlaceholder: "Please select...",
    handle: "Handle / Username",
    followers: "Follower Count",
    followersPlaceholder: "e.g. 1,500,000",
    category: "Desired Category",
    categoryPlaceholder: "Please select...",
    date: "Date",
    signature: "Signature",
    signatureDraw: "Sign here",
    signatureUpload: "or upload image",
    clear: "Clear",
    consent: "I hereby confirm my interest in a founding membership at All-Influencer.com. This letter of intent is non-binding and documents my serious interest.",
    submit: "Submit & Download PDF",
    submitting: "Processing...",
    success: "Successfully sent!",
    openModal: "Open LOI Modal",
    infoBox: "Founder Advantage: As one of the first 100 members, you receive 24 months of free access and the exclusive opportunity to acquire company shares at the founding price of €50 per share.",
    brandName: "All-Influencer.com - The 333",
    categories: {
      diamond: "Diamond (20M+ Followers) - €10,000/month regular",
      platin: "Platin (10-20M Followers) - €5,000/month regular",
      gold: "Gold (5-10M Followers) - €1,000/month regular",
      rising: "Rising Star (1-5M Followers) - €250/month regular"
    },
    platforms: {
      instagram: "Instagram",
      youtube: "YouTube",
      tiktok: "TikTok",
      x: "X (Twitter)",
      linkedin: "LinkedIn",
      facebook: "Facebook",
      twitch: "Twitch",
      other: "Other"
    }
  },
  es: {
    title: "Carta de Intención",
subtitle: "Membresía Fundadora",
    intro: "Con esta carta de intención, expreso mi serio interés en convertirme en uno de los primeros 100 miembros fundadores de All-Influencer.com.",
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Correo Electrónico",
    platform: "Plataforma Principal",
    platformPlaceholder: "Por favor seleccione...",
    handle: "Usuario / Handle",
    followers: "Número de Seguidores",
    followersPlaceholder: "ej. 1.500.000",
    category: "Categoría Deseada",
    categoryPlaceholder: "Por favor seleccione...",
    date: "Fecha",
    signature: "Firma",
    signatureDraw: "Firmar aquí",
    signatureUpload: "o subir imagen",
    clear: "Borrar",
    consent: "Por la presente confirmo mi interés en una membresía fundadora en All-Influencer.com. Esta carta de intención no es vinculante y documenta mi interés serio.",
    submit: "Enviar y Descargar PDF",
    submitting: "Procesando...",
    success: "¡Enviado con éxito!",
    openModal: "Abrir Modal LOI",
    infoBox: "Ventaja Fundadora: Como uno de los primeros 100 miembros, recibes 24 meses de acceso gratuito y la oportunidad exclusiva de adquirir acciones de la empresa al precio fundador de 50€ por acción.",
    brandName: "All-Influencer.com - Los 333",
    categories: {
      diamond: "Diamond (20M+ Seguidores) - 10.000€/mes regular",
      platin: "Platin (10-20M Seguidores) - 5.000€/mes regular",
      gold: "Gold (5-10M Seguidores) - 1.000€/mes regular",
      rising: "Rising Star (1-5M Seguidores) - 250€/mes regular"
    },
    platforms: {
      instagram: "Instagram",
      youtube: "YouTube",
      tiktok: "TikTok",
      x: "X (Twitter)",
      linkedin: "LinkedIn",
      facebook: "Facebook",
      twitch: "Twitch",
      other: "Otros"
    }
  }
};

export default function FounderLOIModal({ isOpen, onClose, initialLanguage = 'de' }) {
  const [language, setLanguage] = useState(initialLanguage);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    platform: '',
    handle: '',
    followers: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    consent: false
  });

  const t = translations[language];

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
    }
  }, [isOpen]);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          setHasSignature(true);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.platform &&
      formData.handle &&
      formData.followers &&
      formData.category &&
      formData.date &&
      formData.consent &&
      hasSignature
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);
    
    try {
      const signatureData = canvasRef.current?.toDataURL('image/png');
      
      const response = await fetch('/api/submit-loi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          signature: signatureData,
          language
        })
      });

      if (response.ok) {
        setShowSuccess(true);
        
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
          setFormData({
            firstName: '',
            lastName: '',
email: '',
            platform: '',
            handle: '',
            followers: '',
            category: '',
            date: new Date().toISOString().split('T')[0],
            consent: false
          });
          clearSignature();
          setIsSubmitting(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting LOI:', error);
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl shadow-2xl border border-yellow-600/30">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-yellow-400 hover:text-yellow-300 transition-colors bg-black/50 rounded-full"
        >
          <X size={24} />
        </button>

        {/* Language Selector */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          {['de', 'en', 'es'].map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-3 py-1 rounded text-sm transition-all ${
                language === lang
                  ? 'bg-yellow-600 text-black'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {lang === 'de' ? '🇩🇪' : lang === 'en' ? '🇬🇧' : '🇪🇸'}
            </button>
          ))}
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 p-8 text-center mt-12">
          <h1 className="text-3xl font-bold text-black mb-2">{t.title}</h1>
          <p className="text-black/80">{t.subtitle} | All-Influencer.com</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <div className="mb-8">
            <p className="text-yellow-400 font-semibold mb-2">{t.brandName}</p>
            <p className="text-gray-300 leading-relaxed">{t.intro}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-yellow-400 font-medium mb-2">
                  {t.firstName} *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-yellow-600/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-yellow-400 font-medium mb-2">
                  {t.lastName} *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-yellow-600/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                  required
                />
              </div>
            </div>
{/* Email */}
            <div>
              <label className="block text-yellow-400 font-medium mb-2">
                {t.email} *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-yellow-600/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                required
              />
            </div>

            {/* Platform */}
            <div>
              <label className="block text-yellow-400 font-medium mb-2">
                {t.platform} *
              </label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-yellow-600/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                required
              >
                <option value="">{t.platformPlaceholder}</option>
                {Object.entries(t.platforms).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>

            {/* Handle and Followers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-yellow-400 font-medium mb-2">
                  {t.handle} *
                </label>
                <input
                  type="text"
                  name="handle"
                  value={formData.handle}
                  onChange={handleChange}
                  placeholder="@username"
                  className="w-full px-4 py-3 bg-gray-800 border border-yellow-600/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-yellow-400 font-medium mb-2">
                  {t.followers} *
                </label>
                <input
                  type="text"
                  name="followers"
                  value={formData.followers}
                  onChange={handleChange}
                  placeholder={t.followersPlaceholder}
                  className="w-full px-4 py-3 bg-gray-800 border border-yellow-600/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-yellow-400 font-medium mb-2">
                {t.category} *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-yellow-600/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                required
              >
                <option value="">{t.categoryPlaceholder}</option>
                {Object.entries(t.categories).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>

            {/* Info Box */}
            <div className="bg-yellow-600/10 border border-yellow-600/30 rounded-lg p-4">
              <p className="text-yellow-400 text-sm leading-relaxed">{t.infoBox}</p>
            </div>
{/* Date */}
            <div>
              <label className="block text-yellow-400 font-medium mb-2">
                {t.date} *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-yellow-600/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                required
              />
            </div>

            {/* Signature */}
            <div>
              <label className="block text-yellow-400 font-medium mb-2">
                {t.signature} *
              </label>
              <div className="border-2 border-dashed border-yellow-600/50 rounded-lg p-4 bg-gray-800/50">
                <canvas
                  ref={canvasRef}
                  width={700}
                  height={200}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-48 bg-white rounded cursor-crosshair"
                />
                <div className="flex gap-3 mt-3">
                  <button
                    type="button"
                    onClick={clearSignature}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                  >
                    <X size={16} />
                    {t.clear}
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-yellow-600 text-black rounded-lg hover:bg-yellow-500 transition-colors flex items-center gap-2"
                  >
                    <Upload size={16} />
                    {t.signatureUpload}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Consent */}
            <div className="bg-gray-800/50 border border-yellow-600/30 rounded-lg p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 accent-yellow-500"
                  required
                />
                <span className="text-gray-300 text-sm leading-relaxed">
                  {t.consent}
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                isFormValid() && !isSubmitting
                  ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-black hover:scale-[1.02] shadow-lg shadow-yellow-600/30'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
{showSuccess ? (
                <>
                  <Check size={24} />
                  {t.success}
                </>
              ) : isSubmitting ? (
                <>
                  <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  {t.submitting}
                </>
              ) : (
                <>
                  <Download size={24} />
                  {t.submit}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
