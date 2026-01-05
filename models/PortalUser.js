import mongoose from 'mongoose';

/**
 * PortalUser Schema für ALL INFLUENCER
 * 
 * Enthält alle Felder für Benutzer (Influencer, Brands, Admins)
 */
const PortalUserSchema = new mongoose.Schema({
  // === Basis-Felder ===
  email: {
    type: String,
    required: [true, 'E-Mail ist erforderlich'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Ungültige E-Mail-Adresse']
  },
  password: {
    type: String,
    required: [true, 'Passwort ist erforderlich'],
    minlength: [8, 'Passwort muss mindestens 8 Zeichen haben']
  },
  
  // === Benutzertyp ===
  userType: {
    type: String,
    enum: ['influencer', 'brand', 'admin'],
    default: 'influencer'
  },
  // Für Kompatibilität behalten
  role: {
    type: String,
    enum: ['influencer', 'brand', 'admin'],
    default: 'influencer'
  },
  
  // === Status ===
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'suspended'],
    default: 'pending'
  },
  
  // === Profil-Informationen ===
  name: {
    type: String,
    trim: true
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  
  // === Social Media (für Influencer) ===
  instagram: {
    type: String,
    trim: true
  },
  tiktok: {
    type: String,
    trim: true
  },
  youtube: {
    type: String,
    trim: true
  },
  followers: {
    type: Number,
    default: 0
  },
  
  // === Unternehmen (für Brands) ===
  company: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  industry: {
    type: String,
    trim: true
  },
  
  // === Founder-Programm ===
  isFounder: {
    type: Boolean,
    default: false
  },
  founderShares: {
    type: Number,
    default: 0
  },
  founderSince: {
    type: Date
  },
  
  // === Nischen-Kategorien (NEU) ===
  nicheCategories: {
    type: [String],
    default: [],
    validate: {
      validator: function(v) {
        return v.length <= 3;
      },
      message: 'Maximal 3 Nischen erlaubt'
    }
  },
  nicheCustom: {
    type: String,
    trim: true
  },
  
  // === Zusätzliche Plattformen (NEU) ===
  additionalPlatforms: {
    type: [{
      platform: String,
      link: String,
      followers: Number
    }],
    default: [],
    validate: {
      validator: function(v) {
        return v.length <= 2;
      },
      message: 'Maximal 2 zusätzliche Plattformen erlaubt'
    }
  },
  
  // === Spot-System (NEU) ===
  hasSpot: {
    type: Boolean,
    default: false
  },
  spotNumber: {
    type: Number,
    default: null
  },
  
  // === Passwort-Reset ===
  resetPasswordToken: {
    type: String,
    select: false // Nicht standardmäßig bei Abfragen zurückgeben
  },
  resetPasswordExpires: {
    type: Date,
    select: false
  },
  
  // === E-Mail-Verifizierung ===
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String,
    select: false
  },
  
  // === Spracheinstellung ===
  preferredLanguage: {
    type: String,
    enum: ['de', 'en', 'es'],
    default: 'de'
  },
  
  // === Profilbild ===
  avatar: {
    type: String
  },
  
  // === Letzte Aktivität ===
  lastLogin: {
    type: Date
  },
  
  // === Notizen (für Admins) ===
  adminNotes: {
    type: String
  }
}, {
  timestamps: true // createdAt, updatedAt automatisch
});

// Index für schnelle Suche
PortalUserSchema.index({ email: 1 });
PortalUserSchema.index({ userType: 1, status: 1 });
PortalUserSchema.index({ role: 1, status: 1 });
PortalUserSchema.index({ resetPasswordToken: 1 });

// Virtuelles Feld für vollständigen Namen
PortalUserSchema.virtual('fullName').get(function() {
  if (this.firstName && this.lastName) {
    return `${this.firstName} ${this.lastName}`;
  }
  return this.name || this.email.split('@')[0];
});

// JSON-Transformation (Passwort nie zurückgeben)
PortalUserSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.password;
    delete ret.resetPasswordToken;
    delete ret.resetPasswordExpires;
    delete ret.emailVerificationToken;
    delete ret.__v;
    return ret;
  }
});

// Model nur einmal registrieren
export default mongoose.models.PortalUser || mongoose.model('PortalUser', PortalUserSchema);
