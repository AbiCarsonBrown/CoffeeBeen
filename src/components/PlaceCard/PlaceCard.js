import "./PlaceCard.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { postUserVisit, editUserVisit } from "../../utils/axios";
import { customMarker, customBookmark } from "../../utils/customIcons";

export default function PlaceCard({
  place,
  getCoffeeShops,
  getUserVisits,
  setFailedAuth,
}) {
  const [bookmark, setBookmark] = useState(place.on_wishlist);
  const [visited, setVisited] = useState(place.visited);
  const token = localStorage.getItem("token");

  const submitVisit = (visited, wished, rating, review) => {
    const visit = {
      visit_id: place.visit_id,
      coffeeshop_id: place.coffeeshop_id,
      user_id: place.user_id,
      visited: visited,
      on_wishlist: wished,
      rating: rating,
      review: review,
    };

    if (!place.visit_id) {
      try {
        postUserVisit(token, visit);
        getCoffeeShops();
        getUserVisits();
      } catch (error) {
        setFailedAuth(true);
      }
    } else {
      try {
        editUserVisit(token, visit);
        getCoffeeShops();
        getUserVisits();
      } catch (error) {
        setFailedAuth(true);
      }
    }
  };

  const handleVisit = (visitVal) => {
    setVisited(visitVal);
    if (token) {
      submitVisit(visitVal, place.on_wishlist, place.rating, place.review);
    } else {
      setFailedAuth(true);
    }
  };

  const handleBookmark = (bookmarkVal) => {
    setBookmark(bookmarkVal);
    if (token) {
      submitVisit(place.visited, bookmarkVal, place.rating, place.review);
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
