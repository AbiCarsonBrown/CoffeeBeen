import "./Home.scss";
import Map from "../../components/Map/Map";
import PlaceList from "../../components/PlaceList/PlaceList";
import { useEffect, useState } from "react";
import { fetchCoffeeShops, fetchUserVisits } from "../../utils/axios";

export default function Home({ showList, handleShowList }) {
  const [coffeeShops, setCoffeeShops] = useState(null);
  const [userVisits, setUserVisits] = useState(null);
  const token = localStorage.getItem("token");

  const getCoffeeShops = async () => {
    try {
      const { data } = await fetchCoffeeShops();
      setCoffeeShops(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserVisits = async () => {
    try {
      const { data } = await fetchUserVisits(token);
      setUserVisits(data);
    } catch (error) {
      setUserVisits(null);
    }
  };

  useEffect(() => {
    getCoffeeShops();
    if (token) {
      getUserVisits();
    }
  }, []);

  if (!coffeeShops) {
    return <main>Loading..</main>;
  }

  return (
    <main className="home">
      <Map coffeeShops={coffeeShops} userVisits={userVisits} />
      {userVisits && showList && (
        <PlaceList places={userVisits} handleClose={handleShowList} />
      )}
      {!userVisits && showList && (
        <PlaceList places={coffeeShops} handleClose={handleShowList} />
      )}
    </main>
  );
}
