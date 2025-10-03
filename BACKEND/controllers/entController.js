const EntCarePlan = require('../models/EntCarePlan');
const { validationResult } = require('express-validator');

// Create a new ENT care plan
const createEntCarePlan = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const carePlan = new EntCarePlan(req.body);
    const savedCarePlan = await carePlan.save();

    res.status(201).json({
      success: true,
      message: 'ENT care plan created successfully',
      data: savedCarePlan
    });
  } catch (error) {
    console.error('Error creating ENT care plan:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create ENT care plan',
      error: error.message
    });
  }
};

// Get all ENT care plans with optional filtering
const getAllEntCarePlans = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      operationType,
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
    if (operationType) filter.operationType = operationType;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const carePlans = await EntCarePlan.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await EntCarePlan.countDocuments(filter);

    res.status(200).json({
      success: true,
      message: 'ENT care plans retrieved successfully',
      data: carePlans,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching ENT care plans:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch ENT care plans',
      error: error.message
    });
  }
};

// Get a specific ENT care plan by ID
const getEntCarePlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const carePlan = await EntCarePlan.findById(id);

    if (!carePlan) {
      return res.status(404).json({
        success: false,
        message: 'ENT care plan not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'ENT care plan retrieved successfully',
      data: carePlan
    });
  } catch (error) {
    console.error('Error fetching ENT care plan:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch ENT care plan',
      error: error.message
    });
  }
};

// Update an ENT care plan
const updateEntCarePlan = async (req, res) => {
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
    const updatedCarePlan = await EntCarePlan.findByIdAndUpdate(
      id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedCarePlan) {
      return res.status(404).json({
        success: false,
        message: 'ENT care plan not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'ENT care plan updated successfully',
      data: updatedCarePlan
    });
  } catch (error) {
    console.error('Error updating ENT care plan:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update ENT care plan',
      error: error.message
    });
  }
};

// Delete an ENT care plan
const deleteEntCarePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCarePlan = await EntCarePlan.findByIdAndDelete(id);

    if (!deletedCarePlan) {
      return res.status(404).json({
        success: false,
        message: 'ENT care plan not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'ENT care plan deleted successfully',
      data: deletedCarePlan
    });
  } catch (error) {
    console.error('Error deleting ENT care plan:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete ENT care plan',
      error: error.message
    });
  }
};

// Get ENT care plans by patient ID
const getEntCarePlansByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const carePlans = await EntCarePlan.find({ patientId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'ENT care plans for patient retrieved successfully',
      data: carePlans
    });
  } catch (error) {
    console.error('Error fetching patient ENT care plans:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch patient ENT care plans',
      error: error.message
    });
  }
};

module.exports = {
  createEntCarePlan,
  getAllEntCarePlans,
  getEntCarePlanById,
  updateEntCarePlan,
  deleteEntCarePlan,
  getEntCarePlansByPatient
};
