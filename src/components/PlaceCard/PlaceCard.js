import "./PlaceCard.scss";
import { Link } from "react-router-dom";

export default function PlaceCard({ place }) {
  return (
    <article>
      <Link to={`/coffeeshop/${place.coffeeshop_id}`}>
        {place.coffeeshop_name}
      </Link>
      <p>{place.address}</p>
      {/* visited indicator, hightlighted if user has visited, wishlist
      indicator, highlighted if on user wishlist */}
    </article>
  );
}
