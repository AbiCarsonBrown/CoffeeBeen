import "./Header.scss";
import logo from "../../assets/icons/marker-pink.svg";
import user from "../../assets/icons/user-solid.svg";
import list from "../../assets/icons/list-ul-solid.svg";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to="/" className="header__logo-link">
          <img src={logo} alt="CoffeeBeen logo" className="header__logo" />
          <h2 className="header__title">CoffeeBeen</h2>
        </Link>
        <button
          className={`header__list-button ${
            location.pathname !== "/" ? "header__list-button--hide" : ""
          }`}>
          <img src={list} alt="" className="header__list-img" />
        </button>
        <nav
          className={`header__nav ${
            location.pathname === "/login" ? "header__nav--hide" : ""
          }`}>
          <NavLink to="/profile">
            <img src={user} alt="" className="header__profile" />
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
