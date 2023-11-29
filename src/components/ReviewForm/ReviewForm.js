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
      <label htmlFor="review" className="review-form__label">
        Review
      </label>
      <textarea
        name="review"
        id="review"
        cols="25"
        rows="5"
        value={content ? content : undefined}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Leave your review here"
        className="review-form__input"></textarea>
      <div className="review-form__actions">
        <button
          type="button"
          onClick={() => setEdit(false)}
          className="review-form__button review-form__button--cancel">
          Cancel
        </button>
        <button
          type="submit"
          className="review-form__button review-form__button--submit">
          Save
        </button>
      </div>
    </form>
  );
}
