import SigninForm from "../features/authentication/signin/SigninForm";

function Signin() {
  return (
    <div className="signin-container">
      <div className="signin-left"></div>
      <div className="signin-right">
        <div className="form-div">
          <SigninForm />
        </div>
      </div>
    </div>
  );
}

export default Signin;
