const { body } = require('express-validator');

// ENT Care Plan Validation
const validateEntCarePlan = [
  body('patientId')
    .notEmpty()
    .withMessage('Patient ID is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Patient ID must be between 1 and 50 characters'),
  
  body('patientName')
    .notEmpty()
    .withMessage('Patient name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Patient name must be between 2 and 100 characters'),
  
  body('doctorId')
    .notEmpty()
    .withMessage('Doctor ID is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Doctor ID must be between 1 and 50 characters'),
  
  body('doctorName')
    .notEmpty()
    .withMessage('Doctor name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Doctor name must be between 2 and 100 characters'),
  
  body('operationType')
    .isIn(['pre-operation', 'post-operation'])
    .withMessage('Operation type must be either pre-operation or post-operation'),
  
  body('surgeryType')
    .notEmpty()
    .withMessage('Surgery type is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Surgery type must be between 2 and 100 characters'),
  
  body('careDetails.painLevel')
    .optional()
    .isInt({ min: 0, max: 10 })
    .withMessage('Pain level must be between 0 and 10'),
  
  body('careDetails.breathingIssues')
    .optional()
    .isIn(['none', 'mild', 'moderate', 'severe'])
    .withMessage('Breathing issues must be one of: none, mild, moderate, severe'),
  
  body('careDetails.throatDiscomfort')
    .optional()
    .isIn(['none', 'mild', 'moderate', 'severe'])
    .withMessage('Throat discomfort must be one of: none, mild, moderate, severe'),
  
  body('instructions')
    .notEmpty()
    .withMessage('Instructions are required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Instructions must be between 10 and 1000 characters'),
  
  body('status')
    .optional()
    .isIn(['active', 'completed', 'cancelled'])
    .withMessage('Status must be one of: active, completed, cancelled'),
  
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'urgent'])
    .withMessage('Priority must be one of: low, medium, high, urgent')
];

// Obstetrics Care Plan Validation
const validateObstetricsCarePlan = [
  body('patientId')
    .notEmpty()
    .withMessage('Patient ID is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Patient ID must be between 1 and 50 characters'),
  
  body('patientName')
    .notEmpty()
    .withMessage('Patient name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Patient name must be between 2 and 100 characters'),
  
  body('doctorId')
    .notEmpty()
    .withMessage('Doctor ID is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Doctor ID must be between 1 and 50 characters'),
  
  body('doctorName')
    .notEmpty()
    .withMessage('Doctor name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Doctor name must be between 2 and 100 characters'),
  
  body('careType')
    .isIn(['prenatal', 'postnatal', 'delivery-prep'])
    .withMessage('Care type must be one of: prenatal, postnatal, delivery-prep'),
  
  body('gestationalWeek')
    .optional()
    .isInt({ min: 0, max: 42 })
    .withMessage('Gestational week must be between 0 and 42'),
  
  body('careDetails.trimesterSymptoms.nausea')
    .optional()
    .isIn(['none', 'mild', 'moderate', 'severe'])
    .withMessage('Nausea must be one of: none, mild, moderate, severe'),
  
  body('careDetails.trimesterSymptoms.cramps')
    .optional()
    .isIn(['none', 'mild', 'moderate', 'severe'])
    .withMessage('Cramps must be one of: none, mild, moderate, severe'),
  
  body('careDetails.trimesterSymptoms.mood')
    .optional()
    .isIn(['stable', 'anxious', 'depressed', 'irritable', 'happy'])
    .withMessage('Mood must be one of: stable, anxious, depressed, irritable, happy'),
  
  body('careDetails.sleepNutrition.sleepHours')
    .optional()
    .isFloat({ min: 0, max: 24 })
    .withMessage('Sleep hours must be between 0 and 24'),
  
  body('careDetails.sleepNutrition.waterIntake')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Water intake must be a positive number'),
  
  body('careDetails.postnatalRecovery.painLevel')
    .optional()
    .isInt({ min: 0, max: 10 })
    .withMessage('Pain level must be between 0 and 10'),
  
  body('instructions')
    .notEmpty()
    .withMessage('Instructions are required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Instructions must be between 10 and 1000 characters'),
  
  body('status')
    .optional()
    .isIn(['active', 'completed', 'cancelled'])
    .withMessage('Status must be one of: active, completed, cancelled'),
  
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'urgent'])
    .withMessage('Priority must be one of: low, medium, high, urgent')
];

// Breastfeeding Log Validation
const validateBreastfeedingLog = [
  body('duration')
    .isInt({ min: 1, max: 120 })
    .withMessage('Duration must be between 1 and 120 minutes'),
  
  body('side')
    .isIn(['left', 'right', 'both'])
    .withMessage('Side must be one of: left, right, both'),
  
  body('notes')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Notes must not exceed 500 characters')
];

// Authentication Validations
const validatePatientRegister = [
  body('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  
  body('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  
  body('dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid date of birth'),
  
  body('gender')
    .optional()
    .isIn(['male', 'female', 'other'])
    .withMessage('Gender must be one of: male, female, other'),
  
  body('phoneNumber')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number')
];

const validateAdminRegister = [
  body('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  
  body('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  
  body('specialization')
    .optional()
    .isIn(['ENT', 'Obstetrics', 'General', 'Other'])
    .withMessage('Specialization must be one of: ENT, Obstetrics, General, Other'),
  
  body('licenseNumber')
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage('License number must be between 3 and 50 characters'),
  
  body('department')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Department must be between 2 and 100 characters')
];

const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const validateChangePassword = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
];

module.exports = {
  validateEntCarePlan,
  validateObstetricsCarePlan,
  validateBreastfeedingLog,
  validatePatientRegister,
  validateAdminRegister,
  validateLogin,
  validateChangePassword
};
