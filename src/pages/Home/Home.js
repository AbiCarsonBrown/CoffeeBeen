import "./Home.scss";
import Map from "../../components/Map/Map";
import PlaceList from "../../components/PlaceList/PlaceList";
import { useCallback, useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import {
  fetchCoffeeShops,
  fetchUserVisits,
  postUserVisit,
  editUserVisit,
} from "../../utils/axios";
const geolib = require("geolib");

export default function Home({ showList, setShowList }) {
  const [coffeeShops, setCoffeeShops] = useState(null);
  const [userVisits, setUserVisits] = useState(null);
  const [isOpen, setIsOpen] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);
  const token = localStorage.getItem("token");
  const [center, setCenter] = useState({
    lat: 51.51385361476935,
    lng: -0.09835380168234278,
  });

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });
  useEffect(() => {
    if (coords) {
      setCenter({ lat: coords.latitude, lng: coords.longitude });
    }
  }, [coords]);

  const getCoffeeShops = useCallback(async () => {
    try {
      const { data } = await fetchCoffeeShops();
      if (coords) {
        data.forEach((place) => {
          place.distance =
            geolib.getDistance(
              { latitude: place.latitude, longitude: place.longitude },
              { latitude: coords.latitude, longitude: coords.longitude }
            ) / 1000;
        });
      } else {
        data.forEach((place) => {
          place.distance =
            Math.round(
              (geolib.getDistance(
                { latitude: place.latitude, longitude: place.longitude },
                { latitude: 51.51385361476935, longitude: -0.09835380168234278 }
              ) /
                1000) *
                10
            ) / 10;
        });
      }
      setCoffeeShops(data);
    } catch (error) {
      console.error(error);
    }
  }, [coords]);

  const getUserVisits = useCallback(async () => {
    setIsOpen(null);
    try {
      const { data } = await fetchUserVisits(token);
      if (coords) {
        data.forEach((place) => {
          place.distance =
            Math.round(
              (geolib.getDistance(
                { latitude: place.latitude, longitude: place.longitude },
                { latitude: coords.latitude, longitude: coords.longitude }
              ) /
                1000) *
                10
            ) / 10;
        });
      } else {
        data.forEach((place) => {
          place.distance =
            Math.round(
              (geolib.getDistance(
                { latitude: place.latitude, longitude: place.longitude },
                { latitude: 51.51385361476935, longitude: -0.09835380168234278 }
              ) /
                1000) *
                10
            ) / 10;
        });
      }
      setUserVisits(data);
    } catch (error) {
      setUserVisits(null);
    }
  }, [token, coords]);

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
        center={center}
        setCenter={setCenter}
        coords={coords}
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
