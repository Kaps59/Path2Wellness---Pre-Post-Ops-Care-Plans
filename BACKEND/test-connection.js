const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('🔄 Testing MongoDB Atlas connection...');
    console.log('Connection string:', process.env.MONGODB_URI.replace(/:[^:@]*@/, ':****@'));
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    console.log('📊 Database name:', mongoose.connection.db.databaseName);
    console.log('🌐 Connection state:', mongoose.connection.readyState);
    
    // Test creating a simple document
    const testSchema = new mongoose.Schema({
      message: String,
      timestamp: { type: Date, default: Date.now }
    });
    
    const TestModel = mongoose.model('ConnectionTest', testSchema);
    
    const testDoc = new TestModel({
      message: 'Backend connection test successful'
    });
    
    await testDoc.save();
    console.log('✅ Test document created successfully!');
    
    // Clean up test document
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log('🧹 Test document cleaned up');
    
    await mongoose.connection.close();
    console.log('🔐 Connection closed successfully');
    
    console.log('\n🎉 All connection tests passed!');
    console.log('✨ Your backend is ready to use with MongoDB Atlas');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.log('\n💡 Troubleshooting tips:');
      console.log('1. Check if username/password are correct in the connection string');
      console.log('2. Ensure the user has proper database permissions');
      console.log('3. Verify the cluster is running and accessible');
    }
    
    if (error.message.includes('network')) {
      console.log('\n💡 Network troubleshooting:');
      console.log('1. Check your internet connection');
      console.log('2. Verify MongoDB Atlas cluster is accessible');
      console.log('3. Check if your IP is whitelisted in MongoDB Atlas');
    }
    
    process.exit(1);
  }
}

testConnection();
