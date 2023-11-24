import "./PlaceList.scss";
import PlaceCard from "../PlaceCard/PlaceCard";

export default function PlaceList({
  places,
  handleClose,
  getCoffeeShops,
  getUserVisits,
}) {
  return (
    <section className="place-list">
      <button onClick={handleClose}>X</button>
      <p>PLACE LIST</p>
      {places.map((place) => {
        return (
          <PlaceCard
            key={place.coffeeshop_id}
            place={place}
            getCoffeeShops={getCoffeeShops}
            getUserVisits={getUserVisits}
          />
        );
      })}
    </section>
  );
}
