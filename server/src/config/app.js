require('dotenv').config({ path: '../../.env' });

module.exports = {
  appName: process.env.APP_NAME,
  port: process.env.SERVER_PORT || 4000,
  logging: { debugSQL: !!process.env.DEBUG_SQL || false },
  enableLogging: !!process.env.ENABLE_LOGGING || false,
  allowedHosts: process.env.ALLOWED_HOSTS,
  slackWebHook: process.env.SLACK_WEBHOOK || null,
  reactAppUrl: process.env.REACT_APP_URL || "http://localhost:3000",


  // Email Configuration
  email: {
    service: process.env.EMAIL_SERVICE || 'gmail',
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  getBaseUrlFromUrl: (url = '') => {
    const pathArray = url.split('/');
    const protocol = pathArray[0];
    const host = pathArray[2];
    return `${protocol}//${host}`;
  },

  dateFormat: 'YYYY-MM-DD',
};
