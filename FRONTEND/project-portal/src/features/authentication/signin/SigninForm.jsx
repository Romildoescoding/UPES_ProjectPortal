import { useState } from "react";
import useSignin from "./useSignin";

function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin, isLoading } = useSignin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    signin({ email, password });
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

      <div className="checkbox-div">
        {/* <div className="checkbox">
          <input type="checkbox" id="remember-me" name="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div> */}
        {/*  */}
        <div className="checkbox-wrapper-17 checkbox-div">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me"></label>
          <span className="form-label-small">Remember me</span>
        </div>
        {/*  */}
        <span className="form-label-small color-blue">Forgot Password?</span>
      </div>
      <button type="submit" className="btn-primary">
        Sign in
      </button>
    </form>
  );
}

export default SigninForm;
