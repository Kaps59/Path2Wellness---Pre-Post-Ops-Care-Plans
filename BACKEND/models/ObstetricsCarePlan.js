const mongoose = require('mongoose');

const obstetricsCarePlanSchema = new mongoose.Schema({
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
  careType: {
    type: String,
    enum: ['prenatal', 'postnatal', 'delivery-prep'],
    required: true
  },
  gestationalWeek: {
    type: Number,
    min: 0,
    max: 42
  },
  careDetails: {
    trimesterSymptoms: {
      nausea: {
        type: String,
        enum: ['none', 'mild', 'moderate', 'severe'],
        default: 'none'
      },
      cramps: {
        type: String,
        enum: ['none', 'mild', 'moderate', 'severe'],
        default: 'none'
      },
      mood: {
        type: String,
        enum: ['stable', 'anxious', 'depressed', 'irritable', 'happy'],
        default: 'stable'
      },
      fatigue: {
        type: String,
        enum: ['none', 'mild', 'moderate', 'severe'],
        default: 'none'
      }
    },
    babyMovement: {
      frequency: {
        type: String,
        enum: ['not-applicable', 'frequent', 'normal', 'reduced', 'none'],
        default: 'not-applicable'
      },
      lastMovement: {
        type: Date
      },
      notes: {
        type: String,
        default: ''
      }
    },
    sleepNutrition: {
      sleepHours: {
        type: Number,
        min: 0,
        max: 24
      },
      sleepQuality: {
        type: String,
        enum: ['excellent', 'good', 'fair', 'poor'],
        default: 'good'
      },
      dietNotes: {
        type: String,
        default: ''
      },
      waterIntake: {
        type: Number, // in liters
        min: 0
      },
      supplements: [{
        name: String,
        dosage: String,
        frequency: String
      }]
    },
    postnatalRecovery: {
      bleeding: {
        type: String,
        enum: ['none', 'light', 'moderate', 'heavy'],
        default: 'none'
      },
      stitchesCondition: {
        type: String,
        enum: ['not-applicable', 'healing-well', 'concerning', 'infected'],
        default: 'not-applicable'
      },
      breastfeedingLogs: [{
        date: {
          type: Date,
          default: Date.now
        },
        duration: Number, // in minutes
        side: {
          type: String,
          enum: ['left', 'right', 'both']
        },
        notes: String
      }],
      painLevel: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
      },
      emotionalState: {
        type: String,
        enum: ['stable', 'anxious', 'depressed', 'overwhelmed', 'happy'],
        default: 'stable'
      }
    }
  },
  vitalSigns: {
    bloodPressure: {
      systolic: Number,
      diastolic: Number
    },
    weight: Number, // in kg
    temperature: Number, // in Celsius
    heartRate: Number
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
obstetricsCarePlanSchema.index({ patientId: 1, createdAt: -1 });
obstetricsCarePlanSchema.index({ doctorId: 1, createdAt: -1 });
obstetricsCarePlanSchema.index({ careType: 1 });
obstetricsCarePlanSchema.index({ status: 1 });

module.exports = mongoose.model('ObstetricsCarePlan', obstetricsCarePlanSchema);
