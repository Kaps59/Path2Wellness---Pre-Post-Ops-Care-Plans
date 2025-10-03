const express = require('express');
const router = express.Router();
const {
  createObstetricsCarePlan,
  getAllObstetricsCarePlans,
  getObstetricsCarePlanById,
  updateObstetricsCarePlan,
  deleteObstetricsCarePlan,
  getObstetricsCarePlansByPatient,
  addBreastfeedingLog
} = require('../controllers/obstetricsController');
const { validateObstetricsCarePlan, validateBreastfeedingLog } = require('../middleware/validation');

// @route   POST /api/obstetrics/care-plans
// @desc    Create a new Obstetrics care plan
// @access  Public (should be protected in production)
router.post('/care-plans', validateObstetricsCarePlan, createObstetricsCarePlan);

// @route   GET /api/obstetrics/care-plans
// @desc    Get all Obstetrics care plans with optional filtering and pagination
// @access  Public (should be protected in production)
router.get('/care-plans', getAllObstetricsCarePlans);

// @route   GET /api/obstetrics/care-plans/:id
// @desc    Get a specific Obstetrics care plan by ID
// @access  Public (should be protected in production)
router.get('/care-plans/:id', getObstetricsCarePlanById);

// @route   PUT /api/obstetrics/care-plans/:id
// @desc    Update an Obstetrics care plan
// @access  Public (should be protected in production)
router.put('/care-plans/:id', validateObstetricsCarePlan, updateObstetricsCarePlan);

// @route   DELETE /api/obstetrics/care-plans/:id
// @desc    Delete an Obstetrics care plan
// @access  Public (should be protected in production)
router.delete('/care-plans/:id', deleteObstetricsCarePlan);

// @route   GET /api/obstetrics/patients/:patientId/care-plans
// @desc    Get all Obstetrics care plans for a specific patient
// @access  Public (should be protected in production)
router.get('/patients/:patientId/care-plans', getObstetricsCarePlansByPatient);

// @route   POST /api/obstetrics/care-plans/:id/breastfeeding-log
// @desc    Add a breastfeeding log entry to a care plan
// @access  Public (should be protected in production)
router.post('/care-plans/:id/breastfeeding-log', validateBreastfeedingLog, addBreastfeedingLog);

module.exports = router;
