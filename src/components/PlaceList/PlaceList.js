import "./PlaceList.scss";
import PlaceCard from "../PlaceCard/PlaceCard";
import { ReactComponent as Close } from "../../assets/icons/close-icon.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function PlaceList({
  places,
  handleClose,
  page,
  getCoffeeShops,
  getUserVisits,
}) {
  const [failedAuth, setFailedAuth] = useState(false);
  return (
    <section className={`place-list place-list--${page}`}>
      <button onClick={handleClose} className="place-list__close">
        <Close className="place-list__close-icon" />
      </button>
      {failedAuth && (
        <p className="place-list__error">
          You must {<Link to="/login">log in</Link>} to use this feature.
        </p>
      )}
      {places.map((place) => {
        return (
          <PlaceCard
            key={place.coffeeshop_id}
            place={place}
            getCoffeeShops={getCoffeeShops}
            getUserVisits={getUserVisits}
            setFailedAuth={setFailedAuth}
          />
        );
      })}
    </section>
  );
}
