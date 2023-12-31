import "./PlaceList.scss";
import PlaceCard from "../PlaceCard/PlaceCard";
import { ReactComponent as Close } from "../../assets/icons/close-icon.svg";
import { Link } from "react-router-dom";

export default function PlaceList({
  places,
  handleClose,
  page,
  submitVisit,
  failedAuth,
  setFailedAuth,
}) {
  return (
    <section className={`place-list place-list--${page}`}>
      {page === "profile" && (
        <button onClick={handleClose} className="place-list__close">
          <Close className="place-list__close-icon" />
        </button>
      )}
      {failedAuth && (
        <p className="place-list__error">
          You must{" "}
          {
            <Link to="/login" className="place-list__error-link">
              log in
            </Link>
          }{" "}
          to use this feature.
        </p>
      )}
      {places
        .sort((a, b) => {
          return a.distance - b.distance;
        })
        .map((place) => {
          return (
            <PlaceCard
              key={place.coffeeshop_id}
              place={place}
              submitVisit={submitVisit}
              setFailedAuth={setFailedAuth}
            />
          );
        })}
    </section>
  );
}
