# Database Connection Testing

This directory contains scripts to test and verify your database connection.

## Testing Your MongoDB Connection

### Prerequisites
- Node.js installed on your system
- Access to the MongoDB database (credentials in `.env` file)

### Step-by-Step Instructions

1. **Ensure your environment variables are set up correctly**

   Make sure your `.env` file at the root of the project contains the MongoDB connection string:
   ```
   MONGODB_URI='your_mongodb_connection_string'
   ```

2. **Run the database connection test script**

   From the root directory of the project, run one of these commands:

   Using npm script (recommended):
   ```bash
   npm run test-db
   ```

   Or directly with Node:
   ```bash
   node scripts/test-db-connection.js
   ```

3. **Interpret the results**

   - **Success**: If the connection is successful, you'll see:
     ```
     ✅ Database connection successful!
     Database URI: mongodb+srv://***:***@your-cluster-info
     Environment: development
     Database connection closed
     ```

   - **Failure**: If the connection fails, you'll see an error message with details about what went wrong.

### Common Issues and Solutions

1. **Connection Timeout**
   - **Problem**: The script times out after 10 seconds
   - **Solution**: Check your network connection and MongoDB Atlas status

2. **Authentication Failed**
   - **Problem**: Error message mentions authentication failure
   - **Solution**: Verify your username and password in the connection string

3. **Cannot Find Module**
   - **Problem**: Error about missing modules
   - **Solution**: Run `npm install` to install all dependencies

4. **MongoDB URI Not Set**
   - **Problem**: Error about missing MongoDB URI
   - **Solution**: Check that your `.env` file exists and contains the MONGODB_URI variable

## Troubleshooting

If you continue to experience issues:

1. Verify that MongoDB Atlas (or your MongoDB provider) is operational
2. Check that your IP address is whitelisted in MongoDB Atlas
3. Ensure your database user has the correct permissions
4. Try connecting with MongoDB Compass using the same connection string

For further assistance, please contact the development team.
