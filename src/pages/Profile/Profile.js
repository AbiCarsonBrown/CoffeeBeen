import "./Profile.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../../utils/axios";
import PlaceList from "../../components/PlaceList/PlaceList";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [visits, setVisits] = useState(null);
  const [show, setShow] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const login = async () => {
    try {
      const { data } = await fetchUser(token);
      setUser(data[0]);
      setVisits(data[1]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  };

  const handleClose = () => {
    setShow(null);
  };

  useEffect(() => {
    login();
  }, []);

  if (!token) {
    return navigate("/login");
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
