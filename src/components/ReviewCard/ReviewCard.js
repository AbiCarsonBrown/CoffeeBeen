import "./ReviewCard.scss";
import { useState } from "react";
import ReviewForm from "../ReviewForm/ReviewForm";
import { ReactComponent as Edit } from "../../assets/icons/edit-icon.svg";
import { ReactComponent as Delete } from "../../assets/icons/bin-icon.svg";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { customCoffeeBean } from "../../utils/customIcons";

export default function ReviewCard({ review, isUser, submitVisit }) {
  const [edit, setEdit] = useState(false);
  const [rating, setRating] = useState(review.rating);

  const handleRating = (ratingVal) => {
    setRating(ratingVal);
    submitVisit(review.visited, review.on_wishlist, ratingVal, review.review);
  };

  return (
    <article className="review-card">
      {!isUser && <p className="review-card__username">{review.username}</p>}

      {isUser && (
        <div className="review-card__header">
          <p className="review-card__user">Your review</p>
          {review.review && !edit && (
            <div className="review-card__actions">
              <button
                onClick={() => {
                  setEdit(true);
                }}
                className="review-card__button review-card__button--edit">
                <Edit height="1rem" />
              </button>
              <button className="review-card__button review-card__button--delete">
                <Delete height="1rem" />
              </button>
            </div>
          )}
        </div>
      )}

      {!isUser && (
        <div className="review-card__content">
          <Rating
            readOnly
            style={{ maxWidth: 100 }}
            value={review.rating}
            itemStyles={customCoffeeBean}
            spaceBetween="none"
            spaceInside="none"
          />
          <p className="review-card__review">{review.review}</p>
        </div>
      )}

      {isUser && (
        <div className="review-card__content">
          <Rating
            style={{ maxWidth: 100 }}
            value={rating}
            onChange={handleRating}
            itemStyles={customCoffeeBean}
            spaceBetween="none"
            spaceInside="none"
          />
          {!edit && (
            <>
              {review.review && (
                <p className="review-card__review">{review.review}</p>
              )}
              {!review.review && (
                <button
                  onClick={() => {
                    setEdit(true);
                  }}
                  className="review-card__new">
                  Leave your review
                </button>
              )}{" "}
            </>
          )}
          {edit && (
            <ReviewForm
              review={review}
              submitVisit={submitVisit}
              setEdit={setEdit}
            />
          )}
        </div>
      )}
    </article>
  );
}
