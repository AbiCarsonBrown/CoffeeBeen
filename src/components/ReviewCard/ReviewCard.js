import "./ReviewCard.scss";
import ReviewForm from "../ReviewForm/ReviewForm";
import { ReactComponent as Edit } from "../../assets/icons/edit-icon.svg";
import { ReactComponent as Delete } from "../../assets/icons/bin-icon.svg";
import { customCoffeeBean } from "../../utils/customIcons";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState } from "react";

export default function ReviewCard({ review, isUser, submitVisit }) {
  const [edit, setEdit] = useState(false);

  return (
    <article className="review-card">
      {!isUser && <p className="review-card__user">{review.username}</p>}
      {isUser && (
        <>
          <p className="review-card__user">YOU</p>
          {(review.review || review.rating) && (
            <>
              <button
                onClick={() => {
                  setEdit(!edit);
                }}>
                <Edit height="1rem" />
              </button>
              <Delete height="1rem" />
            </>
          )}
        </>
      )}
      {!edit && !review.rating && !review.review && (
        <button
          onClick={() => {
            setEdit(true);
          }}
          className="review-card__new">
          Leave your rating & review
        </button>
      )}
      {!edit && (
        <>
          <Rating
            readOnly
            style={{ maxWidth: 100 }}
            value={review.rating}
            itemStyles={customCoffeeBean}
            spaceBetween="none"
            spaceInside="none"
          />
          <p className="review-card__review">{review.review}</p>
        </>
      )}
      {isUser && edit && (
        <ReviewForm
          review={review}
          submitVisit={submitVisit}
          setEdit={setEdit}
        />
      )}
    </article>
  );
}
