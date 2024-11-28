import React from 'react';

const TextInputField = ({ label, name, placeholder, value, onChange, required = false,  type = 'text' }) => {
  return (
    <div className="form-group mb-0" style={{ width: '100%' }}>
      {label && (
        <label>
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <input
        type={type} // Dynamic input type
        placeholder={placeholder}
        className="col12input"
        name={name}
        value={value || ""}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInputField;










// import React, { useState } from 'react';
// import TextInputField from './TextInputField';

// const ExampleForm = () => {
//   const [formData, setFormData] = useState({
//     with_discount_price: '', // Initial value for the field
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//     <form>
//       <div className="form-group mb-0" style={{ width: '49%' }}>
//         <TextInputField
//           label="With Discount Price"
//           name="with_discount_price"
//           placeholder="Enter With Discount Price"
//           value={formData.with_discount_price}
//           onChange={handleInputChange}
//           required={true} // Make the field required
//         />
//       </div>
//       {/* Other form fields */}
//       <button type="submit" className="primary-btn">Submit</button>
//     </form>
//   );
// };

// export default ExampleForm;
