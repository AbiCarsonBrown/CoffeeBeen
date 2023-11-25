import "./ReviewForm.scss";
import { useState } from "react";
import { customCoffeeBean } from "../../utils/customIcons";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

export default function ReviewForm({ review, submitVisit, setEdit }) {
  const [rating, setRating] = useState(review.rating);
  const [content, setContent] = useState(review.review);

  const handleReview = (event) => {
    event.preventDefault();
    submitVisit(
      review.visited,
      review.on_wishlist,
      review.rating,
      event.target.review.value
    );
    setEdit(false);
  };

  const handleRating = (ratingVal) => {
    setRating(ratingVal);
    submitVisit(review.visited, review.on_wishlist, ratingVal, review.review);
  };

  return (
    <form className="review-form" onSubmit={handleReview}>
      <p>Review Form</p>
      <Rating
        style={{ maxWidth: 100 }}
        value={rating}
        onChange={handleRating}
        itemStyles={customCoffeeBean}
        spaceBetween="none"
        spaceInside="none"
      />
      {/* <label htmlFor="review"></label> */}
      <textarea
        name="review"
        id="review"
        cols="25"
        rows="5"
        value={content}
        onChange={(event) => {
          setContent(event.target.value);
        }}></textarea>
      {/* <p className="review-form__review">{review.review}</p> */}
      <button>Cancel</button>
      {/* --> state if coming from review card, no state if coffeeshop page */}
      <button type="submit" className="review-form__submit">
        Save
      </button>
    </form>
  );
}
