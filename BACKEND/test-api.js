/**
 * Path2Wellness Backend API Testing Suite
 * 
 * This script comprehensively tests all API endpoints for ENT and Obstetrics care plans.
 * Make sure the server is running (npm run dev) before executing this script.
 * 
 * Usage: node test-api.js
 */

const axios = require('axios');

// Configuration
const CONFIG = {
  BASE_URL: 'http://localhost:5000/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3
};

// Test data templates
const TEST_DATA = {
  entCarePlan: {
    patientId: "ENT001",
    patientName: "John Doe",
    doctorId: "DR001",
    doctorName: "Dr. Smith",
    operationType: "post-operation",
    surgeryType: "Tonsillectomy",
    careDetails: {
      painLevel: 5,
      breathingIssues: "mild",
      throatDiscomfort: "moderate",
      medicationIntake: [{
        medicationName: "Ibuprofen",
        dosage: "400mg",
        frequency: "Every 6 hours",
        sideEffects: "none"
      }],
      healingProgress: {
        woundCondition: "good",
        swelling: "mild",
        notes: "Healing well, minimal bleeding"
      }
    },
    symptoms: "Sore throat, difficulty swallowing",
    instructions: "Take medications as prescribed, avoid hard foods, rest voice for at least 48 hours",
    priority: "medium"
  },

  obstetricsCarePlan: {
    patientId: "OBS001",
    patientName: "Jane Smith",
    doctorId: "DR002",
    doctorName: "Dr. Johnson",
    careType: "prenatal",
    gestationalWeek: 28,
    careDetails: {
      trimesterSymptoms: {
        nausea: "mild",
        cramps: "none",
        mood: "stable",
        fatigue: "moderate"
      },
      babyMovement: {
        frequency: "normal",
        notes: "Active movements felt regularly throughout the day"
      },
      sleepNutrition: {
        sleepHours: 7,
        sleepQuality: "fair",
        dietNotes: "Balanced diet with prenatal vitamins and increased calcium intake",
        waterIntake: 2.5,
        supplements: [{
          name: "Folic Acid",
          dosage: "400mcg",
          frequency: "Daily"
        }, {
          name: "Iron",
          dosage: "30mg",
          frequency: "Daily"
        }]
      }
    },
    vitalSigns: {
      bloodPressure: {
        systolic: 120,
        diastolic: 80
      },
      weight: 65,
      temperature: 36.5,
      heartRate: 75
    },
    instructions: "Continue prenatal vitamins, monitor baby movements daily, attend regular checkups",
    priority: "medium"
  },

  breastfeedingLog: {
    duration: 25,
    side: "both",
    notes: "Baby latched well, good feeding session"
  }
};

// Test results tracking
let testResults = {
  passed: 0,
  failed: 0,
  total: 0,
  details: []
};

// Utility functions
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const logTest = (testName, status, details = '') => {
  testResults.total++;
  const icon = status === 'PASS' ? '✅' : '❌';
  const message = `${icon} ${testName}`;
  
  if (status === 'PASS') {
    testResults.passed++;
    console.log(`${message} ${details}`);
  } else {
    testResults.failed++;
    console.log(`${message}`);
    if (details) console.log(`   Error: ${details}`);
  }
  
  testResults.details.push({ testName, status, details });
};

const makeRequest = async (method, url, data = null, retries = CONFIG.RETRY_ATTEMPTS) => {
  try {
    const config = {
      method,
      url: `${CONFIG.BASE_URL}${url}`,
      timeout: CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    if (data) config.data = data;
    
    const response = await axios(config);
    return response;
  } catch (error) {
    if (retries > 0 && error.code === 'ECONNREFUSED') {
      console.log(`   Retrying... (${CONFIG.RETRY_ATTEMPTS - retries + 1}/${CONFIG.RETRY_ATTEMPTS})`);
      await sleep(2000);
      return makeRequest(method, url, data, retries - 1);
    }
    throw error;
  }
};

// Test functions
async function testHealthEndpoint() {
  try {
    const response = await makeRequest('GET', '/health');
    if (response.status === 200 && response.data.status === 'OK') {
      logTest('Health Endpoint', 'PASS', `- ${response.data.message}`);
      return true;
    } else {
      logTest('Health Endpoint', 'FAIL', `Unexpected response: ${response.status}`);
      return false;
    }
  } catch (error) {
    logTest('Health Endpoint', 'FAIL', error.message);
    return false;
  }
}

async function testCreateEntCarePlan() {
  try {
    const response = await makeRequest('POST', '/ent/care-plans', TEST_DATA.entCarePlan);
    if (response.status === 201 && response.data.success) {
      logTest('Create ENT Care Plan', 'PASS', `- ID: ${response.data.data._id}`);
      return response.data.data._id;
    } else {
      logTest('Create ENT Care Plan', 'FAIL', `Status: ${response.status}`);
      return null;
    }
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    logTest('Create ENT Care Plan', 'FAIL', errorMsg);
    return null;
  }
}

async function testCreateObstetricsCarePlan() {
  try {
    const response = await makeRequest('POST', '/obstetrics/care-plans', TEST_DATA.obstetricsCarePlan);
    if (response.status === 201 && response.data.success) {
      logTest('Create Obstetrics Care Plan', 'PASS', `- ID: ${response.data.data._id}`);
      return response.data.data._id;
    } else {
      logTest('Create Obstetrics Care Plan', 'FAIL', `Status: ${response.status}`);
      return null;
    }
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    logTest('Create Obstetrics Care Plan', 'FAIL', errorMsg);
    return null;
  }
}

async function testGetAllEntCarePlans() {
  try {
    const response = await makeRequest('GET', '/ent/care-plans');
    if (response.status === 200 && Array.isArray(response.data.data)) {
      logTest('Get All ENT Care Plans', 'PASS', `- Found: ${response.data.data.length} plans`);
      return true;
    } else {
      logTest('Get All ENT Care Plans', 'FAIL', 'Invalid response format');
      return false;
    }
  } catch (error) {
    logTest('Get All ENT Care Plans', 'FAIL', error.message);
    return false;
  }
}

async function testGetAllObstetricsCarePlans() {
  try {
    const response = await makeRequest('GET', '/obstetrics/care-plans');
    if (response.status === 200 && Array.isArray(response.data.data)) {
      logTest('Get All Obstetrics Care Plans', 'PASS', `- Found: ${response.data.data.length} plans`);
      return true;
    } else {
      logTest('Get All Obstetrics Care Plans', 'FAIL', 'Invalid response format');
      return false;
    }
  } catch (error) {
    logTest('Get All Obstetrics Care Plans', 'FAIL', error.message);
    return false;
  }
}

async function testGetSpecificEntCarePlan(id) {
  if (!id) {
    logTest('Get Specific ENT Care Plan', 'SKIP', 'No ID available');
    return false;
  }
  
  try {
    const response = await makeRequest('GET', `/ent/care-plans/${id}`);
    if (response.status === 200 && response.data.data._id === id) {
      logTest('Get Specific ENT Care Plan', 'PASS', `- Patient: ${response.data.data.patientName}`);
      return true;
    } else {
      logTest('Get Specific ENT Care Plan', 'FAIL', 'Invalid response');
      return false;
    }
  } catch (error) {
    logTest('Get Specific ENT Care Plan', 'FAIL', error.message);
    return false;
  }
}

async function testGetSpecificObstetricsCarePlan(id) {
  if (!id) {
    logTest('Get Specific Obstetrics Care Plan', 'SKIP', 'No ID available');
    return false;
  }
  
  try {
    const response = await makeRequest('GET', `/obstetrics/care-plans/${id}`);
    if (response.status === 200 && response.data.data._id === id) {
      logTest('Get Specific Obstetrics Care Plan', 'PASS', `- Patient: ${response.data.data.patientName}`);
      return true;
    } else {
      logTest('Get Specific Obstetrics Care Plan', 'FAIL', 'Invalid response');
      return false;
    }
  } catch (error) {
    logTest('Get Specific Obstetrics Care Plan', 'FAIL', error.message);
    return false;
  }
}

async function testUpdateEntCarePlan(id) {
  if (!id) {
    logTest('Update ENT Care Plan', 'SKIP', 'No ID available');
    return false;
  }
  
  try {
    const updatedData = {
      ...TEST_DATA.entCarePlan,
      priority: 'high',
      careDetails: {
        ...TEST_DATA.entCarePlan.careDetails,
        painLevel: 3
      }
    };
    
    const response = await makeRequest('PUT', `/ent/care-plans/${id}`, updatedData);
    if (response.status === 200 && response.data.success) {
      logTest('Update ENT Care Plan', 'PASS', `- Priority updated to: ${response.data.data.priority}`);
      return true;
    } else {
      logTest('Update ENT Care Plan', 'FAIL', 'Update failed');
      return false;
    }
  } catch (error) {
    logTest('Update ENT Care Plan', 'FAIL', error.message);
    return false;
  }
}

async function testPatientSpecificQueries() {
  try {
    const entResponse = await makeRequest('GET', '/ent/patients/ENT001/care-plans');
    const obsResponse = await makeRequest('GET', '/obstetrics/patients/OBS001/care-plans');
    
    if (entResponse.status === 200 && obsResponse.status === 200) {
      logTest('Patient-Specific Queries', 'PASS', 
        `- ENT: ${entResponse.data.data.length}, Obstetrics: ${obsResponse.data.data.length}`);
      return true;
    } else {
      logTest('Patient-Specific Queries', 'FAIL', 'One or more queries failed');
      return false;
    }
  } catch (error) {
    logTest('Patient-Specific Queries', 'FAIL', error.message);
    return false;
  }
}

async function testBreastfeedingLog(obsId) {
  if (!obsId) {
    logTest('Add Breastfeeding Log', 'SKIP', 'No Obstetrics ID available');
    return false;
  }
  
  try {
    const response = await makeRequest('POST', `/obstetrics/care-plans/${obsId}/breastfeeding-log`, TEST_DATA.breastfeedingLog);
    if (response.status === 200 && response.data.success) {
      logTest('Add Breastfeeding Log', 'PASS', '- Log entry added successfully');
      return true;
    } else {
      logTest('Add Breastfeeding Log', 'FAIL', 'Failed to add log');
      return false;
    }
  } catch (error) {
    logTest('Add Breastfeeding Log', 'FAIL', error.message);
    return false;
  }
}

async function testPaginationAndFiltering() {
  try {
    const response = await makeRequest('GET', '/ent/care-plans?page=1&limit=5&sortBy=createdAt&sortOrder=desc');
    if (response.status === 200 && response.data.pagination) {
      logTest('Pagination & Filtering', 'PASS', 
        `- Page: ${response.data.pagination.currentPage}, Items: ${response.data.data.length}`);
      return true;
    } else {
      logTest('Pagination & Filtering', 'FAIL', 'Pagination not working');
      return false;
    }
  } catch (error) {
    logTest('Pagination & Filtering', 'FAIL', error.message);
    return false;
  }
}

// Main test runner
async function runAllTests() {
  console.log('🚀 Path2Wellness API Testing Suite');
  console.log('=====================================\n');
  
  // Check if server is running
  console.log('🔍 Pre-flight checks...');
  const healthCheck = await testHealthEndpoint();
  
  if (!healthCheck) {
    console.log('\n❌ Server is not responding. Please ensure:');
    console.log('1. Server is running: npm run dev');
    console.log('2. Server is accessible on http://localhost:5000');
    console.log('3. No firewall blocking the connection\n');
    return;
  }
  
  console.log('\n📝 Running CRUD tests...');
  
  // Create operations
  const entId = await testCreateEntCarePlan();
  const obsId = await testCreateObstetricsCarePlan();
  
  // Read operations
  await testGetAllEntCarePlans();
  await testGetAllObstetricsCarePlans();
  await testGetSpecificEntCarePlan(entId);
  await testGetSpecificObstetricsCarePlan(obsId);
  
  // Update operations
  await testUpdateEntCarePlan(entId);
  
  // Additional features
  await testPatientSpecificQueries();
  await testBreastfeedingLog(obsId);
  await testPaginationAndFiltering();
  
  // Test summary
  console.log('\n📊 Test Results Summary');
  console.log('========================');
  console.log(`Total Tests: ${testResults.total}`);
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`📈 Success Rate: ${((testResults.passed / testResults.total) * 100).toFixed(1)}%`);
  
  if (testResults.failed === 0) {
    console.log('\n🎉 All tests passed! Your API is working perfectly.');
    console.log('🚀 Ready for frontend integration!');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the errors above.');
  }
  
  console.log('\n🔗 API Endpoints Available:');
  console.log(`- Health: ${CONFIG.BASE_URL}/health`);
  console.log(`- ENT Care Plans: ${CONFIG.BASE_URL}/ent/care-plans`);
  console.log(`- Obstetrics Care Plans: ${CONFIG.BASE_URL}/obstetrics/care-plans`);
}

// Export for use in other modules
module.exports = {
  runAllTests,
  testHealthEndpoint,
  TEST_DATA,
  CONFIG
};

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests().catch(console.error);
}
