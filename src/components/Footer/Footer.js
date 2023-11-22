import "./Footer.scss";
import user from "../../assets/icons/user-solid.svg";
import marker from "../../assets/icons/marker-pink.svg";
import { NavLink, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  return (
    <footer
      className={`footer ${
        location.pathname === "/login" ? "footer--hide" : ""
      }`}>
      <nav className="footer__nav">
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
