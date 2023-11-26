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
          <Marker className="header__logo-icon" />
          <h2 className="header__title">CoffeeBeen</h2>
        </NavLink>

        {location.pathname === "/" && (
          <button
            onClick={() => handleShowList()}
            className="header__list-button">
            <List fill="white" stroke="white" className="header__list-icon" />
          </button>
        )}

        {location.pathname !== "/login" && (
          <NavLink to="/profile" className="header__profile-link">
            <User className="header__profile-icon" />
          </NavLink>
        )}

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
