import "./CoffeeShop.scss";
import { fetchCoffeeShop } from "../../utils/axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReviewCard from "../../components/ReviewCard/ReviewCard";

export default function CoffeeShop() {
  const [coffeeShop, setCoffeeShop] = useState(null);
  const [visits, setVisits] = useState(null);
  // const [visitCount, setVisitCount] = useState(0);
  // const [reviews, setReviews] = useState([]);
  // const [averageRating, setAverageRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { coffeeShopId } = useParams();

  useEffect(() => {
    const getCoffeeShop = async () => {
      try {
        const { data } = await fetchCoffeeShop(coffeeShopId);
        setCoffeeShop(data[0][0]);
        setVisits(data[1]);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getCoffeeShop();
  }, [coffeeShopId]);

  if (isLoading || !visits) {
    return <p>Loading...</p>;
  }

  const reviews = visits
    .map((visit, i) => ({
      key: i,
      user: visit.username,
      review: visit.review,
    }))
    .filter((review) => review.review);

  let visitCount = 0;
  let totalRating = 0;
  let ratingCount = 0;
  let averageRating = 0;

  visits.forEach((visit) => {
    visitCount += visit.visited;
    if (visit.rating) {
      totalRating += visit.rating;
      ratingCount += 1;
      averageRating = totalRating / ratingCount;
    }
  });

  return (
    <main>
      <h1>{coffeeShop.coffeeshop_name}</h1>
      <p>{coffeeShop.address}</p>
      <p>{coffeeShop.description}</p>
      <p>Total User Visits: {visitCount}</p>
      <p>Average Rating: {averageRating}</p>
      {reviews.map((review, i) => (
        <ReviewCard key={i} user={review.user} review={review.review} />
      ))}
    </main>
  );
}
