import "./Home.scss";
import Map from "../../components/Map/Map";
import PlaceList from "../../components/PlaceList/PlaceList";
import { useEffect, useState } from "react";
import { fetchCoffeeShops, fetchUserVisits } from "../../utils/axios";

export default function Home({ showList, setShowList }) {
  const [coffeeShops, setCoffeeShops] = useState(null);
  const [userVisits, setUserVisits] = useState(null);
  const [isOpen, setIsOpen] = useState(null);
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
    setIsOpen(null);
    try {
      const { data } = await fetchUserVisits(token);
      setUserVisits(data);
    } catch (error) {
      setUserVisits(null);
    }
  };

  useEffect(() => {
    getCoffeeShops();
    setShowList(false);
    if (token) {
      getUserVisits();
    }
  }, []);

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
      {userVisits && showList && (
        <PlaceList
          places={userVisits}
          handleClose={() => {
            setShowList(false);
          }}
          getCoffeeShops={getCoffeeShops}
          getUserVisits={getUserVisits}
        />
      )}
      {!userVisits && showList && (
        <PlaceList
          places={coffeeShops}
          handleClose={() => {
            setShowList(false);
          }}
          getCoffeeShops={getCoffeeShops}
          getUserVisits={getUserVisits}
        />
      )}
    </main>
  );
}
