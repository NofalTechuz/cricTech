// middlewares/apiKeyMiddleware.js
const config = require('../config/config');

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers['blogweb-api-key'];
  
  if (apiKey !== config.API_KEY) {
    return res.sendError('No Access Provided', 'ERROR', 401);
  }

  next();
};

module.exports = apiKeyMiddleware;
