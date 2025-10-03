const ObstetricsCarePlan = require('../models/ObstetricsCarePlan');
const { validationResult } = require('express-validator');

// Create a new Obstetrics care plan
const createObstetricsCarePlan = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const carePlan = new ObstetricsCarePlan(req.body);
    const savedCarePlan = await carePlan.save();

    res.status(201).json({
      success: true,
      message: 'Obstetrics care plan created successfully',
      data: savedCarePlan
    });
  } catch (error) {
    console.error('Error creating Obstetrics care plan:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create Obstetrics care plan',
      error: error.message
    });
  }
};

// Get all Obstetrics care plans with optional filtering
const getAllObstetricsCarePlans = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      careType,
      status,
      priority,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    if (patientId) filter.patientId = patientId;
    if (doctorId) filter.doctorId = doctorId;
    if (careType) filter.careType = careType;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const carePlans = await ObstetricsCarePlan.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await ObstetricsCarePlan.countDocuments(filter);

    res.status(200).json({
      success: true,
      message: 'Obstetrics care plans retrieved successfully',
      data: carePlans,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching Obstetrics care plans:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch Obstetrics care plans',
      error: error.message
    });
  }
};

// Get a specific Obstetrics care plan by ID
const getObstetricsCarePlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const carePlan = await ObstetricsCarePlan.findById(id);

    if (!carePlan) {
      return res.status(404).json({
        success: false,
        message: 'Obstetrics care plan not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Obstetrics care plan retrieved successfully',
      data: carePlan
    });
  } catch (error) {
    console.error('Error fetching Obstetrics care plan:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch Obstetrics care plan',
      error: error.message
    });
  }
};

// Update an Obstetrics care plan
const updateObstetricsCarePlan = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const updatedCarePlan = await ObstetricsCarePlan.findByIdAndUpdate(
      id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedCarePlan) {
      return res.status(404).json({
        success: false,
        message: 'Obstetrics care plan not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Obstetrics care plan updated successfully',
      data: updatedCarePlan
    });
  } catch (error) {
    console.error('Error updating Obstetrics care plan:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update Obstetrics care plan',
      error: error.message
    });
  }
};

// Delete an Obstetrics care plan
const deleteObstetricsCarePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCarePlan = await ObstetricsCarePlan.findByIdAndDelete(id);

    if (!deletedCarePlan) {
      return res.status(404).json({
        success: false,
        message: 'Obstetrics care plan not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Obstetrics care plan deleted successfully',
      data: deletedCarePlan
    });
  } catch (error) {
    console.error('Error deleting Obstetrics care plan:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete Obstetrics care plan',
      error: error.message
    });
  }
};

// Get Obstetrics care plans by patient ID
const getObstetricsCarePlansByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const carePlans = await ObstetricsCarePlan.find({ patientId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Obstetrics care plans for patient retrieved successfully',
      data: carePlans
    });
  } catch (error) {
    console.error('Error fetching patient Obstetrics care plans:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch patient Obstetrics care plans',
      error: error.message
    });
  }
};

// Add breastfeeding log entry
const addBreastfeedingLog = async (req, res) => {
  try {
    const { id } = req.params;
    const { duration, side, notes } = req.body;

    const carePlan = await ObstetricsCarePlan.findById(id);
    if (!carePlan) {
      return res.status(404).json({
        success: false,
        message: 'Obstetrics care plan not found'
      });
    }

    carePlan.careDetails.postnatalRecovery.breastfeedingLogs.push({
      date: new Date(),
      duration,
      side,
      notes
    });

    await carePlan.save();

    res.status(200).json({
      success: true,
      message: 'Breastfeeding log added successfully',
      data: carePlan
    });
  } catch (error) {
    console.error('Error adding breastfeeding log:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add breastfeeding log',
      error: error.message
    });
  }
};

module.exports = {
  createObstetricsCarePlan,
  getAllObstetricsCarePlans,
  getObstetricsCarePlanById,
  updateObstetricsCarePlan,
  deleteObstetricsCarePlan,
  getObstetricsCarePlansByPatient,
  addBreastfeedingLog
};
