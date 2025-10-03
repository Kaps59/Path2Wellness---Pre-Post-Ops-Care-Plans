const express = require('express');
const router = express.Router();
const {
  createEntCarePlan,
  getAllEntCarePlans,
  getEntCarePlanById,
  updateEntCarePlan,
  deleteEntCarePlan,
  getEntCarePlansByPatient
} = require('../controllers/entController');
const { validateEntCarePlan } = require('../middleware/validation');

// @route   POST /api/ent/care-plans
// @desc    Create a new ENT care plan
// @access  Public (should be protected in production)
router.post('/care-plans', validateEntCarePlan, createEntCarePlan);

// @route   GET /api/ent/care-plans
// @desc    Get all ENT care plans with optional filtering and pagination
// @access  Public (should be protected in production)
router.get('/care-plans', getAllEntCarePlans);

// @route   GET /api/ent/care-plans/:id
// @desc    Get a specific ENT care plan by ID
// @access  Public (should be protected in production)
router.get('/care-plans/:id', getEntCarePlanById);

// @route   PUT /api/ent/care-plans/:id
// @desc    Update an ENT care plan
// @access  Public (should be protected in production)
router.put('/care-plans/:id', validateEntCarePlan, updateEntCarePlan);

// @route   DELETE /api/ent/care-plans/:id
// @desc    Delete an ENT care plan
// @access  Public (should be protected in production)
router.delete('/care-plans/:id', deleteEntCarePlan);

// @route   GET /api/ent/patients/:patientId/care-plans
// @desc    Get all ENT care plans for a specific patient
// @access  Public (should be protected in production)
router.get('/patients/:patientId/care-plans', getEntCarePlansByPatient);

module.exports = router;
