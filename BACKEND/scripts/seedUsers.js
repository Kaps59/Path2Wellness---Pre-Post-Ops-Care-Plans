const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');

    // Clear existing users (optional - remove in production)
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create demo patient
    const demoPatient = new User({
      firstName: 'John',
      lastName: 'Patient',
      email: 'patient@demo.com',
      password: 'demo123',
      userType: 'patient',
      dateOfBirth: new Date('1990-05-15'),
      gender: 'male',
      phoneNumber: '+1234567890',
      address: {
        street: '123 Main St',
        city: 'Healthcare City',
        state: 'HC',
        zipCode: '12345',
        country: 'USA'
      },
      emergencyContact: {
        name: 'Jane Patient',
        relationship: 'Spouse',
        phoneNumber: '+1234567891'
      },
      isActive: true,
      isVerified: true
    });

    await demoPatient.save();
    console.log('Demo patient created:', demoPatient.email, 'ID:', demoPatient.patientId);

    // Create demo admin/doctor
    const demoAdmin = new User({
      firstName: 'Dr. Sarah',
      lastName: 'Doctor',
      email: 'doctor@demo.com',
      password: 'admin123',
      userType: 'admin',
      specialization: 'ENT',
      licenseNumber: 'MD123456',
      department: 'Ear, Nose & Throat',
      isActive: true,
      isVerified: true
    });

    await demoAdmin.save();
    console.log('Demo admin created:', demoAdmin.email, 'ID:', demoAdmin.doctorId);

    // Create another demo admin for Obstetrics
    const demoObsAdmin = new User({
      firstName: 'Dr. Maria',
      lastName: 'Obstetrics',
      email: 'obstetrics@demo.com',
      password: 'admin123',
      userType: 'admin',
      specialization: 'Obstetrics',
      licenseNumber: 'MD789012',
      department: 'Obstetrics & Gynecology',
      isActive: true,
      isVerified: true
    });

    await demoObsAdmin.save();
    console.log('Demo obstetrics admin created:', demoObsAdmin.email, 'ID:', demoObsAdmin.doctorId);

    console.log('\n=== Demo Users Created Successfully ===');
    console.log('Patient Login: patient@demo.com / demo123');
    console.log('Admin Login: doctor@demo.com / admin123');
    console.log('Obstetrics Admin: obstetrics@demo.com / admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

// Run the seed function
seedUsers();
