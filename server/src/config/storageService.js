const fs = require('fs');
const path = require('path');

// Base directory where files are stored
const BASE_DIR = path.join(__dirname, '../uploads');

// Function to delete a single file
function deleteLocalFile(fileName) {
  try {
    // Construct the full file path
    const filePath = path.join(BASE_DIR, fileName);

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Delete the file
      fs.unlinkSync(filePath);
      console.warn(`File deleted: ${filePath}`);
      return `File deleted: ${filePath}`;
    } else {
      console.warn(`File not found: ${filePath}`);
      return `File not found: ${filePath}`;
    }
  } catch (err) {
    console.error(`Error deleting file: ${fileName}, Error: ${err.message}`);
    throw new Error(`Failed to delete file: ${fileName}`);
  }
}

// Function to delete multiple files
function deleteMultipleLocalFiles(files) {
  try {
    const results = files.map((file) => deleteLocalFile(file));
    return results; // Returns an array of messages for each file
  } catch (err) {
    console.error(`Error deleting multiple files: ${err.message}`);
    throw new Error('Failed to delete multiple files');
  }
}

module.exports = {
  deleteLocalFile,
  deleteMultipleLocalFiles,
};

// // Usages
// const { deleteLocalFile, deleteMultipleLocalFiles } = require('./storageService');

// try {
//   const result = deleteLocalFile('foldername/file1.txt');

// const filesToDelete = [
//     'image1.jpg',        // File in the root of the uploads directory
//     'docs/file2.pdf',    // File inside the "docs" subdirectory
//     'videos/video3.mp4'  // File inside the "videos" subdirectory
//   ];

//   const results = deleteMultipleLocalFiles(filesToDelete);

//   console.log(result);
// } catch (error) {
//   console.error(error.message);
// }
