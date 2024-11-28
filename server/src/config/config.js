module.exports = {
    jwtSecret: process.env.TOKEN_SECRET_KEY || 'secret key for TarjCars', 
    jwtExpiry: process.env.TOKEN_EXPIRY ||'7d', 
    saltRounds: process.env.JWT_SALT_ROUND || 10,
    API_KEY: process.env.API_KEY || '@ProtectedAPIsByTajTravels@',
  };
  



