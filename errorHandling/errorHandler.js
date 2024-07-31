const errorHandler = (err, req, res, next) => {
    console.log('Error Handler')
    console.log(err.message)

    res.status(res.errorStatus || 500).json({
        message: res.errorMessage || 'default error message',
        error: true
    })
}

// When dealing with async errors, we can use the asyncHandler middleware to catch the errors.
// We need to use this because at this point in time, express does not handle async errors.
// For example, if I have an async function that throws an error, express will not catch it.
// This will change in the future, but in the meantime, we can use the asyncHandler middleware.

// after I install express-async-errors, I can use the asyncHandler middleware to catch async errors.
// They will automatically be passed to our error handling middleware.

module.exports = errorHandler;