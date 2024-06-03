// Importing the Express application from the app.js file
const app = require('./app');

// Importing the path module for working with file and directory paths
const path = require('path');

// Importing the connectDatabase function from the database.js file in the config directory
const connectDatabase = require('./config/database');

// Calling the connectDatabase function to establish a connection to the database
connectDatabase();

// Starting the Express app and making it listen on the specified port from the environment variables
const server = app.listen(process.env.PORT, () => {
    console.log(`My Server listening to the port: ${process.env.PORT} in  ${process.env.NODE_ENV} `);
});

// Handling unhandled promise rejections
process.on('unhandledRejection', (err) => {
    // Logging the error message
    console.log(`Error: ${err.message}`);
    // Logging a message indicating the server is shutting down due to an unhandled rejection error
    console.log('Shutting down the server due to unhandled rejection error');
    // Gracefully closing the server and exiting the process with code 1
    server.close(() => {
        process.exit(1);
    });
});

// Handling uncaught exceptions
process.on('uncaughtException', (err) => {
    // Logging the error message
    console.log(`Error: ${err.message}`);
    // Logging a message indicating the server is shutting down due to an uncaught exception error
    console.log('Shutting down the server due to uncaught exception error');
    // Gracefully closing the server and exiting the process with code 1
    server.close(() => {
        process.exit(1);
    });
});
