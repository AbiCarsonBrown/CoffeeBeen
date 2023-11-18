export default function ReviewCard({ user, review }) {
  return (
    <article>
      <p>{user}</p>
      <p>{review}</p>
    </article>
  );
}
