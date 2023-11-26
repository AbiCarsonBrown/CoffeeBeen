import "./LoginEl.scss";

export default function LoginEl({
  isSignUp,
  clickHandler,
  formErrors,
  error,
  success,
}) {
  return (
    <article className="log-in">
      <h1 className="log-in__title">
        {isSignUp ? "Sign Up for a Free Account" : "Log In to Your Account"}
      </h1>
      <form onSubmit={clickHandler} className="log-in__form">
        {isSignUp && (
          <>
            <div className="log-in__group log-in__group--name">
              <label htmlFor="name" className="log-in__label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="log-in__input"
                placeholder="Full Name"
              />
              {formErrors.name && (
                <p className="log-in__error">Please enter your full name</p>
              )}
            </div>

            <div className="log-in__group log-in__group--username">
              <label htmlFor="username" className="log-in__label">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="log-in__input"
                placeholder="Choose Username"
              />
              {formErrors.username && (
                <p className="log-in__error">Please enter a username</p>
              )}
            </div>
          </>
        )}

        <div
          className={`log-in__group ${
            isSignUp ? "log-in__group--email" : "log-in__group--top"
          }`}>
          <label htmlFor="email" className="log-in__label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="log-in__input"
            placeholder="Email Address"
          />
          {formErrors.email && (
            <p className="log-in__error">Please enter your email address</p>
          )}
        </div>

        <div
          className={`log-in__group ${
            isSignUp ? "log-in__group--password" : "log-in__group--bottom"
          }`}>
          <label htmlFor="password" className="log-in__label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="log-in__input"
            placeholder={`${isSignUp ? "Choose Password" : "Password"}`}
          />

          {formErrors.password && (
            <p className="log-in__error">
              {isSignUp
                ? "Please enter a password"
                : "Please enter your password"}
            </p>
          )}
        </div>

        {isSignUp && (
          <div className="log-in__group log-in__group--confirm">
            <label htmlFor="confirm_password" className="log-in__label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              className="log-in__input"
              placeholder="Confirm Password"
            />
            {formErrors.confirm_password && (
              <p className="log-in__error">Please confirm your password</p>
            )}
            {formErrors.password_match && !formErrors.confirm_password && (
              <p className="log-in__error">Passwords must match</p>
            )}
          </div>
        )}
        <div className="log-in__actions">
          <button type="submit" className="log-in__submit">
            {isSignUp ? "Sign Up Now" : "Log In"}
          </button>
          {error && <p className="log-in__response">{error}</p>}
          {success && (
            <p className="log-in__response">Success! Logging in...</p>
          )}
        </div>
      </form>
    </article>
  );
}
