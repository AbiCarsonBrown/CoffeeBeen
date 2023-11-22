import "./Footer.scss";
import user from "../../assets/icons/user-solid.svg";
import list from "../../assets/icons/list-ul-solid.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <img src={list} alt="" className="user" />
      <img src={user} alt="" className="user" />
    </footer>
  );
}
