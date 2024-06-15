import { useState } from "react";
import SigninForm from "../features/authentication/signin/SigninForm";
import Header from "../ui/Header";
import Modal from "../ui/Modal";
import ModalSelectRole from "../features/authentication/signin/ModalSelectRole";

function Signin() {
  const [showModal, setShowModal] = useState("");

  return (
    <main>
      {showModal === "select-role" && (
        <Modal setShowModal={setShowModal}>
          <ModalSelectRole setShowModal={setShowModal} />
        </Modal>
      )}
      <Header />
      <div className="main">
        <div className="signin-container">
          <div className="signin-left"></div>
          <div className="signin-right">
            <div className="form-div">
              <SigninForm setShowModal={setShowModal} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signin;
