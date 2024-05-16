import SigninForm from "../features/authentication/signin/SigninForm";
import Header from "../ui/Header";

function Signin() {
  return (
    <main>
      <Header />
      <div className="main">
        <div className="signin-container">
          <div className="signin-left"></div>
          <div className="signin-right">
            <div className="form-div">
              <SigninForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signin;
