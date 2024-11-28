const generateRandomString = (len, onlyCapital) => {
    const length = len || 12;
    let str = '';
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    if (onlyCapital) {
      chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    }
    for (let i = 1; i <= length; i++) {
      const c = Math.floor(Math.random() * chars.length);
      str += chars.charAt(c).toString();
    }
    return str;
  };
  
  const generateRandomNumber = (length = 6) => {
    let str = '';
    const chars = '0123456789';
    for (let i = 1; i <= length; i++) {
      const c = Math.floor(Math.random() * chars.length);
      str += chars.charAt(c).toString();
    }
    return str;
  };
  
  module.exports = {
    generateRandomString,
    generateRandomNumber,
  };
  