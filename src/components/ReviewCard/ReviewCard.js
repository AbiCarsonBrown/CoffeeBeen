import "./ReviewCard.scss";
import { customCoffeeBean } from "../../utils/customIcons";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

export default function ReviewCard({ visit, isUser }) {
  return (
    <article className="review-card">
      <p className="review-card__user">{visit.username}</p>
      <Rating
        readOnly
        style={{ maxWidth: 100 }}
        value={visit.rating}
        itemStyles={customCoffeeBean}
        spaceBetween="none"
        spaceInside="none"
      />
      <p className="review-card__review">{visit.review}</p>
    </article>
  );
}
