// components/Model.jsx
import React, { useEffect, useRef } from "react";

function Model({ isOpen, onClose, onConfirm, title = "Confirm Action", children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className="modal" onCancel={onClose} onClose={onClose}>
      <div className="modal-content">
        <span className="modal-icon">VOID</span>
        <h2>{title}</h2>
        <div className="modal-body">{children}</div>

        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button
            className="delete-btn"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
           Delete
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default Model;