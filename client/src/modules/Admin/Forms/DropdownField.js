import React from 'react';

const DropdownField = ({ label, name, options, valueKey, labelKey, onChange, selectedValue, required }) => {
  return (
    <div className="form-group mb-0" style={{ width: '100%' }}>
      {label && <label>{label}</label>}  {required && <span className="required">*</span>}
      <select
        className="col12input"
        name={name}
        onChange={onChange}
        value={selectedValue}
      >
        <option value="" >
          Select
        </option>
        {options.map((option, index) => (
          <option key={index} value={option[valueKey]}>
            {option[labelKey]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownField;





// import React, { useState } from 'react';
// import FileInputField from './FileInputField';
// import DropdownField from './DropdownField';

// const ExampleForm = () => {
//   const [formData, setFormData] = useState({
//     product_category: 2, // Pre-selected value for the dropdown (example)
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const adPlacementOptions = [
//     { id: 1, name: 'Top' },
//     { id: 2, name: 'Sidebar' },
//     { id: 3, name: 'Footer' },
//   ];

//   return (
//     <form>
//       <div className="form-group mb-0" style={{ width: '49%' }}>
//         <FileInputField label="Product Image" name="product_image" required={true} />
//       </div>
//       <div className="form-group mb-0" style={{ width: '48%' }}>
//         <DropdownField
//           label="Ads Placement Area"
//           name="product_category"
//           options={adPlacementOptions}
//           valueKey="id"
//           labelKey="name"
//           onChange={handleInputChange}
//           selectedValue={formData.product_category} // Pre-select the value
//         />
//       </div>
//       {/* Other form fields */}
//       <button type="submit" className="primary-btn">Submit</button>
//     </form>
//   );
// };

// export default ExampleForm;
