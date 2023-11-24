import "./Header.scss";
import { ReactComponent as Marker } from "../../assets/icons/marker.svg";
import { ReactComponent as User } from "../../assets/icons/user-icon.svg";
import { ReactComponent as List } from "../../assets/icons/list-icon.svg";
import { NavLink, useLocation } from "react-router-dom";

export default function Header({ handleShowList }) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <header className="header">
      <nav className="header__nav">
        <NavLink to="/" className="header__logo-link">
          <Marker
            fill="#f6236b"
            stroke="#f6236b"
            className="header__logo-icon"
          />
          <h2 className="header__title">CoffeeBeen</h2>
        </NavLink>
        <button
          onClick={() => handleShowList()}
          className={`header__list-button ${
            location.pathname !== "/" ? "header__list-button--hide" : ""
          }`}>
          <List fill="white" stroke="white" className="header__list-icon" />
        </button>

        <NavLink
          to="/profile"
          className={`header__profile-link ${
            location.pathname === "/login" ? "header__profile-link--hide" : ""
          }`}>
          {location.pathname === "/profile" && (
            <User
              fill="#f6236b"
              stroke="#f6236b"
              className="header__profile-icon"
            />
          )}
          {location.pathname !== "/profile" && (
            <User
              fill="white"
              stroke="white"
              className="header__profile-icon"
            />
          )}
        </NavLink>

        {!token && location.pathname !== "/login" && (
          <NavLink to="/login" className="header__login">
            Log In
          </NavLink>
        )}
        {token && location.pathname !== "/login" && (
          <button onClick={handleLogOut} className="header__logout">
            Log Out
          </button>
        )}
      </nav>
    </header>
  );
}
