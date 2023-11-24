import "./Login.scss";
import { useState } from "react";
import LoginEl from "../../components/LoginEl/LoginEl";
import { logIn, register } from "../../utils/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [signUp, setSignUp] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const noFormErrors = {
    name: false,
    username: false,
    email: false,
    password: false,
    confirm_password: false,
    password_match: false,
  };

  const [formErrors, setFormErrors] = useState(noFormErrors);

  const handleLogIn = async (event) => {
    event.preventDefault();
    let formIsValid = true;
    setError(null);
    setSuccess(null);
    setFormErrors(noFormErrors);
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
      return setFormErrors(isFormErrors);
    }

    const user = {
      email: data.email.value,
      password: data.password.value,
    };

    try {
      const response = await logIn(user);
      localStorage.setItem("token", response.data.token);
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error(error);
      setError(error.response.data);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    let formIsValid = true;
    setError(null);
    setSuccess(null);
    setFormErrors(noFormErrors);
    const isFormErrors = { ...noFormErrors };
    const data = event.target;

    if (!data.name.value) {
      formIsValid = false;
      isFormErrors.name = true;
    }
    if (!data.username.value) {
      formIsValid = false;
      isFormErrors.username = true;
    }
    if (!data.email.value) {
      formIsValid = false;
      isFormErrors.email = true;
    }
    if (!data.password.value) {
      formIsValid = false;
      isFormErrors.password = true;
    }
    if (!data.confirm_password.value) {
      formIsValid = false;
      isFormErrors.confirm_password = true;
    }
    if (data.confirm_password.value !== data.password.value) {
      formIsValid = false;
      isFormErrors.password_match = true;
    }
    if (!formIsValid) {
      return setFormErrors(isFormErrors);
    }

    const newUser = {
      full_name: data.name.value,
      username: data.username.value,
      email: data.email.value,
      password: data.password.value,
    };

    try {
      await register(newUser);
      const response = await logIn({
        email: newUser.email,
        password: newUser.password,
      });
      localStorage.setItem("token", response.data.token);
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error(error);
      setError(error.response.data);
    }
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
            formErrors={formErrors}
            error={error}
            success={success}
          />
        )}
        {signUp && (
          <LoginEl
            title="Sign Up for a Free Account"
            signUp={true}
            clickHandler={handleSignUp}
            formErrors={formErrors}
            error={error}
            success={success}
          />
        )}
      </div>
    </main>
  );
}
