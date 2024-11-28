function setUploadFolder(folderName) {
    return (req, res, next) => {
      req.folderName = folderName; // Set folder name dynamically
      next();
    };
  }
  
  module.exports = setUploadFolder;
  