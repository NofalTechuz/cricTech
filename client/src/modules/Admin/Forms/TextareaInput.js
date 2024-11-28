import React, { useState, useEffect } from 'react';

const TextareaInput = ({
  label,
  name,
  value = '',
  rows = 10,
  placeholder = '',
  required = false,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(value);

  // Update inputValue if the value prop changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(event); // Pass the change event to the parent
    }
  };

  return (
    <div className="form-group">
      <label>
        {label} {required && <span className="required">*</span>}
      </label>
      <textarea
        name={name}
        placeholder={placeholder}
        className="col12input"
        rows={rows}
        value={inputValue}
        required={required}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextareaInput;
















// import React, { useState } from 'react';
// import TextareaInput from './TextareaInput';

// const ExampleForm = () => {
//   const [productCategoryData, setProductCategoryData] = useState({
//     product_desc: 'This is the existing product description.', // Example existing description
//   });

//   const handleDescriptionChange = (e) => {
//     const { name, value } = e.target;
//     setProductCategoryData((prevData) => ({
//       ...prevData,
//       [name]: value, // Update the product description
//     }));
//   };

//   return (
//     <form>
//       <TextareaInput
//         label="Long Description"
//         name="product_desc"
//         value={productCategoryData.product_desc} // Pass the existing value to the textarea
//         placeholder="Enter a long description"
//         rows={10}
//         required={true}
//         onChange={handleDescriptionChange} // Handle the change in description
//       />

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default ExampleForm;
