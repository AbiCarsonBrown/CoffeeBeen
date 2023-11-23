import "./PlaceList.scss";
import PlaceCard from "../PlaceCard/PlaceCard";

export default function PlaceList({ places, handleClose }) {
  return (
    <section className="place-list">
      <button onClick={handleClose}>X</button>
      <p>PLACE LIST</p>
      {places.map((place) => {
        return <PlaceCard key={place.id} place={place} />;
      })}
    </section>
  );
}
