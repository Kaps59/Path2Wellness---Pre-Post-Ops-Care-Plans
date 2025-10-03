// Quick test to verify the backend API is working
const http = require('http');

function testHealthEndpoint() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/health',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve({ status: res.statusCode, data: response });
        } catch (error) {
          reject(new Error('Invalid JSON response'));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

async function runQuickTest() {
  console.log('🔍 Quick Backend Test Starting...\n');
  
  try {
    console.log('Testing health endpoint...');
    const result = await testHealthEndpoint();
    
    if (result.status === 200) {
      console.log('✅ Backend is running successfully!');
      console.log('📊 Response:', result.data.message);
      console.log('⏰ Timestamp:', result.data.timestamp);
      console.log('\n🎉 Your Path2Wellness backend is ready!');
      console.log('\n📋 Next steps:');
      console.log('1. Use Postman or similar tool to test CRUD operations');
      console.log('2. Test with the PowerShell script: ./test-api.ps1');
      console.log('3. Start building your frontend');
      console.log('\n🔗 Available endpoints:');
      console.log('- Health: GET http://localhost:5000/api/health');
      console.log('- ENT Care Plans: http://localhost:5000/api/ent/care-plans');
      console.log('- Obstetrics Care Plans: http://localhost:5000/api/obstetrics/care-plans');
    } else {
      console.log('❌ Unexpected status code:', result.status);
    }
  } catch (error) {
    console.log('❌ Backend test failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Troubleshooting:');
      console.log('1. Make sure the server is running: npm run dev');
      console.log('2. Check if port 5000 is available');
      console.log('3. Verify the server started without errors');
    }
  }
}

runQuickTest();
