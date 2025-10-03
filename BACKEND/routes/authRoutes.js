const express = require('express');
const router = express.Router();
const {
  patientRegister,
  patientLogin,
  adminRegister,
  adminLogin,
  updateProfile,
  changePassword,
  validateToken
} = require('../controllers/authController');
const {
  validatePatientRegister,
  validateAdminRegister,
  validateLogin,
  validateChangePassword
} = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');

// Patient Authentication Routes
// @route   POST /api/auth/patient/register
// @desc    Register a new patient
// @access  Public
router.post('/patient/register', validatePatientRegister, patientRegister);

// @route   POST /api/auth/patient/login
// @desc    Login patient
// @access  Public
router.post('/patient/login', validateLogin, patientLogin);

// Admin Authentication Routes
// @route   POST /api/auth/admin/register
// @desc    Register a new admin/doctor
// @access  Public
router.post('/admin/register', validateAdminRegister, adminRegister);

// @route   POST /api/auth/admin/login
// @desc    Login admin/doctor
// @access  Public
router.post('/admin/login', validateLogin, adminLogin);

// Protected Routes (require authentication)
// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', authenticateToken, updateProfile);

// @route   PUT /api/auth/change-password
// @desc    Change user password
// @access  Private
router.put('/change-password', authenticateToken, validateChangePassword, changePassword);

// @route   GET /api/auth/validate
// @desc    Validate JWT token
// @access  Private
router.get('/validate', authenticateToken, validateToken);

module.exports = router;
