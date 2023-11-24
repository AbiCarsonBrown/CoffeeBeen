import "./ReviewCard.scss";

export default function ReviewCard({ visit }) {
  return (
    <article className="review-card">
      <p className="review-card__user">{visit.username}</p>
      <p className="review-card__rating">{visit.rating}</p>
      <p className="review-card__review">{visit.review}</p>
    </article>
  );
}
