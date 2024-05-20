"use client";
import "./formModal.css";

export const FormModal = ({ children }: any) => {
  return (
        <div className="modal">
          <div className="modal-content">{children}</div>
        </div>
  );
};
