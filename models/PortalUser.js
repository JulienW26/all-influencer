/**
 * Portal User Model
 * Für Influencer und Brands
 */

import mongoose from 'mongoose';

const PortalUserSchema = new mongoose.Schema({
  // Login-Daten
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  
  // Benutzer-Typ
  userType: {
    type: String,
    enum: ['influencer', 'brand'],
    required: true,
  },
  
  // Status
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'suspended'],
    default: 'pending',
  },
  
  // Profil-Daten (Influencer)
  influencerProfile: {
    displayName: String,
    category: {
      type: String,
      enum: ['diamond', 'platin', 'gold', 'rising'],
    },
    spotNumber: Number,
    platforms: [{
      name: String,
      handle: String,
      followers: Number,
      url: String,
    }],
    bio: String,
    profileImage: String,
    country: String,
    languages: [String],
    niche: [String],
  },
  
  // Profil-Daten (Brand)
  brandProfile: {
    companyName: String,
    industry: String,
    website: String,
    logo: String,
    contactPerson: String,
    phone: String,
    description: String,
    country: String,
  },
  
  // Einladungscode
  invitationCode: {
    type: String,
    required: true,
  },
  
  // Gründer-Status
  isFounder: {
    type: Boolean,
    default: false,
  },
  founderNumber: Number,
  
  // Shares/Anteile
  shares: {
    earned: { type: Number, default: 0 },
    purchased: { type: Number, default: 0 },
  },
  
  // Zeitstempel
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  approvedAt: Date,
  lastLoginAt: Date,
  
  // E-Mail Verifizierung
  emailVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  
  // Passwort Reset
  resetToken: String,
  resetTokenExpiry: Date,
});

// Index für schnelle Suche
PortalUserSchema.index({ email: 1 });
PortalUserSchema.index({ status: 1 });
PortalUserSchema.index({ userType: 1 });
PortalUserSchema.index({ 'influencerProfile.category': 1 });

// Update timestamp bei Änderungen
PortalUserSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.PortalUser || mongoose.model('PortalUser', PortalUserSchema);
