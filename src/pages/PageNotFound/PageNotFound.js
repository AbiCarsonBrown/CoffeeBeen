import "./PageNotFound.scss";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <main className="not-found">
      <div className="not-found__wrapper">
        <h1 className="not-found__title">
          Oops! This page cannot be found - return to{" "}
          <Link to="/" className="not-found__link">
            homepage
          </Link>
          ?
        </h1>
      </div>
    </main>
  );
}
