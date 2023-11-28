import "./CoffeeShop.scss";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  fetchUser,
  postUserVisit,
  editUserVisit,
  fetchSingleUserVisit,
} from "../../utils/axios";
import PageNotFound from "../PageNotFound/PageNotFound";

export default function CoffeeShop() {
  const [isLoading, setIsLoading] = useState(true);
  const [failedAuth, setFailedAuth] = useState(false);
  const [seeReviews, setSeeReviews] = useState(true);
  const [visitError, setVisitError] = useState(false);
  const [coffeeShop, setCoffeeShop] = useState(null);
  const [user, setUser] = useState(null);
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

  const getSingleUserVisit = useCallback(async () => {
    try {
      const singleUserVisit = await fetchSingleUserVisit(token, coffeeShopId);
      const userResponse = await fetchUser(token);
      setUser(userResponse.data);
      setUserVisit(singleUserVisit.data);
      setVisited(singleUserVisit.data.visited);
      setBookmark(singleUserVisit.data.on_wishlist);
      console.log(singleUserVisit.data, userResponse.data);
    } catch (error) {
      setUser(null);
      setUserVisit(null);
      setVisited(null);
      setBookmark(null);
    }
  }, [token, coffeeShopId]);

  const getCoffeeShop = useCallback(async () => {
    try {
      const { data } = await fetchCoffeeShop(coffeeShopId);
      setCoffeeShop(data[0]);
      setVisits(data[1]);
    } catch (error) {
      console.error(error);
    }
  }, [coffeeShopId]);

  useEffect(() => {
    getCoffeeShop();
    if (token) {
      getSingleUserVisit();
    }
    if (!token) {
      setFailedAuth(true);
    }
    setIsLoading(false);
  }, [token, getSingleUserVisit, getCoffeeShop]);

  const submitVisit = (visited, wished, rating, review) => {
    if (userVisit.visit_id) {
      const visit = {
        visit_id: userVisit.visit_id,
        coffeeshop_id: userVisit.coffeeshop_id,
        user_id: userVisit.user_id,
        visited: visited,
        on_wishlist: wished,
        rating: rating,
        review: review,
      };
      try {
        editUserVisit(token, visit);
        getCoffeeShop();
        getSingleUserVisit();
      } catch (error) {
        setFailedAuth(true);
      }
    } else {
      const visit = {
        coffeeshop_id: coffeeShopId,
        user_id: user.id,
        visited: visited,
        on_wishlist: wished,
        rating: rating,
        review: review,
      };
      console.log(visit);
      try {
        postUserVisit(token, visit);
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
      setVisitError(true);
    }
  };

  const handleBookmark = (bookmarkVal) => {
    setBookmark(bookmarkVal);
    if (token) {
      if (userVisit) {
        submitVisit(
          userVisit.visited,
          bookmarkVal,
          userVisit.rating,
          userVisit.review
        );
      } else {
        submitVisit(null, bookmarkVal, null, null);
      }
    } else {
      setFailedAuth(true);
      setVisitError(true);
    }
  };

  if (isLoading || !visits) {
    return <main className="loading">Loading...</main>;
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
      (visit) => !!visit.visited && visit.visit_id === userVisit.visit_id
    );

  visits.forEach((visit) => {
    visitCount += visit.visited;
    if (visit.rating) {
      totalRating += visit.rating;
      ratingCount += 1;
      averageRating = totalRating / ratingCount;
    }
  });

  if (!coffeeShop) {
    return <PageNotFound />;
  }

  return (
    <main className="coffeeshop">
      <div className="coffeeshop__wrapper">
        <h1 className="coffeeshop__title">{coffeeShop.coffeeshop_name}</h1>
        <h2 className="coffeeshop__address">{coffeeShop.address}</h2>
        <div className="coffeeshop__details">
          <p className="coffeeshop__description">{coffeeShop.description}</p>
          <div className="coffeeshop__about">
            <Rating
              readOnly
              style={{ maxWidth: 125 }}
              value={averageRating}
              itemStyles={customCoffeeBean}
              spaceBetween="none"
              spaceInside="none"
              className="coffeeshop__rating"
            />
            <p className="coffeeshop__visits">
              Visited by{" "}
              <span className="coffeeshop__visits--highlight">
                {visitCount}
              </span>{" "}
              users
            </p>
            <div className="coffeeshop__actions">
              {visitError && (
                <p className="coffeeshop__error">
                  You must{" "}
                  {
                    <Link to="/login" className="coffeeshop__error-link">
                      log in
                    </Link>
                  }{" "}
                  to use this feature.
                </p>
              )}
              {!visitError && (
                <>
                  <Rating
                    style={{ maxWidth: 50 }}
                    value={visited}
                    onChange={handleVisit}
                    itemStyles={customMarker}
                    spaceBetween="none"
                    spaceInside="none"
                    items={1}
                    className="coffeeshop__marker"
                  />
                  <Rating
                    style={{ maxWidth: 50 }}
                    value={bookmark}
                    onChange={handleBookmark}
                    itemStyles={customBookmark}
                    spaceBetween="none"
                    spaceInside="none"
                    items={1}
                    className="coffeeshop__bookmark"
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setSeeReviews(!seeReviews);
          }}
          className="coffeeshop__reviews">
          Reviews ({reviews.length})
          {!seeReviews && <ChevronDown className="coffeeshop__chevron" />}
          {seeReviews && <ChevronUp className="coffeeshop__chevron" />}
        </button>
        {seeReviews && (
          <div className="coffeeshop__reviews-list">
            {!failedAuth && userVisit && userReview[0] && (
              <ReviewCard
                review={userReview[0]}
                isUser={true}
                submitVisit={submitVisit}
              />
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
