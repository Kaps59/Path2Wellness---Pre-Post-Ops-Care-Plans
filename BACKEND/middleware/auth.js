const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token - user not found'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Add user info to request
    req.user = {
      userId: user._id,
      userType: user.userType,
      patientId: user.patientId,
      doctorId: user.doctorId,
      email: user.email,
      fullName: user.fullName
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired'
      });
    }

    console.error('Authentication error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication failed',
      error: error.message
    });
  }
};

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (req.user.userType !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required'
    });
  }
  next();
};

// Middleware to check if user is patient
const requirePatient = (req, res, next) => {
  if (req.user.userType !== 'patient') {
    return res.status(403).json({
      success: false,
      message: 'Patient access required'
    });
  }
  next();
};

// Middleware to check if user can access patient data
const canAccessPatientData = (req, res, next) => {
  const { patientId } = req.params;
  
  // Admin can access any patient data
  if (req.user.userType === 'admin') {
    return next();
  }
  
  // Patient can only access their own data
  if (req.user.userType === 'patient' && req.user.patientId === patientId) {
    return next();
  }
  
  return res.status(403).json({
    success: false,
    message: 'Access denied - insufficient permissions'
  });
};

// Optional authentication middleware (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      
      if (user && user.isActive) {
        req.user = {
          userId: user._id,
          userType: user.userType,
          patientId: user.patientId,
          doctorId: user.doctorId,
          email: user.email,
          fullName: user.fullName
        };
      }
    }
    
    next();
  } catch (error) {
    // Continue without authentication if token is invalid
    next();
  }
};

module.exports = {
  authenticateToken,
  requireAdmin,
  requirePatient,
  canAccessPatientData,
  optionalAuth
};
