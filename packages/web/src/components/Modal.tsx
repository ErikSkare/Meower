import React from "react";
import ReactModal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 1000,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    borderRadius: 8,
    padding: "40px 40px 40px 40px",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    border: "none",
    maxHeight: "80vh",
    width: "90%",
    maxWidth: 550,
  },
};

type ModalProps = {
  isOpen: boolean;
  setIsOpen: Function;
};

const Modal: React.FC<ModalProps> = ({isOpen, setIsOpen, children}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
