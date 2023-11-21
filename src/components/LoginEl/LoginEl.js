import "./LoginEl.scss";

export default function LoginEl({
  title,
  signUp,
  clickHandler,
  formErrors,
  error,
  success,
}) {
  return (
    <article className="log-in">
      <h1 className="log-in__title">{title}</h1>

      <form onSubmit={clickHandler} className="log-in__form">
        {signUp && (
          <>
            <div className="log-in__group">
              <label htmlFor="name" className="log-in__label">
                Full Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="log-in__input"
                placeholder="Enter your full name"
              />
              <p
                className={`log-in__error ${
                  formErrors.name ? "log-in__error--true" : ""
                }`}>
                Please enter your full name
              </p>
            </div>

            <div className="log-in__group">
              <label htmlFor="username" className="log-in__label">
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="log-in__input"
                placeholder="Choose a username"
              />
              <p
                className={`log-in__error ${
                  formErrors.username ? "log-in__error--true" : ""
                }`}>
                Please enter a username
              </p>
            </div>
          </>
        )}

        <div className="log-in__group">
          <label htmlFor="email" className="log-in__label">
            Email Address:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="log-in__input"
            placeholder="Enter your email address"
          />
          <p
            className={`log-in__error ${
              formErrors.email ? "log-in__error--true" : ""
            }`}>
            Please enter your email address
          </p>
        </div>

        <div className="log-in__group">
          <label htmlFor="password" className="log-in__label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="log-in__input"
            placeholder={`${
              signUp ? "Choose your password" : "Enter your password"
            }`}
          />

          {!signUp && (
            <p
              className={`log-in__error ${
                formErrors.password ? "log-in__error--true" : ""
              }`}>
              Please enter your password
            </p>
          )}

          {signUp && (
            <p
              className={`log-in__error ${
                formErrors.password ? "log-in__error--true" : ""
              }`}>
              Please enter a password
            </p>
          )}
        </div>

        {signUp && (
          <div className="log-in__group">
            <label htmlFor="confirm_password" className="log-in__label">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              className="log-in__input"
              placeholder="Confirm your password"
            />
            <p
              className={`log-in__error ${
                formErrors.confirm_password ? "log-in__error--true" : ""
              }`}>
              Please confirm your password
            </p>
            <p
              className={`log-in__error ${
                formErrors.password_match ? "log-in__error--true" : ""
              }`}>
              Passwords must match
            </p>
          </div>
        )}

        <button type="submit">{signUp ? "Sign Up Now" : "Log In"}</button>
      </form>
      {error && <p className="log-in__error--true">{error}</p>}
      {success && <p className="log-in__success">Success! Logging in...</p>}
    </article>
  );
}
