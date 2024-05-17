import { createPortal } from "react-dom";
import "../styles/modal.css";
import useOutsideClick from "../hooks/useOutsideClick";

function Modal({ children, setShowModal }) {
  const ref = useOutsideClick(() => setShowModal(""));
  return createPortal(
    <div className="modal-background">
      <div ref={ref}>{children}</div>
    </div>,
    document.body
  );
}

export default Modal;
