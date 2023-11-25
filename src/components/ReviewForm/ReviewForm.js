import "./ReviewForm.scss";
import { useState } from "react";

export default function ReviewForm({ review, submitVisit, setEdit }) {
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

  return (
    <form className="review-form" onSubmit={handleReview}>
      <textarea
        name="review"
        id="review"
        cols="25"
        rows="5"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        className="review-form__input">
        Leave your review here
      </textarea>
      <button
        onClick={() => setEdit(false)}
        className="review-form__button review-form__button--cancel">
        Cancel
      </button>
      <button
        type="submit"
        className="review-form__button review-form__button--submit">
        Save
      </button>
    </form>
  );
}
