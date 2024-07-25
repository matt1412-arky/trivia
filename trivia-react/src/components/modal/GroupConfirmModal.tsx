import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./GroupConfirmModal.css";

type GroupConfirmModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  selectedGroup: number;
};

const GroupConfirmModal: React.FC<GroupConfirmModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  selectedGroup,
}) => {
  return (
    <Modal
      show={isOpen}
      onHide={onCancel}
      centered
      dialogClassName="custom-modal"
    >
      <Modal.Header>
        <Modal.Title>Confirm Group Selection</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <p className="mb-0">
          Are you sure you want to select group <strong>{selectedGroup}</strong>
          ?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onCancel}
          className="btn-nav btn-prev"
        >
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm} className="btn-nav">
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GroupConfirmModal;
