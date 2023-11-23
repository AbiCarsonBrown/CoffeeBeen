import "./Profile.scss";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { fetchUser } from "../../utils/axios";
import PlaceList from "../../components/PlaceList/PlaceList";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [failedAuth, setFailedAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [visits, setVisits] = useState(null);
  const [show, setShow] = useState(null);
  const token = localStorage.getItem("token");

  const login = async () => {
    try {
      const { data } = await fetchUser(token);
      setUser(data[0]);
      setVisits(data[1]);
      setIsLoading(false);
      setFailedAuth(false);
    } catch (error) {
      setFailedAuth(true);
    }
  };

  const handleClose = () => {
    setShow(null);
  };

  useEffect(() => {
    if (token) {
      login();
    }
  }, []);

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
    <main>
      <p>Welcome back {user.username}</p>
      {!show && (
        <>
          <button
            onClick={() => {
              setShow("been");
            }}>
            Been
          </button>
          <button
            onClick={() => {
              setShow("wishlist");
            }}>
            Wishlist
          </button>
        </>
      )}
      {show === "been" && <PlaceList places={been} handleClose={handleClose} />}

      {show === "wishlist" && (
        <PlaceList places={wishlist} handleClose={handleClose} />
      )}
      {/* list of visited coffee shops */}
      {/* coffee shop wishlist */}
      {/* on each list item, the option to add to "been" or wishlist and add/edit review & rating */}
    </main>
  );
}
