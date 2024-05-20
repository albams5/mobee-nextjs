"use client";
import "./formModal.css";

export const FormModal = ({ onClose, children }: any) => {
  return (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-content">{children}</div>
        </div>
      </div>
  );
};
