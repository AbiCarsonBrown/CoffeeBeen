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
        <NavLink to="/">
          {location.pathname === "/" && (
            <Marker
              fill="#f6236b"
              stroke="#f6236b"
              className="footer__marker"
            />
          )}
          {location.pathname !== "/" && (
            <Marker fill="white" stroke="white" className="footer__marker" />
          )}
        </NavLink>
        <NavLink to="/profile">
          {location.pathname === "/profile" && (
            <User fill="#f6236b" stroke="#f6236b" className="footer__profile" />
          )}
          {location.pathname !== "/profile" && (
            <User fill="white" stroke="white" className="footer__profile" />
          )}
        </NavLink>
      </nav>
    </footer>
  );
}
