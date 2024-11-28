const loggingConfig = require('../config/loggingConfig'); 

const ErrorMiddleware = (req, res, next) => {

  res.withData = (data, status = 'SUCCESS', statusCode = 200) => {
    res.status(statusCode).json({
      data,
      status,
      statusCode
    });
  };

  res.withError = (error) => {
    const statusCode = error.statusCode || 500;
    const isDevelopment = process.env.NODE_ENV === 'development';
    const response = {
      status: 'error',
      message: isDevelopment ? error.message || 'An error occurred' : 'Something went wrong!',
      statusCode
    };

    if (isDevelopment) {
      response.error = {
        message: error.message || 'An error occurred',
        stack: error.stack,
        statusCode
      };
    }

    // Log the error to the log file
    loggingConfig(error, statusCode);

    res.status(statusCode).json(response);
  };

  res.sendError = (message, status, statusCode = 500) => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const response = {
      message: isDevelopment ? message : 'Something went wrong!',
      status,
      statusCode
    };

    if (isDevelopment) {
      response.error = {
        message,
        status,
        statusCode
      };
    }

    // Log the error to the log file
    const error = new Error(message);
    loggingConfig(error, statusCode);

    res.status(statusCode).json(response);
  };

  next();
};

module.exports = {
  ErrorMiddleware
};
