import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useResetPassword from "../features/authentication/signin/useResetPassword";

function ResetPasswordForm({ token }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, isPending } = useResetPassword();

  useEffect(() => {
    // Load saved email if "Remember me" was checked
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      return toast.error("Fields must not be empty");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    resetPassword(
      { email, password, token },
      {
        onSuccess: () => {
          toast.success("Password reset successful");
          navigate("/signin");
        },
        onError: () => {
          toast.error("Error resetting password");
        },
      }
    );
  }

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <span className="form-heading">Reset Your Password</span>
      <div className="form-field">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          className="form-input"
          type="email"
          placeholder="Email address"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor="password" className="form-label">
          New Password
        </label>
        <input
          className="form-input"
          type="password"
          placeholder="Enter new password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor="confirm-password" className="form-label">
          Confirm Password
        </label>
        <input
          className="form-input"
          type="password"
          placeholder="Confirm new password"
          id="confirm-password"
          name="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button type="submit" className="btn-primary">
        {isPending ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
}

export default ResetPasswordForm;
