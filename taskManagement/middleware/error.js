const errorHandler = (err, req, res, next) => {
    console.log(err.errCode); // error details
    res.status(err.errCode || 500).send({
      success: false,
      error: err.message,
    });
  };
  
  module.exports = errorHandler;
  