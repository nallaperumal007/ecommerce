// Define a custom error handler class that extends the built-in Error class
class ErrorHandler extends Error {
    // Constructor function that takes a message and a statusCode as parameters
    constructor(message, statusCode) {
        // Call the constructor of the parent class (Error) with the provided message
        super(message);

        // Attach the statusCode property to the instance of the error
        this.statusCode = statusCode;

        // Capture the stack trace for better error reporting
        Error.captureStackTrace(this, this.constructor);
    }
}

// Export the ErrorHandler class to make it accessible in other modules
module.exports = ErrorHandler;

