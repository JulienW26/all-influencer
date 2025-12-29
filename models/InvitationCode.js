/**
 * Mongoose Model: InvitationCode
 * Datenvorlage für Einladungscodes
 */

import mongoose from 'mongoose';
import crypto from 'crypto';

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
InvitationCodeSchema.statics.generateCode = function(prefix = 'INV') {
  const random = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `${prefix}-${random}`;
};

export default mongoose.models.InvitationCode || mongoose.model('InvitationCode', InvitationCodeSchema);
