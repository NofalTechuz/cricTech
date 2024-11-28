const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up storage engine with dynamic folder name
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderName = req.folderName || 'general'; // Fallback to 'general' if folderName is not set
    const uploadPath = path.join(__dirname, '../uploads', folderName);

    // Create the folder if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate a unique file name
    cb(null, file.fieldname + '-' + Math.random() + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload variable
const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // Limit file size to 100MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|pdf|mp4|avi|mkv|mov|wmv|flv|webm|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Invalid file type! Only images, videos, and PDFs are allowed.');
  }
}

module.exports = upload;
