import "./PlaceList.scss";
import PlaceCard from "../PlaceCard/PlaceCard";

export default function PlaceList({ places, handleClose }) {
  return (
    <section>
      <button onClick={handleClose}>X</button>
      {places.map((place) => {
        return <PlaceCard key={place.id} place={place} />;
      })}
    </section>
  );
}
