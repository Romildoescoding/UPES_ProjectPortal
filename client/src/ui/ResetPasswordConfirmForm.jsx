import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useResetPasswordConfirm from "../features/authentication/signin/useResetPasswordConfirm";
import { useQueryClient } from "@tanstack/react-query";

function ResetPasswordConfirmForm({ setShowModal }) {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  //   const navigate = useNavigate();
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
    resetPasswordConfirm({ mail: email });
  }

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <span className="form-heading">Confirm Password Reset</span>
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
