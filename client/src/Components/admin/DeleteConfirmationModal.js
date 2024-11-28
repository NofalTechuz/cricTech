import React, { useState } from 'react';
import { toast } from 'react-toastify';
import "../../assets/css/admin/model.css"
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, warnMsg }) => {
  const [captcha, setCaptcha] = useState(Math.floor(1000 + Math.random() * 9000));
  const [inputCaptcha, setInputCaptcha] = useState('');

  const handleCaptchaInput = (e) => {
    setInputCaptcha(e.target.value);
  };

  const handleConfirm = () => {
    if (parseInt(inputCaptcha, 10) === captcha) {
      onConfirm();
      onClose();
      regenerateCaptcha();
    } else {
      toast.error('Incorrect CAPTCHA. Please try again.');
    }
  };

  const regenerateCaptcha = () => {
    setCaptcha(Math.floor(1000 + Math.random() * 9000));
    setInputCaptcha('');
  };

 
  return isOpen ? (
    <div className="modal">
      <div className="modal-container" style={{ width: '30%' }}>
        <h5>Confirm Delete</h5>
        <p dangerouslySetInnerHTML={{ __html: warnMsg }}>
        </p>
        <div className="captcha-container">
          <div>
            <span className="captcha">{captcha}</span>
            <button onClick={regenerateCaptcha} className="captcha-regenerate-btn">
              🔄
            </button>
          </div>
        </div>
        <input
          type="text"
          placeholder="Enter CAPTCHA"
          value={inputCaptcha}
          onChange={handleCaptchaInput}
          className="col12input"
        />
        <div className="modal-actions">
          <button onClick={onClose} className="cancel-btn">Cancel</button>
          <button onClick={handleConfirm} className="confirm-btn">Confirm</button>
        </div>
      </div>
    </div>
  ) : null;
};

export default DeleteConfirmationModal;
