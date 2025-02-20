import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useResetPasswordConfirm from "../features/authentication/signin/useResetPasswordConfirm";
import { useQueryClient } from "@tanstack/react-query";

function ResetPasswordConfirmForm({ setShowModal, setResetPassword }) {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const { resetPasswordConfirm, isPending } = useResetPasswordConfirm();
  const mailRequested = queryClient.getQueryData(["mail-requested"]) || false;

  useEffect(() => {
    // Load saved email and password if "Remember me" was checked
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) {
      return toast.error("Email must not be empty");
    }
    resetPasswordConfirm({ mail: email.toLowerCase() });
  }

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <span className="form-heading" style={{ position: "relative" }}>
        <button
          className="btn-back"
          style={{ left: "-15px", top: "-50px" }}
          onClick={(e) => {
            e.preventDefault();
            //If it is required to actually, reset the password sent everytime here,
            // set mailRequested to false
            setResetPassword("");
          }}
        >
          &larr;
        </button>
        Confirm Password Reset
      </span>
      {!mailRequested && (
        <>
          <div className="form-field">
            <label htmlFor="login" className="form-label">
              Enter Email
            </label>
            <input
              className="form-input"
              type="email"
              placeholder="Email address"
              id="login"
              name="login"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary">
            {isPending ? "Requesting..." : "Request"}
          </button>
        </>
      )}

      {mailRequested && (
        <div className="form-field view-report">
          Open up your mail to reset your password.
        </div>
      )}
    </form>
  );
}

export default ResetPasswordConfirmForm;
