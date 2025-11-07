import dotenv from 'dotenv';
import { connectToDatabase } from '../database/mongoose';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

async function testDatabaseConnection() {
  console.log('Testing database connection...');

  // Set a timeout for the connection attempt
  const connectionTimeout = setTimeout(() => {
    console.error('❌ Database connection timed out after 10 seconds');
    console.error('Please check your MongoDB URI and network connection');
    process.exit(1);
  }, 10000);

  try {
    // Attempt to connect to the database
    await connectToDatabase();

    // Clear the timeout since connection was successful
    clearTimeout(connectionTimeout);

    console.log('✅ Database connection successful!');

    // Display connection information
    console.log(`Database URI: ${process.env.MONGODB_URI?.replace(/\/\/(.+?):(.+?)@/, '//***:***@')}`);
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
