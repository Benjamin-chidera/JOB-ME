"use client";
import React from "react";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <main>
      {isOpen && (
        <dialog
          id="my_modal_2"
          className="modal bg-[#000] overflow-hidden"
          open
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Thank you for contacting JOBME 😁
            </h3>
            <p className="py-4">Your message has been sent successfully!</p>
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </dialog>
      )}
    </main>
  );
};
