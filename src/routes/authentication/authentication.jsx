import SignUpForm from "../../compoentns/signup/sign-up-form";
import SignInForm from "../../compoentns/signin/sign-in-form";
import "./authentication.scss";

function Authentication() {


  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
}

export default Authentication;
