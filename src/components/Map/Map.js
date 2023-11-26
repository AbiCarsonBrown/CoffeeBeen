import "./Map.scss";
import visitedPin from "../../assets/icons/marker-visited.svg";
import notVisitedPin from "../../assets/icons/marker-not-visited.svg";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { Link } from "react-router-dom";
import { options } from "../../utils/GoogleMapsStyles";

export default function Map({ coffeeShops, userVisits, isOpen, setIsOpen }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const center = { lat: 51.507744, lng: -0.119071 };

  const handleInfoOpen = (id) => {
    setIsOpen(id);
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
      zoom={14}>
      {!userVisits &&
        coffeeShops.map(
          ({ coffeeshop_id, coffeeshop_name, latitude, longitude }) => {
            return (
              <MarkerF
                key={coffeeshop_id}
                icon={notVisitedPin}
                height="100rem"
                position={{
                  lat: Number(latitude),
                  lng: Number(longitude),
                }}
                onClick={() => handleInfoOpen(coffeeshop_id)}>
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
                height="100rem"
                position={{
                  lat: Number(latitude),
                  lng: Number(longitude),
                }}
                onClick={() => handleInfoOpen(coffeeshop_id)}>
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
                height="100rem"
                position={{
                  lat: Number(latitude),
                  lng: Number(longitude),
                }}
                onClick={() => handleInfoOpen(coffeeshop_id)}>
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
    </GoogleMap>
  );
}
