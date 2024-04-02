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
import Loading from "../Loading/Loading";

export default function Map({
  coffeeShops,
  userVisits,
  isOpen,
  setIsOpen,
  center,
  setCenter,
  coords,
}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const handleInfoOpen = async (id, latitude, longitude) => {
    await setCenter({ lat: latitude, lng: longitude });
    setIsOpen(id);
  };

  let userVisited = null;
  let notVisited = null;

  if (userVisits) {
    userVisited = userVisits.filter((place) => place.visited);
    notVisited = userVisits.filter((place) => !place.visited);
  }

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <GoogleMap
      mapContainerClassName="map-container"
      center={center}
      options={options}
      zoom={14.5}>
      {!userVisits &&
        coffeeShops.map(
          ({
            coffeeshop_id,
            coffeeshop_name,
            latitude,
            longitude,
            distance,
          }) => {
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
                    Number(longitude),
                    distance
                  )
                }>
                {isOpen === coffeeshop_id && (
                  <InfoWindowF>
                    <>
                      <Link to={`/places/${coffeeshop_id}`}>
                        {coffeeshop_name}
                      </Link>
                      {coords && <p>{distance} km away</p>}
                    </>
                  </InfoWindowF>
                )}
              </MarkerF>
            );
          }
        )}
      {userVisited &&
        userVisited.map(
          ({
            coffeeshop_id,
            coffeeshop_name,
            latitude,
            longitude,
            distance,
          }) => {
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
                    Number(longitude),
                    distance
                  )
                }>
                {isOpen === coffeeshop_id && (
                  <InfoWindowF>
                    <>
                      <Link to={`/places/${coffeeshop_id}`}>
                        {coffeeshop_name}
                      </Link>
                      {coords && <p>{distance} km away</p>}
                    </>
                  </InfoWindowF>
                )}
              </MarkerF>
            );
          }
        )}
      {notVisited &&
        notVisited.map(
          ({
            coffeeshop_id,
            coffeeshop_name,
            latitude,
            longitude,
            distance,
          }) => {
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
                    Number(longitude),
                    distance
                  )
                }>
                {isOpen === coffeeshop_id && (
                  <InfoWindowF>
                    <>
                      <Link to={`/places/${coffeeshop_id}`}>
                        {coffeeshop_name}
                      </Link>
                      {coords && <p>{distance} km away</p>}
                    </>
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
