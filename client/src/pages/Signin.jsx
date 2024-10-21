import { useState } from "react";
import SigninForm from "../features/authentication/signin/SigninForm";
import Header from "../ui/Header";
import Modal from "../ui/Modal";
import ModalSelectRole from "../features/authentication/signin/ModalSelectRole";
import ResetPasswordConfirmForm from "../ui/ResetPasswordConfirmForm";
// import ResetPasswordForm from "../ui/ResetPasswordForm";
// import ResetPasswordConfirmForm from "../ui/ResetPasswordConfirmForm";

function Signin() {
  const [showModal, setShowModal] = useState("");
  const [resetPassword, setResetPassword] = useState("");

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
              {!resetPassword && (
                <SigninForm
                  setShowModal={setShowModal}
                  setResetPassword={setResetPassword}
                />
              )}
              {resetPassword && (
                <ResetPasswordConfirmForm
                  setShowModal={setShowModal}
                  setResetPassword={setResetPassword}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signin;
