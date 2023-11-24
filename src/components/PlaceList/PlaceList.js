import "./PlaceList.scss";
import PlaceCard from "../PlaceCard/PlaceCard";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function PlaceList({
  places,
  handleClose,
  getCoffeeShops,
  getUserVisits,
}) {
  const [failedAuth, setFailedAuth] = useState(false);
  return (
    <section className="place-list">
      <button onClick={handleClose}>X</button>
      <p>PLACE LIST</p>
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
