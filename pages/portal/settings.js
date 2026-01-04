import { useState, useEffect } from 'react';
import Head from 'next/head';
import PortalLayout from '../../components/portal/PortalLayout';
import { usePortalLanguage } from '../../lib/usePortalLanguage';
import { NICHE_CATEGORIES, NICHE_MAX, hasOtherNiche } from '../../lib/niche-categories';

// Übersetzungen
const translations = {
  de: {
    pageTitle: 'Einstellungen | ALL INFLUENCER',
    title: 'Einstellungen',
    subtitle: 'Verwalte deine Account-Einstellungen',
    // Account Info
    accountInfoTitle: 'Account-Informationen',
    emailLabel: 'E-Mail',
    accountTypeLabel: 'Account-Typ',
    statusLabel: 'Status',
    influencer: 'Influencer',
    brand: 'Brand',
    statusActive: 'Aktiv',
    statusPending: 'Ausstehend',
    // Password
    changePasswordTitle: 'Passwort ändern',
    currentPasswordLabel: 'Aktuelles Passwort',
    newPasswordLabel: 'Neues Passwort',
    confirmPasswordLabel: 'Passwort bestätigen',
    passwordHint: 'Mindestens 8 Zeichen',
    changePasswordButton: 'Passwort ändern',
    changingPassword: 'Wird geändert...',
    // Notifications
    notificationsTitle: 'Benachrichtigungen',
    emailNotifications: 'E-Mail-Benachrichtigungen',
    emailNotificationsDesc: 'Erhalte Updates per E-Mail',
    newMessages: 'Neue Nachrichten',
    newMessagesDesc: 'Benachrichtigung bei neuen Nachrichten',
    newOrders: 'Neue Aufträge',
    newOrdersDesc: 'Benachrichtigung bei neuen Aufträgen',
    // Danger Zone
    dangerZoneTitle: 'Gefahrenzone',
    deleteAccount: 'Account löschen',
    deleteAccountDesc: 'Lösche deinen Account permanent',
    deleteAccountButton: 'Account löschen',
    // Messages
    errorPasswordMatch: 'Die Passwörter stimmen nicht überein.',
    errorPasswordLength: 'Das Passwort muss mindestens 8 Zeichen lang sein.',
    successPasswordChanged: 'Passwort erfolgreich geändert!',
    // NEU: Nischen
    nichesTitle: 'Deine Nischen',
    nichesSubtitle: 'Wähle 1-3 Kategorien, die zu deinem Content passen',
    nicheCustomLabel: 'Eigene Nische',
    nicheCustomPlaceholder: 'z.B. Automobile, Musik, Kunst...',
    nicheSaved: 'Nischen erfolgreich gespeichert!',
    nicheSaveError: 'Fehler beim Speichern der Nischen',
    saveNiches: 'Nischen speichern',
    savingNiches: 'Wird gespeichert...',
    nicheMinError: 'Mindestens 1 Nische erforderlich',
    nicheCustomRequired: 'Bitte eigene Nische angeben',
    selected: 'ausgewählt'
  },
  en: {
    pageTitle: 'Settings | ALL INFLUENCER',
    title: 'Settings',
    subtitle: 'Manage your account settings',
    accountInfoTitle: 'Account Information',
    emailLabel: 'Email',
    accountTypeLabel: 'Account Type',
    statusLabel: 'Status',
    influencer: 'Influencer',
    brand: 'Brand',
    statusActive: 'Active',
    statusPending: 'Pending',
    changePasswordTitle: 'Change Password',
    currentPasswordLabel: 'Current Password',
    newPasswordLabel: 'New Password',
    confirmPasswordLabel: 'Confirm Password',
    passwordHint: 'At least 8 characters',
    changePasswordButton: 'Change Password',
    changingPassword: 'Changing...',
    notificationsTitle: 'Notifications',
    emailNotifications: 'Email Notifications',
    emailNotificationsDesc: 'Receive updates via email',
    newMessages: 'New Messages',
    newMessagesDesc: 'Notification for new messages',
    newOrders: 'New Orders',
    newOrdersDesc: 'Notification for new orders',
    dangerZoneTitle: 'Danger Zone',
    deleteAccount: 'Delete Account',
    deleteAccountDesc: 'Permanently delete your account',
    deleteAccountButton: 'Delete Account',
    errorPasswordMatch: 'Passwords do not match.',
    errorPasswordLength: 'Password must be at least 8 characters long.',
    successPasswordChanged: 'Password changed successfully!',
    // NEU: Nischen
    nichesTitle: 'Your Niches',
    nichesSubtitle: 'Select 1-3 categories that match your content',
    nicheCustomLabel: 'Custom Niche',
    nicheCustomPlaceholder: 'e.g. Automotive, Music, Art...',
    nicheSaved: 'Niches saved successfully!',
    nicheSaveError: 'Error saving niches',
    saveNiches: 'Save Niches',
    savingNiches: 'Saving...',
    nicheMinError: 'At least 1 niche required',
    nicheCustomRequired: 'Please enter your custom niche',
    selected: 'selected'
  },
  es: {
    pageTitle: 'Configuración | ALL INFLUENCER',
    title: 'Configuración',
    subtitle: 'Administra la configuración de tu cuenta',
    accountInfoTitle: 'Información de la cuenta',
    emailLabel: 'Correo electrónico',
    accountTypeLabel: 'Tipo de cuenta',
    statusLabel: 'Estado',
    influencer: 'Influencer',
    brand: 'Brand',
    statusActive: 'Activo',
    statusPending: 'Pendiente',
    changePasswordTitle: 'Cambiar contraseña',
    currentPasswordLabel: 'Contraseña actual',
    newPasswordLabel: 'Nueva contraseña',
    confirmPasswordLabel: 'Confirmar contraseña',
    passwordHint: 'Al menos 8 caracteres',
    changePasswordButton: 'Cambiar contraseña',
    changingPassword: 'Cambiando...',
    notificationsTitle: 'Notificaciones',
    emailNotifications: 'Notificaciones por email',
    emailNotificationsDesc: 'Recibe actualizaciones por correo',
    newMessages: 'Nuevos mensajes',
    newMessagesDesc: 'Notificación de nuevos mensajes',
    newOrders: 'Nuevos pedidos',
    newOrdersDesc: 'Notificación de nuevos pedidos',
    dangerZoneTitle: 'Zona de peligro',
    deleteAccount: 'Eliminar cuenta',
    deleteAccountDesc: 'Elimina tu cuenta permanentemente',
    deleteAccountButton: 'Eliminar cuenta',
    errorPasswordMatch: 'Las contraseñas no coinciden.',
    errorPasswordLength: 'La contraseña debe tener al menos 8 caracteres.',
    successPasswordChanged: '¡Contraseña cambiada exitosamente!',
    // NEU: Nischen
    nichesTitle: 'Tus Nichos',
    nichesSubtitle: 'Selecciona 1-3 categorías que coincidan con tu contenido',
    nicheCustomLabel: 'Nicho Personalizado',
    nicheCustomPlaceholder: 'ej. Automotriz, Música, Arte...',
    nicheSaved: '¡Nichos guardados exitosamente!',
    nicheSaveError: 'Error al guardar los nichos',
    saveNiches: 'Guardar Nichos',
    savingNiches: 'Guardando...',
    nicheMinError: 'Se requiere al menos 1 nicho',
    nicheCustomRequired: 'Por favor ingresa tu nicho personalizado',
    selected: 'seleccionados'
  }
};

export default function Settings() {
  const { lang, setLang } = usePortalLanguage();
  const t = translations[lang];

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  // Passwort-Sichtbarkeit States - NEU
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // NEU: Nischen-State
  const [nicheCategories, setNicheCategories] = useState([]);
  const [nicheCustom, setNicheCustom] = useState('');
  const [savingNiches, setSavingNiches] = useState(false);
  const [nicheMessage, setNicheMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/portal/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        // NEU: Nischen aus User-Daten laden
        if (data.user?.nicheCategories) {
          setNicheCategories(data.user.nicheCategories);
        }
        if (data.user?.nicheCustom) {
          setNicheCustom(data.user.nicheCustom);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // NEU: Nische togglen
  const toggleNiche = (nicheId) => {
    setNicheCategories(prev => {
      if (prev.includes(nicheId)) {
        return prev.filter(n => n !== nicheId);
      } else if (prev.length < NICHE_MAX) {
        return [...prev, nicheId];
      }
      return prev;
    });
  };

  // NEU: Nischen speichern
  const handleSaveNiches = async () => {
    setNicheMessage({ type: '', text: '' });

    // Validierung
    if (nicheCategories.length === 0) {
      setNicheMessage({ type: 'error', text: t.nicheMinError });
      return;
    }
    if (hasOtherNiche(nicheCategories) && !nicheCustom.trim()) {
      setNicheMessage({ type: 'error', text: t.nicheCustomRequired });
      return;
    }

    setSavingNiches(true);
    try {
      const res = await fetch('/api/portal/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nicheCategories,
          nicheCustom: hasOtherNiche(nicheCategories) ? nicheCustom : null
        })
      });

      if (res.ok) {
        setNicheMessage({ type: 'success', text: t.nicheSaved });
      } else {
        const data = await res.json();
        throw new Error(data.error || t.nicheSaveError);
      }
    } catch (error) {
      setNicheMessage({ type: 'error', text: error.message });
    } finally {
      setSavingNiches(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // Validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: t.errorPasswordMatch });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setMessage({ type: 'error', text: t.errorPasswordLength });
      return;
    }

    setSaving(true);

    try {
      const res = await fetch('/api/portal/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Fehler beim Ändern des Passworts');
      }

      setMessage({ type: 'success', text: t.successPasswordChanged });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setSaving(false);
    }
  };

  // Auge-Symbol Komponente - NEU
  const PasswordToggle = ({ show, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
    >
      {show ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  );

  if (loading) {
    return (
      <PortalLayout lang={lang} setLang={setLang}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout lang={lang} setLang={setLang}>
      <Head>
        <title>{t.pageTitle}</title>
      </Head>

      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">{t.title}</h1>
          <p className="text-gray-400">
            {t.subtitle}
          </p>
        </div>

        {/* Status Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-500/20 border border-green-500/50 text-green-400'
              : 'bg-red-500/20 border border-red-500/50 text-red-400'
          }`}>
            {message.text}
          </div>
        )}

        {/* Account Info */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">{t.accountInfoTitle}</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-800">
              <div>
                <p className="text-sm text-gray-400">{t.emailLabel}</p>
                <p className="text-white">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-800">
              <div>
                <p className="text-sm text-gray-400">{t.accountTypeLabel}</p>
                <p className="text-white capitalize">{user?.userType === 'influencer' ? t.influencer : t.brand}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                user?.userType === 'influencer' 
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'bg-blue-500/20 text-blue-400'
              }`}>
                {user?.userType === 'influencer' ? t.influencer : t.brand}
              </span>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm text-gray-400">{t.statusLabel}</p>
                <p className="text-white capitalize">{user?.status === 'active' || user?.status === 'approved' ? t.statusActive : t.statusPending}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                user?.status === 'active' || user?.status === 'approved'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {user?.status === 'active' || user?.status === 'approved' ? t.statusActive : t.statusPending}
              </span>
            </div>
          </div>
        </div>

        {/* NEU: Nischen-Auswahl (nur für Influencer) */}
        {user?.userType === 'influencer' && (
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-2">{t.nichesTitle}</h2>
            <p className="text-sm text-gray-400 mb-4">{t.nichesSubtitle}</p>
            
            {/* Niche Message */}
            {nicheMessage.text && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${
                nicheMessage.type === 'success' 
                  ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                  : 'bg-red-500/20 border border-red-500/50 text-red-400'
              }`}>
                {nicheMessage.text}
              </div>
            )}
            
            {/* Nischen-Buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              {NICHE_CATEGORIES.map((niche) => {
                const isSelected = nicheCategories.includes(niche.id);
                return (
                  <button
                    key={niche.id}
                    type="button"
                    onClick={() => toggleNiche(niche.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isSelected
                        ? 'bg-amber-400 text-black border-2 border-amber-400'
                        : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600 hover:text-white'
                    }`}
                  >
                    {niche.icon} {niche.label[lang] || niche.label.de}
                  </button>
                );
              })}
            </div>
            
            {/* Ausgewählt-Anzeige */}
            <p className="text-xs text-gray-500 mb-4">
              {nicheCategories.length}/{NICHE_MAX} {t.selected}
            </p>
            
            {/* Custom-Nische wenn "other" gewählt */}
            {hasOtherNiche(nicheCategories) && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t.nicheCustomLabel} *
                </label>
                <input
                  type="text"
                  value={nicheCustom}
                  onChange={(e) => setNicheCustom(e.target.value)}
                  placeholder={t.nicheCustomPlaceholder}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            )}
            
            {/* Speichern-Button */}
            <button
              onClick={handleSaveNiches}
              disabled={savingNiches}
              className="px-6 py-3 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {savingNiches ? t.savingNiches : t.saveNiches}
            </button>
          </div>
        )}

        {/* Change Password mit Auge-Symbolen */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">{t.changePasswordTitle}</h2>
          
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t.currentPasswordLabel}
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  required
                  className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <PasswordToggle show={showCurrentPassword} onClick={() => setShowCurrentPassword(!showCurrentPassword)} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t.newPasswordLabel}
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  required
                  minLength={8}
                  className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <PasswordToggle show={showNewPassword} onClick={() => setShowNewPassword(!showNewPassword)} />
              </div>
              <p className="mt-1 text-xs text-gray-500">{t.passwordHint}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t.confirmPasswordLabel}
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  required
                  className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <PasswordToggle show={showConfirmPassword} onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? t.changingPassword : t.changePasswordButton}
            </button>
          </form>
        </div>

        {/* Notification Settings (Placeholder) - BEIBEHALTEN */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">{t.notificationsTitle}</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">{t.emailNotifications}</p>
                <p className="text-sm text-gray-400">{t.emailNotificationsDesc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-amber-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-400"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">{t.newMessages}</p>
                <p className="text-sm text-gray-400">{t.newMessagesDesc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-amber-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-400"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">{t.newOrders}</p>
                <p className="text-sm text-gray-400">{t.newOrdersDesc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-amber-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-400"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Danger Zone - BEIBEHALTEN */}
        <div className="bg-gray-900 rounded-xl border border-red-500/30 p-6">
          <h2 className="text-lg font-semibold text-red-400 mb-4">{t.dangerZoneTitle}</h2>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">{t.deleteAccount}</p>
              <p className="text-sm text-gray-400">{t.deleteAccountDesc}</p>
            </div>
            <button
              className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              {t.deleteAccountButton}
            </button>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
          
