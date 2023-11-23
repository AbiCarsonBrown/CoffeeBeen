import "./PlaceCard.scss";
import { Link } from "react-router-dom";

export default function PlaceCard({ place }) {
  return (
    <article>
      <Link to={`/places/${place.id}`}>{place.coffeeshop_name}</Link>
      <p>{place.address}</p>
      {place.visited && <p>visited</p>}
      {/* visited indicator, hightlighted if user has visited, wishlist
      indicator, highlighted if on user wishlist */}
    </article>
  );
}
