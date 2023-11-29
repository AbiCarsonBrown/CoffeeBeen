import "./Map.scss";
import visitedPin from "../../assets/icons/marker-visited.svg";
import notVisitedPin from "../../assets/icons/marker-not-visited.svg";
import locationPin from "../../assets/icons/location-icon.svg";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { Link } from "react-router-dom";
import { options } from "../../utils/GoogleMapsStyles";
import { useGeolocated } from "react-geolocated";
import { useEffect, useState } from "react";

export default function Map({ coffeeShops, userVisits, isOpen, setIsOpen }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const [center, setCenter] = useState({ lat: 51.507744, lng: -0.119071 });

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

  const handleInfoOpen = (id, latitude, longitude) => {
    setIsOpen(id);
    setCenter({ lat: latitude, lng: longitude });
  };

  let userVisited = null;
  let notVisited = null;

  if (userVisits) {
    userVisited = userVisits.filter((place) => place.visited);
    notVisited = userVisits.filter((place) => !place.visited);
  }

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <GoogleMap
      mapContainerClassName="map-container"
      center={center}
      options={options}
      zoom={14.5}>
      {!userVisits &&
        coffeeShops.map(
          ({ coffeeshop_id, coffeeshop_name, latitude, longitude }) => {
            return (
              <MarkerF
                key={coffeeshop_id}
                icon={notVisitedPin}
                position={{
                  lat: Number(latitude),
                  lng: Number(longitude),
                }}
                onClick={() =>
                  handleInfoOpen(
                    coffeeshop_id,
                    Number(latitude),
                    Number(longitude)
                  )
                }>
                {isOpen === coffeeshop_id && (
                  <InfoWindowF>
                    <Link to={`/places/${coffeeshop_id}`}>
                      {coffeeshop_name}
                    </Link>
                  </InfoWindowF>
                )}
              </MarkerF>
            );
          }
        )}
      {userVisited &&
        userVisited.map(
          ({ coffeeshop_id, coffeeshop_name, latitude, longitude }) => {
            return (
              <MarkerF
                key={coffeeshop_id}
                icon={visitedPin}
                position={{
                  lat: Number(latitude),
                  lng: Number(longitude),
                }}
                onClick={() =>
                  handleInfoOpen(
                    coffeeshop_id,
                    Number(latitude),
                    Number(longitude)
                  )
                }>
                {isOpen === coffeeshop_id && (
                  <InfoWindowF>
                    <Link to={`/places/${coffeeshop_id}`}>
                      {coffeeshop_name}
                    </Link>
                  </InfoWindowF>
                )}
              </MarkerF>
            );
          }
        )}
      {notVisited &&
        notVisited.map(
          ({ coffeeshop_id, coffeeshop_name, latitude, longitude }) => {
            return (
              <MarkerF
                key={coffeeshop_id}
                icon={notVisitedPin}
                position={{
                  lat: Number(latitude),
                  lng: Number(longitude),
                }}
                onClick={() =>
                  handleInfoOpen(
                    coffeeshop_id,
                    Number(latitude),
                    Number(longitude)
                  )
                }>
                {isOpen === coffeeshop_id && (
                  <InfoWindowF>
                    <Link to={`/places/${coffeeshop_id}`}>
                      {coffeeshop_name}
                    </Link>
                  </InfoWindowF>
                )}
              </MarkerF>
            );
          }
        )}
      {coords && (
        <MarkerF
          icon={locationPin}
          position={{
            lat: coords.latitude,
            lng: coords.longitude,
          }}></MarkerF>
      )}
    </GoogleMap>
  );
}
