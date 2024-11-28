import React from 'react';

const NumberInputField = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  required = false,
  min,
  max
}) => {
  return (
    <div className="form-group mb-0" style={{ width: '100%' }}>
      {label && (
        <label>
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <input
        type="number" // Always number input type
        placeholder={placeholder}
        className="col12input"
        name={name}
        value={value || ""}
        onChange={onChange}
        min={min}  // Min value if provided
        max={max}  // Max value if provided
      />
    </div>
  );
};

export default NumberInputField;









// import React, { useState } from 'react';
// import NumberInputField from './NumberInputField';

// const ExampleForm = () => {
//   const [formData, setFormData] = useState({
//     discount_percentage: '', // Initial value for the number field
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//     <form>
//       {/* Number Input with min and max */}
//       <div className="form-group mb-0" style={{ width: '49%' }}>
//         <NumberInputField
//           label="Discount Percentage"
//           name="discount_percentage"
//           placeholder="Enter Discount Percentage"
//           value={formData.discount_percentage}
//           onChange={handleInputChange}
//           required={true}
//           min={0}  // Min value is 0
//           max={100}  // Max value is 100
//         />
//       </div>

//       {/* Submit Button */}
//       <button type="submit" className="primary-btn">Submit</button>
//     </form>
//   );
// };

// export default ExampleForm;
