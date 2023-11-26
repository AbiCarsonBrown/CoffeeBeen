import "./Footer.scss";
import { ReactComponent as Marker } from "../../assets/icons/marker.svg";
import { ReactComponent as User } from "../../assets/icons/user-icon.svg";
import { NavLink, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  return (
    <footer
      className={`footer ${
        location.pathname === "/login" ? "footer--hide" : ""
      }`}>
      <nav className="footer__nav">
        <NavLink to="/" className="footer__link">
          <Marker className="footer__icon footer__icon--marker" />
        </NavLink>
        <NavLink to="/profile" className="footer__link">
          <User className="footer__icon footer__icon--profile" />
        </NavLink>
      </nav>
    </footer>
  );
}
