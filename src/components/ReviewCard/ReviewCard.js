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
    <article className={`review-card ${edit ? "review-card--edit" : ""}`}>
      {!isUser && <p className="review-card__username">{review.username}</p>}

      {isUser && (
        <div className="review-card__header">
          <p className="review-card__user">You</p>
          {review.review && !edit && (
            <div className="review-card__actions">
              <button
                onClick={() => {
                  setEdit(true);
                }}
                className="review-card__button review-card__button--edit">
                <Edit className="review-card__icon" />
              </button>
              <button className="review-card__button review-card__button--delete">
                <Delete className="review-card__icon" />
              </button>
            </div>
          )}
        </div>
      )}

      {!isUser && (
        <>
          <Rating
            readOnly
            style={{ maxWidth: 100 }}
            value={review.rating}
            itemStyles={customCoffeeBean}
            spaceBetween="none"
            spaceInside="none"
            className="review-card__rating"
          />
          <p className="review-card__review">{review.review}</p>
        </>
      )}

      {isUser && (
        <>
          <Rating
            style={{ maxWidth: 100 }}
            value={rating}
            onChange={handleRating}
            itemStyles={customCoffeeBean}
            spaceBetween="none"
            spaceInside="none"
            className="review-card__rating"
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
        </>
      )}
    </article>
  );
}
