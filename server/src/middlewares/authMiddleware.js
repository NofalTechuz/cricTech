// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { validateJwt } = require('../tokens/jwt/index');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.sendError('No Token Provided', 'ERROR', 401);
  }

  // Extract the token
  const token = authHeader.split(' ')[1];

  // Validate the token
  const user = validateJwt(token);
  if (!user) {
    return res.sendError('Invalid token', 'ERROR', 403);
  }

  req.admin = user;
  next();
};

module.exports = authMiddleware;
