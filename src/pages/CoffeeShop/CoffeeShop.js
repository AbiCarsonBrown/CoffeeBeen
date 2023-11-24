import "./CoffeeShop.scss";
import { fetchCoffeeShop } from "../../utils/axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import {
  customMarker,
  customBookmark,
  customCoffeeBean,
} from "../../utils/customIcons";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { ReactComponent as ChevronDown } from "../../assets/icons/chevron-down.svg";
import { ReactComponent as ChevronUp } from "../../assets/icons/chevron-up.svg";
import {
  postUserVisit,
  editUserVisit,
  fetchSingleUserVisit,
} from "../../utils/axios";

export default function CoffeeShop() {
  const [coffeeShop, setCoffeeShop] = useState(null);
  const [visits, setVisits] = useState(null);
  const [userVisit, setUserVisit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [seeReviews, setSeeReviews] = useState(true);
  const [bookmark, setBookmark] = useState(null);
  const [visited, setVisited] = useState(null);
  const { coffeeShopId } = useParams();
  const token = localStorage.getItem("token");
  let visitCount = 0;
  let totalRating = 0;
  let ratingCount = 0;
  let averageRating = 0;

  const getSingleUserVisit = async () => {
    try {
      const { data } = await fetchSingleUserVisit(token, coffeeShopId);
      setUserVisit(data);
    } catch (error) {
      setUserVisit(null);
    }
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
    if (token) {
      getSingleUserVisit();
    }
  }, [coffeeShopId]);

  const handleVisit = (visitVal) => {
    setVisited(visitVal);
    if (token) {
      submitVisit(
        visitVal,
        userVisit.on_wishlist,
        userVisit.rating,
        userVisit.review
      );
    } else {
      setFailedAuth(true);
    }
  };

  const handleBookmark = (bookmarkVal) => {
    setBookmark(bookmarkVal);
    if (token) {
      submitVisit(
        userVisit.visited,
        bookmarkVal,
        userVisit.rating,
        userVisit.review
      );
    } else {
      setFailedAuth(true);
    }
  };

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
          <div className="coffeeshop__actions">
            {" "}
            <Rating
              style={{ maxWidth: 50 }}
              value={visited}
              onChange={handleVisit}
              itemStyles={customMarker}
              spaceBetween="none"
              spaceInside="none"
              items={1}
            />
            <Rating
              style={{ maxWidth: 50 }}
              value={bookmark}
              onChange={handleBookmark}
              itemStyles={customBookmark}
              spaceBetween="none"
              spaceInside="none"
              items={1}
            />
          </div>
        </div>
        <button
          onClick={() => {
            setSeeReviews(!seeReviews);
          }}
          className="coffeeshop__reviews">
          Reviews ({reviews.length})
          {!seeReviews && <ChevronDown height="1rem" />}
          {seeReviews && <ChevronUp height="1rem" />}
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
