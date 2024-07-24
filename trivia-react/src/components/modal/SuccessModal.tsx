import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "bootstrap/dist/css/bootstrap.min.css";
import "./SuccessModal.css";

type ModalProps = {
  isVisible: boolean;
  message: string;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ isVisible, message, onClose }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClose = () => {
    onClose();
    navigate("/"); // Navigate to the home page
  };

  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="modal-dialog modal-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Congratulations!</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label="Close"
            >
              x
            </button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-nav btn-prev"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
