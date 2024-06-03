
// Exporting a higher-order function that wraps an asynchronous function
module.exports = func => (req, res, next) =>
    // Wrapping the execution of the provided asynchronous function in a Promise
    Promise.resolve(func(req, res, next))
        // Catching any errors that occur during the execution of the asynchronous function
        .catch(next);
