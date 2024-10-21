import { useState } from "react";
import SigninForm from "../features/authentication/signin/SigninForm";
import Header from "../ui/Header";
import Modal from "../ui/Modal";
import ModalSelectRole from "../features/authentication/signin/ModalSelectRole";
import ResetPasswordForm from "../ui/ResetPasswordForm";
import { useParams } from "react-router-dom";

function PasswordReset() {
  const [showModal, setShowModal] = useState("");
  //   http://${process.env.PROJECT_URL}/reset-password/${token}`;
  const { token } = useParams();
  console.log(token);

  return (
    <main>
      <Header />
      <div className="main">
        <div className="signin-container">
          <div className="signin-left"></div>
          <div className="signin-right">
            <div className="form-div">
              <ResetPasswordForm token={token} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PasswordReset;
