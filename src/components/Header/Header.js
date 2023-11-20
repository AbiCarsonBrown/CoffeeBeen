import "./Header.scss";
import logo from "../../assets/icons/marker-pink.svg";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to="/" className="header__link">
          <img src={logo} alt="CoffeeBeen logo" className="header__logo" />
          <h2 className="header__title">CoffeeBeen</h2>
        </Link>
      </div>
    </header>
  );
}
