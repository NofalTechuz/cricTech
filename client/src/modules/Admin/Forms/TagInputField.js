import React from 'react';

const TagInputField = ({ label, fieldName, productCategoryData, setProductCategoryData }) => {
  const handleTagInputKeyDown = (e, type) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newValue = e.target.value.trim();
      if (newValue && !productCategoryData[type]?.includes(newValue)) {
        setProductCategoryData((prevData) => ({
          ...prevData,
          [type]: [...prevData[type], newValue], // Add the new tag/keyword to the array
        }));
        e.target.value = ''; // Clear input field
      }
    }
  };

  const handleRemoveTag = (e, type, value) => {
    e.preventDefault();
    setProductCategoryData((prevData) => ({
      ...prevData,
      [type]: prevData[type]?.filter((tag) => tag !== value), // Remove the clicked tag/keyword from the array
    }));
  };

  return (
    <div className="form-group mb-0" style={{ width: '100%' }}>
      <label>{label}</label>
      <input
        type="text"
        placeholder="Enter tags (separated by commas)"
        className="col12input"
        onKeyDown={(e) => handleTagInputKeyDown(e, fieldName)} // handle adding tags
      />
      {productCategoryData[fieldName]?.length > 0 && (
        <div className="tags-container">
          {productCategoryData[fieldName]?.map((tag, index) => (
            <span
              key={index}
              className="tag-block"
              onClick={(e) => handleRemoveTag(e, fieldName, tag)} // handle removing tags
            >
              {tag} <i className="fa-solid fa-xmark"></i>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInputField;
