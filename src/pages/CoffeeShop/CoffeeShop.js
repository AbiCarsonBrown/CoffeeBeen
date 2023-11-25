import "./CoffeeShop.scss";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactComponent as ChevronDown } from "../../assets/icons/chevron-down.svg";
import { ReactComponent as ChevronUp } from "../../assets/icons/chevron-up.svg";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import {
  customMarker,
  customBookmark,
  customCoffeeBean,
} from "../../utils/customIcons";
import {
  fetchCoffeeShop,
  postUserVisit,
  editUserVisit,
  fetchSingleUserVisit,
} from "../../utils/axios";

export default function CoffeeShop() {
  const [isLoading, setIsLoading] = useState(true);
  const [failedAuth, setFailedAuth] = useState(false);
  const [seeReviews, setSeeReviews] = useState(true);
  const [coffeeShop, setCoffeeShop] = useState(null);
  const [visits, setVisits] = useState(null);
  const [userVisit, setUserVisit] = useState(null);
  const [visited, setVisited] = useState(null);
  const [bookmark, setBookmark] = useState(null);
  const { coffeeShopId } = useParams();
  const token = localStorage.getItem("token");
  let visitCount = 0;
  let totalRating = 0;
  let ratingCount = 0;
  let averageRating = 0;

  const getSingleUserVisit = async () => {
    try {
      const { data } = await fetchSingleUserVisit(token, coffeeShopId);
      setUserVisit(data[0]);
      setVisited(data[0].visited);
      setBookmark(data[0].on_wishlist);
    } catch (error) {
      setUserVisit(null);
      setVisited(null);
      setBookmark(null);
    }
  };

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

  useEffect(() => {
    getCoffeeShop();
    if (token) {
      getSingleUserVisit();
    }
    if (!token) {
      setFailedAuth(true);
    }
  }, [coffeeShopId]);

  const submitVisit = (visited, wished, rating, review) => {
    const visit = {
      visit_id: userVisit.visit_id,
      coffeeshop_id: userVisit.coffeeshop_id,
      user_id: userVisit.user_id,
      visited: visited,
      on_wishlist: wished,
      rating: rating,
      review: review,
    };

    if (!userVisit.visit_id) {
      try {
        postUserVisit(token, visit);
        getCoffeeShop();
        getSingleUserVisit();
      } catch (error) {
        setFailedAuth(true);
      }
    } else {
      try {
        editUserVisit(token, visit);
        getCoffeeShop();
        getSingleUserVisit();
      } catch (error) {
        setFailedAuth(true);
      }
    }
  };

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

  const reviews =
    (!userVisit &&
      visits.filter(
        (visit) => (visit.review || visit.rating) && visit.visited
      )) ||
    (userVisit &&
      visits.filter(
        (visit) =>
          (visit.review || visit.rating) &&
          visit.visited &&
          visit.visit_id !== userVisit.visit_id
      ));

  const userReview =
    userVisit &&
    visits.filter(
      (visit) =>
        (visit.review || visit.rating) &&
        visit.visited &&
        visit.visit_id === userVisit.visit_id
    );

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
            {failedAuth && (
              <p className="coffeeshop__error">
                You must {<Link to="/login">log in</Link>} to use this feature.
              </p>
            )}
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
            {!failedAuth && userReview[0] && (
              <ReviewCard
                review={userReview[0]}
                isUser={true}
                submitVisit={submitVisit}
              />
            )}
            {!failedAuth && !userReview[0] && !!userVisit.visited && (
              <article className="coffeeshop__review-form">
                {/* <ReviewForm review={} submitVisit={submitVisit}/> */}
              </article>
            )}
            {reviews.map((review) => (
              <ReviewCard
                key={review.visit_id}
                review={review}
                isUser={false}
                submitVisit={submitVisit}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
