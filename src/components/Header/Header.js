import "./Header.scss";
import logo from "../../assets/icons/marker-pink.svg";

export default function Header() {
  return (
    <header className="header">
      <div className="header__group">
        <img src={logo} alt="CoffeeBeen logo" className="header__logo" />
        <h2 className="header__title">CoffeeBeen</h2>
      </div>
    </header>
  );
}
