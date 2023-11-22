import "./Header.scss";
import logo from "../../assets/icons/marker-pink.svg";
import user from "../../assets/icons/user-solid.svg";
import list from "../../assets/icons/list-ul-solid.svg";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to="/" className="header__logo-link">
          <img src={logo} alt="CoffeeBeen logo" className="header__logo" />
          <h2 className="header__title">CoffeeBeen</h2>
        </Link>
        <nav className="header__nav">
          <button className="header__list-button">
            <img src={list} alt="" className="header__list-img" />
          </button>
          <NavLink to="/profile">
            <img src={user} alt="" className="header__profile" />
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
