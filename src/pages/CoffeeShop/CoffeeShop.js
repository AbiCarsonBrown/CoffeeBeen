import "./CoffeeShop.scss";
import { fetchCoffeeShop } from "../../utils/axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

export default function CoffeeShop() {
  const [coffeeShop, setCoffeeShop] = useState(null);
  const [visits, setVisits] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [seeReviews, setSeeReviews] = useState(false);
  const { coffeeShopId } = useParams();
  let visitCount = 0;
  let totalRating = 0;
  let ratingCount = 0;
  let averageRating = 0;

  const customCoffeeBean = {
    itemShapes: (
      <path d="M 40.121094 1.0625 C 54.996094 -3.316406 66.90625 10.628906 72.296875 23.054688 C 77.667969 35.449219 78.472656 49.660156 76.035156 62.847656 C 73.121094 78.59375 61.121094 106.933594 40.730469 101.222656 C 37.015625 92.839844 35.203125 84.394531 35.335938 76.007812 C 35.476562 67.457031 37.59375 61.484375 39.839844 55.160156 C 41.761719 49.75 43.746094 44.15625 44.683594 36.578125 C 46.082031 25.273438 44.546875 13.363281 40.121094 1.0625 Z M 1.921875 62.847656 C 4.84375 78.648438 16.917969 107.125 37.4375 101.160156 C 33.914062 92.796875 32.207031 84.359375 32.339844 75.960938 C 32.484375 66.917969 34.6875 60.71875 37.015625 54.15625 C 38.882812 48.898438 40.8125 43.460938 41.710938 36.210938 C 43.097656 24.984375 41.453125 13.101562 36.828125 0.789062 C 22.421875 -2.6875 10.925781 10.910156 5.660156 23.054688 C 0.285156 35.449219 -0.519531 49.660156 1.921875 62.847656 Z M 1.921875 62.847656 " />
    ),
    itemStrokeWidth: 1,
    activeFillColor: "#f6236b",
    activeStrokeColor: "#E8B4B8",
    inactiveFillColor: "#E8B4B8",
    inactiveStrokeColor: "#f6236b",
  };

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

  visits.forEach((visit) => {
    visitCount += visit.visited;
    if (visit.rating) {
      totalRating += visit.rating;
      ratingCount += 1;
      averageRating = totalRating / ratingCount;
    }
  });

  return (
    <main className="coffeeshop">
      <div className="coffeeshop__wrapper">
        <h1 className="coffeeshop__title">{coffeeShop.coffeeshop_name}</h1>
        <h2 className="coffeeshop__address">{coffeeShop.address}</h2>
        <div className="coffeeshop__details">
          <p className="coffeeshop__description">{coffeeShop.description}</p>
          <div className="coffeeshop__stats">
            <Rating
              readOnly
              style={{ maxWidth: 100 }}
              value={averageRating}
              itemStyles={customCoffeeBean}
              spaceBetween="none"
              spaceInside="none"
            />
            <p className="coffeeshop__visits">
              Visited by{" "}
              <span className="coffeeshop--highlight">{visitCount}</span> users
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setSeeReviews(!seeReviews);
          }}
          className="coffeeshop__reviews">
          Reviews ({reviews.length})
        </button>
        {seeReviews && (
          <div className="coffeeshop__reviews-list">
            {reviews.map((review, i) => (
              <ReviewCard key={i} user={review.user} review={review.review} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
