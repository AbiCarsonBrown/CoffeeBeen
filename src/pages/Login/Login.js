import "./Login.scss";
import { useState } from "react";
import LoginEl from "../../components/LoginEl/LoginEl";
import { logIn, signUp } from "../../utils/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [signUp, setSignUp] = useState(false);
  const navigate = useNavigate();

  const noFormErrors = {
    name: false,
    username: false,
    email: false,
    password: false,
    confirm_password: false,
  };

  const [logInFormErrors, setLogInFormErrors] = useState(noFormErrors);
  const [signUpFormErrors, setSignUpFormErrors] = useState(noFormErrors);

  const handleLogIn = async (event) => {
    event.preventDefault();
    let formIsValid = true;
    const isFormErrors = { ...noFormErrors };
    const data = event.target;

    if (!data.email.value) {
      formIsValid = false;
      isFormErrors.email = true;
    }
    if (!data.password.value) {
      formIsValid = false;
      isFormErrors.password = true;
    }
    if (!formIsValid) {
      return setLogInFormErrors(isFormErrors);
    }

    const user = {
      email: data.email.value,
      password: data.password.value,
    };

    try {
      const response = await logIn(user);
      localStorage.setItem("token", response.data.token);
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (error) {
      console.error(error);
    }

    console.log(user);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    const data = event.target;

    const newUser = {
      full_name: data.name.value,
      username: data.username.value,
      email: data.email.value,
      password: data.password.value,
    };

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
            formErrors={logInFormErrors}
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
