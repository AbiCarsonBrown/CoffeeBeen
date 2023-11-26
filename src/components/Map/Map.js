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

export default function Map({ coffeeShops, userVisits, isOpen, setIsOpen }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const center = { lat: 51.507744, lng: -0.119071 };

  const handleInfoOpen = (id) => {
    setIsOpen(id);
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: false,
    backgroundColor: "#010402",
    styles: [
      {
        featureType: "poi",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "poi.park",
        stylers: [{ visibility: "simplified" }, { color: "#594b47" }],
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
        stylers: [{ color: "#f5ddd1" }],
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
        stylers: [{ color: "#eba2d2" }],
      },
      {
        featureType: "administrative",
        stylers: [{ color: "#f7fdf9" }],
      },
    ],
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
                height="50rem"
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
                height="50rem"
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
                height="50rem"
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
