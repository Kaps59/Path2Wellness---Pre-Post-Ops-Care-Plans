const mongoose = require('mongoose');

const entCarePlanSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
    trim: true
  },
  patientName: {
    type: String,
    required: true,
    trim: true
  },
  doctorId: {
    type: String,
    required: true,
    trim: true
  },
  doctorName: {
    type: String,
    required: true,
    trim: true
  },
  operationType: {
    type: String,
    enum: ['pre-operation', 'post-operation'],
    required: true
  },
  surgeryType: {
    type: String,
    required: true,
    trim: true
  },
  careDetails: {
    painLevel: {
      type: Number,
      min: 0,
      max: 10,
      default: 0
    },
    breathingIssues: {
      type: String,
      enum: ['none', 'mild', 'moderate', 'severe'],
      default: 'none'
    },
    throatDiscomfort: {
      type: String,
      enum: ['none', 'mild', 'moderate', 'severe'],
      default: 'none'
    },
    medicationIntake: [{
      medicationName: {
        type: String,
        required: true
      },
      dosage: {
        type: String,
        required: true
      },
      frequency: {
        type: String,
        required: true
      },
      sideEffects: {
        type: String,
        default: 'none'
      }
    }],
    healingProgress: {
      woundCondition: {
        type: String,
        enum: ['excellent', 'good', 'fair', 'poor'],
        default: 'good'
      },
      swelling: {
        type: String,
        enum: ['none', 'mild', 'moderate', 'severe'],
        default: 'none'
      },
      notes: {
        type: String,
        default: ''
      }
    }
  },
  symptoms: {
    type: String,
    default: ''
  },
  instructions: {
    type: String,
    required: true
  },
  nextAppointment: {
    type: Date
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  }
}, {
  timestamps: true
});

// Index for better query performance
entCarePlanSchema.index({ patientId: 1, createdAt: -1 });
entCarePlanSchema.index({ doctorId: 1, createdAt: -1 });
entCarePlanSchema.index({ status: 1 });

module.exports = mongoose.model('EntCarePlan', entCarePlanSchema);
