import { createPortal } from "react-dom";
import "../styles/modal.css";
import useOutsideClick from "../hooks/useOutsideClick";

function Modal({ children, setShowModal }) {
  const ref = useOutsideClick(() => setShowModal(""));
  return createPortal(
    <div className="modal-background">
      {/* <button
        className="btn-close"
        onClick={(e) => {
          e.preventDefault();
          setShowModal("");
        }}
      >
        &times;
      </button> */}
      <div ref={ref}>{children}</div>
    </div>,
    document.body
  );
}

export default Modal;
