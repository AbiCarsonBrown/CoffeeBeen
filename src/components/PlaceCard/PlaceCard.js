import "./PlaceCard.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { postUserVisit, editUserVisit } from "../../utils/axios";
import { markerPath } from "../../utils/markerPath";

export default function PlaceCard({ place, getCoffeeShops, getUserVisits }) {
  const [bookmark, setBookmark] = useState(place.on_wishlist);
  const [visited, setVisited] = useState(place.visited);
  const token = localStorage.getItem("token");

  const customMarker = {
    itemShapes: markerPath,
    itemStrokeWidth: 1,
    activeFillColor: "#f6236b",
    activeStrokeColor: "#E8B4B8",
    inactiveFillColor: "#E8B4B8",
    inactiveStrokeColor: "#f6236b",
  };

  const customBookmark = {
    itemShapes: (
      <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
    ),
    itemStrokeWidth: 1,
    activeFillColor: "#f6236b",
    activeStrokeColor: "#E8B4B8",
    inactiveFillColor: "#E8B4B8",
    inactiveStrokeColor: "#f6236b",
  };

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
        console.error(error);
      }
    } else {
      try {
        editUserVisit(token, visit);
        getCoffeeShops();
        getUserVisits();
      } catch (error) {
        console.error(error);
      }
    }
    // if noone logged in/expired token, display an error
  };

  const handleVisit = (visitVal) => {
    setVisited(visitVal);
    submitVisit(visitVal, place.on_wishlist, place.rating, place.review);
  };

  const handleBookmark = (bookmarkVal) => {
    setBookmark(bookmarkVal);
    submitVisit(place.visited, bookmarkVal, place.rating, place.review);
  };

  return (
    <article className="place-card">
      <Link to={`/places/${place.coffeeshop_id}`}>{place.coffeeshop_name}</Link>
      <p>{place.address}</p>
      <Rating
        style={{ maxWidth: 50 }}
        value={visited}
        onChange={handleVisit}
        itemStyles={customMarker}
        spaceBetween="none"
        spaceInside="none"
        items={1}
      />
      <Rating
        style={{ maxWidth: 50 }}
        value={bookmark}
        onChange={handleBookmark}
        itemStyles={customBookmark}
        spaceBetween="none"
        spaceInside="none"
        items={1}
      />
    </article>
  );
}
