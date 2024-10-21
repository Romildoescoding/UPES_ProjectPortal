import { useEffect, useState } from "react";
import useSignin from "./useSignin";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function SigninForm({ setShowModal, setResetPassword }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { signin, isLoading } = useSignin();
  const navigate = useNavigate();

  useEffect(() => {
    // Load saved email and password if "Remember me" was checked
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true); // Set the checkbox to true
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Fields must not be empty");
    }

    // Store email and password in localStorage if "Remember me" is checked
    if (rememberMe) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    } else {
      // Clear localStorage if "Remember me" is unchecked
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }

    signin(
      { email, password },
      {
        onSuccess: (user) => {
          toast.success("Login Successful");
          if (user.data.role === "student") {
            navigate("/student");
          }
          if (user.data.role === "faculty") {
            console.log("ROLE OPENED");
            setShowModal("select-role");
          }
        },
        onError: () => {
          toast.error("Email or Password are incorrect");
        },
      }
    );
  }

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <span className="form-heading">Nice to see you again</span>
      <div className="form-field">
        <label htmlFor="login" className="form-label">
          Login
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

      <div className="form-field">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          className="form-input"
          type="password"
          placeholder="Enter password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="checkbox-div checkbox-container">
        <div className="checkbox-wrapper-17 checkbox-div">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)} // Update state
          />
          <label htmlFor="remember-me"></label>
          <span className="form-label-small">Remember me</span>
        </div>
        <span
          className="form-label-small color-blue"
          onClick={() => setResetPassword(true)}
        >
          Forgot Password?
        </span>
      </div>

      <button type="submit" className="btn-primary">
        {isLoading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}

export default SigninForm;
