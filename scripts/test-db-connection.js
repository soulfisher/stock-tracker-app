// Import required packages
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// Get MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

async function testDatabaseConnection() {
  console.log('Testing database connection...');
  
  if (!MONGODB_URI) {
    console.error('❌ MongoDB URI is not set in .env file');
    process.exit(1);
  }
  
  // Set a timeout for the connection attempt
  const connectionTimeout = setTimeout(() => {
    console.error('❌ Database connection timed out after 10 seconds');
    console.error('Please check your MongoDB URI and network connection');
    process.exit(1);
  }, 10000);
  
  try {
    // Attempt to connect to the database
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, { bufferCommands: false });
    
    // Clear the timeout since connection was successful
    clearTimeout(connectionTimeout);
    
    console.log('✅ Database connection successful!');
    
    // Display connection information (with credentials masked)
    console.log(`Database URI: ${MONGODB_URI.replace(/\/\/(.+?):(.+?)@/, '//***:***@')}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    
    // Exit successfully
    process.exit(0);
  } catch (error) {
    // Clear the timeout since we already have an error
    clearTimeout(connectionTimeout);
    
    console.error('❌ Database connection failed!');
    console.error('Error details:', error);
    
    // Exit with error
    process.exit(1);
  }
}

// Run the test
testDatabaseConnection();