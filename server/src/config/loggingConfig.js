const fs = require('fs');
const path = require('path');
require('dotenv').config();

const loggingConfig = (error, statusCode) => {
  if (process.env.ENABLE_LOGGING === 'true') {
    const logFilePath = path.join(__dirname, '../../error.log');
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - Status: ${statusCode} - Error: ${JSON.stringify(error.message, null, 2)}\nStack: ${error.stack}\n\n`;

    fs.appendFile(logFilePath, logMessage, (err) => {
      if (err) {
        console.error('Failed to write to log file:', err);
      }
    });
  }
};

module.exports = loggingConfig;
