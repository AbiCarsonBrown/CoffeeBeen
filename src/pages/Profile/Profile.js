import "./Profile.scss";
import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { fetchUser, fetchUserVisits } from "../../utils/axios";
import PlaceList from "../../components/PlaceList/PlaceList";
import { postUserVisit, editUserVisit } from "../../utils/axios";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [failedAuth, setFailedAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [visits, setVisits] = useState(null);
  const [show, setShow] = useState(null);
  const token = localStorage.getItem("token");

  const login = useCallback(async () => {
    try {
      const userResponse = await fetchUser(token);
      const visitsResponse = await fetchUserVisits(token);
      setUser(userResponse.data);
      setVisits(visitsResponse.data);
      setIsLoading(false);
      setFailedAuth(false);
    } catch (error) {
      setFailedAuth(true);
    }
  }, [token]);

  const handleClose = () => {
    setShow(null);
  };

  const submitVisit = (
    visit_id,
    coffeeshop_id,
    user_id,
    visited,
    on_wishlist,
    rating,
    review
  ) => {
    const visit = {
      visit_id,
      coffeeshop_id,
      user_id,
      visited,
      on_wishlist,
      rating,
      review,
    };

    if (!visit_id) {
      try {
        postUserVisit(token, visit);
        login();
      } catch (error) {
        setFailedAuth(true);
      }
    } else {
      try {
        editUserVisit(token, visit);
        login();
      } catch (error) {
        setFailedAuth(true);
      }
    }
  };

  useEffect(() => {
    if (token) {
      login();
    }
  }, [login, token]);

  if (!token || failedAuth) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return <main className="dashboard">Loading...</main>;
  }

  const been = visits.filter((visit) => {
    return visit.visited;
  });

  const wishlist = visits.filter((visit) => {
    return visit.on_wishlist;
  });

  return (
    <main className="profile">
      <div className="profile__wrapper">
        <h1 className="profile__title">Welcome back {user.username}</h1>
        {!show && (
          <>
            <button
              onClick={() => {
                setShow("been");
              }}
              className="profile__button">
              Where have I been?
            </button>
            <button
              onClick={() => {
                setShow("wishlist");
              }}
              className="profile__button">
              Where shall I go?
            </button>
            <button
              onClick={() => {
                setShow("all");
              }}
              className="profile__button">
              See all
            </button>
          </>
        )}
        {show === "been" && (
          <PlaceList
            places={been}
            handleClose={handleClose}
            page="profile"
            submitVisit={submitVisit}
            failedAuth={failedAuth}
            setFailedAuth={setFailedAuth}
          />
        )}

        {show === "wishlist" && (
          <PlaceList
            places={wishlist}
            handleClose={handleClose}
            page="profile"
            submitVisit={submitVisit}
            failedAuth={failedAuth}
            setFailedAuth={setFailedAuth}
          />
        )}

        {show === "all" && (
          <PlaceList
            places={visits}
            handleClose={handleClose}
            page="profile"
            submitVisit={submitVisit}
            failedAuth={failedAuth}
            setFailedAuth={setFailedAuth}
          />
        )}
      </div>
    </main>
  );
}
