import "./ReviewCard.scss";

export default function ReviewCard({ user, review }) {
  return (
    <article className="review-card">
      <p className="review-card__user">{user}</p>
      <p className="review-card__review">{review}</p>
    </article>
  );
}
