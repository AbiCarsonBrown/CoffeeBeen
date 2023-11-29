import "./PlaceCard.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { customMarker, customBookmark } from "../../utils/customIcons";

export default function PlaceCard({ place, submitVisit, setFailedAuth }) {
  const [bookmark, setBookmark] = useState(place.on_wishlist);
  const [visited, setVisited] = useState(place.visited);
  const token = localStorage.getItem("token");

  const handleVisit = (visitVal) => {
    setVisited(visitVal);
    if (token) {
      submitVisit(
        place.visit_id,
        place.coffeeshop_id,
        place.user_id,
        visitVal,
        place.on_wishlist,
        place.rating,
        place.review
      );
    } else {
      setFailedAuth(true);
    }
  };

  const handleBookmark = (bookmarkVal) => {
    setBookmark(bookmarkVal);
    if (token) {
      submitVisit(
        place.visit_id,
        place.coffeeshop_id,
        place.user_id,
        place.visited,
        bookmarkVal,
        place.rating,
        place.review
      );
    } else {
      setFailedAuth(true);
    }
  };

  return (
    <article className="place-card">
      <Link to={`/places/${place.coffeeshop_id}`} className="place-card__name">
        {place.coffeeshop_name}
      </Link>
      <p className="place-card__address">{place.address}</p>
      {place.distance && (
        <p className="place-card__distance">{place.distance} km away</p>
      )}
      <Rating
        style={{ maxWidth: 50 }}
        value={visited}
        onChange={handleVisit}
        itemStyles={customMarker}
        spaceBetween="none"
        spaceInside="none"
        items={1}
        className="place-card__action place-card__action--marker"
      />
      <Rating
        style={{ maxWidth: 50 }}
        value={bookmark}
        onChange={handleBookmark}
        itemStyles={customBookmark}
        spaceBetween="none"
        spaceInside="none"
        items={1}
        className="place-card__action place-card__action--bookmark"
      />
    </article>
  );
}
