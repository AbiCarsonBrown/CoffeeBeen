import "./Footer.scss";
import user from "../../assets/icons/user-solid.svg";
import list from "../../assets/icons/list-ul-solid.svg";
import marker from "../../assets/icons/marker-pink.svg";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <nav className="footer__nav">
        <button className="footer__list-button">
          <img src={list} alt="" className="footer__list-img" />
        </button>
        <NavLink to="/">
          <img src={marker} alt="" className="footer__marker" />
        </NavLink>
        <NavLink to="/profile">
          <img src={user} alt="" className="footer__profile" />
        </NavLink>
      </nav>
    </footer>
  );
}
