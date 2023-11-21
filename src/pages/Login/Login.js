import "./Login.scss";
import { useState } from "react";
import LoginEl from "../../components/LoginEl/LoginEl";

export default function Login() {
  const [signUp, setSignUp] = useState(false);

  const handleLogIn = (event) => {
    event.preventDefault();
    console.log("Logged In");
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    console.log("Signed Up");
  };

  return (
    <main className="sign-in">
      <div className="sign-in__wrapper">
        <div className="sign-in__buttons">
          <button
            onClick={() => setSignUp(false)}
            className={`sign-in__button ${
              signUp ? "sign-in__button--deselect" : ""
            }`}>
            Log In
          </button>
          <button
            onClick={() => setSignUp(true)}
            className={`sign-in__button ${
              !signUp ? "sign-in__button--deselect" : ""
            }`}>
            Sign Up
          </button>
        </div>
        {!signUp && (
          <LoginEl
            title="Log In to Your Account"
            signUp={false}
            clickHandler={handleLogIn}
          />
        )}
        {signUp && (
          <LoginEl
            title="Sign Up for a Free Account"
            signUp={true}
            clickHandler={handleSignUp}
          />
        )}
      </div>
    </main>
  );
}
