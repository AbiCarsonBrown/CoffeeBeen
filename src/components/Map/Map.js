import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import marker from "../../assets/icons/marker-brown.svg";
import "./Map.scss";
import { useEffect, useState } from "react";
import { fetchCoffeeShops } from "../../utils/axios";
import { Link } from "react-router-dom";

export default function Map() {
  const [coffeeShops, setCoffeeShops] = useState(null);
  const [isOpen, setIsOpen] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const center = { lat: 51.507744, lng: -0.119071 };
  // useMemo?
  // recentre when coffeeshop clicked

  const getCoffeeShops = async () => {
    try {
      const { data } = await fetchCoffeeShops();
      setCoffeeShops(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCoffeeShops();
  }, []);

  const handleInfoOpen = (id) => {
    setIsOpen(id);
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
    styles: [
      {
        featureType: "poi",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "poi.park",
        stylers: [{ visibility: "simplified" }, { color: "#bbccbb" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "road",
        elementType: "labels.text",
        stylers: [{ visibility: "simplified" }],
      },
      {
        featureType: "road.local",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "road",
        stylers: [{ color: "#ece0d1" }],
      },
      {
        featureType: "landscape.man_made",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit.line",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "water",
        stylers: [{ color: "#7d92a5" }],
      },
    ],
  };

  return (
    <>
      {!isLoaded || !coffeeShops ? (
        <main>
          <h1>Loading...</h1>
        </main>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          options={options}
          zoom={14}>
          {coffeeShops.map(({ id, coffeeshop_name, latitude, longitude }) => {
            return (
              <MarkerF
                key={id}
                icon={marker}
                position={{
                  lat: Number(latitude),
                  lng: Number(longitude),
                }}
                onClick={() => handleInfoOpen(id)}>
                {isOpen === id && (
                  <InfoWindowF>
                    <Link to={`/coffeeshop/${id}`}>{coffeeshop_name}</Link>
                  </InfoWindowF>
                )}
              </MarkerF>
            );
          })}
        </GoogleMap>
      )}
    </>
  );
}
