import React, { useState, useEffect } from 'react';

const FileInputField = ({
  label,
  required,
  name,
  onFileChange,
  initialFileName = '',
  initialImageSrc = 'https://via.placeholder.com/150',
}) => {
  const [imageSrc, setImageSrc] = useState(initialImageSrc);
  const [fileName, setFileName] = useState(initialFileName);

  // Reset component state when initial values change (useful for editing)
  useEffect(() => {
    setImageSrc(initialImageSrc);
    setFileName(initialFileName);
  }, [initialFileName, initialImageSrc]);

  const handleButtonClick = () => {
    document.getElementById(`${name}-fileInput`).click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);

      if (onFileChange) {
        onFileChange(file); // Notify parent component
      }
    }
  };


  return (
    <div
      className="flex-row"
      style={{
        width: '100%',
        border: 'none',
        alignItems: 'end',
        gap: '20px',
        justifyContent: 'normal',
        padding: '0 0 10px 0',
      }}
    >
      <div className="form-group mb-0" style={{ width: '90%' }}>
        <label>
          {label} {required && <span className="required">*</span>}
        </label>
        <input
          type="text"
          placeholder=""
          className="col12input"
          value={fileName}
          readOnly
        />
      </div>

      <button
        className="primary-btn module-btn"
        type="button"
        onClick={handleButtonClick}
      >
        Browse
      </button>

      <input
        id={`${name}-fileInput`}
        type="file"
        style={{ display: 'none' }}
        name={name} // Dynamic name here
        accept="image/*"
        onChange={handleFileChange}
      />

      <div>
        <img
          src={imageSrc}
          style={{ width: '67px', maxHeight: '67px' }}
          alt="Selected Icon"
        />
      </div>
    </div>
  );
};

export default FileInputField;



















// import React, { useState } from 'react';
// import FileInputField from './FileInputField';

// const ExampleForm = () => {
//   const [formData, setFormData] = useState({
//     product_image: null, // Stores the selected file
//     fileName: '', // For edit mode
//     imageSrc: 'https://via.placeholder.com/150', // For edit mode
//   });

//   const handleFileChange = (file) => {
//     setFormData({ ...formData, product_image: file });
//   };

//   const handleSubmit = () => {
//     console.log('Submitted Data:', formData);
//     // Simulate reset after submission
//     setFormData({
//       product_image: null,
//       fileName: '',
//       imageSrc: 'https://via.placeholder.com/150',
//     });
//   };

//   return (
//     <form>
//       {/* Example of using FileInputField in edit mode */}
//       <FileInputField
//         label="Product Image"
//         name="product_image"
//         required={true}
//         onFileChange={handleFileChange}
//         initialFileName={formData.fileName} // Pre-filled filename for edit
//         initialImageSrc={formData.imageSrc} // Pre-filled image for edit
//       />

//       <button type="button" className="primary-btn" onClick={handleSubmit}>
//         Submit
//       </button>
//     </form>
//   );
// };

// export default ExampleForm;
