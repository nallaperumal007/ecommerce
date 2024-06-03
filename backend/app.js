// Importing the Express framework
const express = require('express');

// Creating an instance of the Express application
const app = express();

// Importing custom error handling middleware
const errorMiddleware = require('./middlewares/error');

// Importing the cookie-parser middleware for handling cookies
const cookieParser = require('cookie-parser');

// Importing the path module for working with file and directory paths
const path = require('path');

// Importing dotenv for environment variable configuration
const dotenv = require('dotenv');

// Configuring environment variables from the config file
dotenv.config({ path: path.join(__dirname, "config/config.env") });

// Middleware for parsing JSON requests
app.use(express.json());

// Middleware for parsing cookies
app.use(cookieParser());

// Serving static files from the '/uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Importing route handlers for different functionalities
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment');

// Mounting route handlers at specific paths
app.use('/api/v1/', products);
app.use('/api/v1/', auth);
app.use('/api/v1/', order);
app.use('/api/v1/', payment);

// Configuring the server to serve static files in production
if (process.env.NODE_ENV === "production") {
    // Serving static files from the build directory
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    
    // Handling any other route by serving the index.html file in production
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
    });
}

// Using the custom error handling middleware
app.use(errorMiddleware);

// Exporting the configured Express app for use in other modules
module.exports = app;
