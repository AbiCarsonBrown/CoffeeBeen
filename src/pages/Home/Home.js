import "./Home.scss";
import Map from "../../components/Map/Map";
import PlaceList from "../../components/PlaceList/PlaceList";
import { useCallback, useEffect, useState } from "react";
import {
  fetchCoffeeShops,
  fetchUserVisits,
  postUserVisit,
  editUserVisit,
} from "../../utils/axios";

export default function Home({ showList, setShowList }) {
  const [coffeeShops, setCoffeeShops] = useState(null);
  const [userVisits, setUserVisits] = useState(null);
  const [isOpen, setIsOpen] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);
  const token = localStorage.getItem("token");

  const getCoffeeShops = useCallback(async () => {
    try {
      const { data } = await fetchCoffeeShops();
      setCoffeeShops(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getUserVisits = useCallback(async () => {
    setIsOpen(null);
    try {
      const { data } = await fetchUserVisits(token);
      setUserVisits(data);
    } catch (error) {
      setUserVisits(null);
    }
  }, [token]);

  const submitVisit = async (
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
        await postUserVisit(token, visit);
        getCoffeeShops();
        getUserVisits();
      } catch (error) {
        setFailedAuth(true);
      }
    } else {
      try {
        await editUserVisit(token, visit);
        getCoffeeShops();
        getUserVisits();
      } catch (error) {
        setFailedAuth(true);
      }
    }
  };

  useEffect(() => {
    getCoffeeShops();
    setShowList(false);
    if (token) {
      getUserVisits();
    }
  }, [getCoffeeShops, getUserVisits, setShowList, token]);

  if (!coffeeShops) {
    return <main>Loading..</main>;
  }

  return (
    <main className="home">
      <Map
        coffeeShops={coffeeShops}
        userVisits={userVisits}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      {showList && (
        <PlaceList
          places={userVisits ? userVisits : coffeeShops}
          handleClose={() => {
            setShowList(false);
          }}
          page="home"
          submitVisit={submitVisit}
          failedAuth={failedAuth}
          setFailedAuth={setFailedAuth}
        />
      )}
    </main>
  );
}
