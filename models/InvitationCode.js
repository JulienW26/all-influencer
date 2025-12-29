/**
 * Mongoose Model: InvitationCode
 * Datenvorlage für Einladungscodes
 */

import mongoose from 'mongoose';

const InvitationCodeSchema = new mongoose.Schema({
  code: { 
    type: String, 
    required: true, 
    unique: true 
  },
  type: { 
    type: String, 
    enum: ['influencer', 'brand'], 
    required: true 
  },
  category: { 
    type: String 
  },
  spotNumber: { 
    type: Number 
  },
  isFounderCode: { 
    type: Boolean, 
    default: false 
  },
  status: { 
    type: String, 
    enum: ['active', 'used', 'deactivated'], 
    default: 'active' 
  },
  maxUses: { 
    type: Number, 
    default: 1 
  },
  usedCount: { 
    type: Number, 
    default: 0 
  },
  validUntil: { 
    type: Date 
  },
  notes: { 
    type: String 
  },
  createdBy: { 
    type: String 
  },
  usedBy: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
}, { 
  timestamps: true 
});

// Funktion um einen zufälligen Code zu generieren
// Format: IN-XXXX-XXXX-XXXX oder BR-XXXX-XXXX-XXXX
InvitationCodeSchema.statics.generateCode = function(type) {
  const prefix = type === 'influencer' ? 'IN' : 'BR';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let random = '';
  for (let i = 0; i < 12; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${random.slice(0,4)}-${random.slice(4,8)}-${random.slice(8,12)}`;
};

export default mongoose.models.InvitationCode || mongoose.model('InvitationCode', InvitationCodeSchema);
