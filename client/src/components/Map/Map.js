import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import coffeeCup from "../../assets/icons/coffee-to-go.svg";

export default function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const center = { lat: 51.507744, lng: -0.119071 };
  // useMemo?

  const visited = [
    { lat: 51.5357429, lng: -0.1279246 },
    { lat: 51.5066218, lng: -0.0911243 },
  ];

  const notVisited = [
    { address: "address 1", lat: 51.5263922, lng: -0.083686 },
    { address: "address 2", lat: 51.5165186, lng: -0.1441735 },
    { address: "address 3", lat: 51.5128716, lng: -0.1299463 },
  ];

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
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          options={options}
          zoom={14}>
          {visited.map(({ lat, lng }) => (
            <MarkerF position={{ lat, lng }} />
          ))}
          {notVisited.map(({ lat, lng }) => (
            <MarkerF
              position={{ lat, lng }}
              icon={coffeeCup}
              className="not-visited__marker"
            />
          ))}
        </GoogleMap>
      )}
    </>
  );
}
