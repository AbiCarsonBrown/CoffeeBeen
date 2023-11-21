import "./LoginEl.scss";

export default function LoginEl({ title, signUp, clickHandler }) {
  return (
    <article className="log-in">
      <h1 className="log-in__title">{title}</h1>

      <form onSubmit={clickHandler} className="log-in__form">
        {signUp && (
          <>
            <div className="log-in__group">
              <label htmlFor="full-name" className="log-in__label">
                Full Name:
              </label>
              <input
                type="text"
                id="full-name"
                name="full-name"
                className="log-in__input"
                placeholder="Enter your full name"
              />
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
        </div>

        {signUp && (
          <div className="log-in__group">
            {" "}
            <label htmlFor="confirm-password" className="log-in__label">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              className="log-in__input"
              placeholder="Confirm your password"
            />
          </div>
        )}

        <button type="submit">{signUp ? "Sign Up Now" : "Log In"}</button>
      </form>
    </article>
  );
}
