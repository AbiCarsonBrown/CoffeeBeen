import "./styles/App.scss";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const center = { lat: 51.507744, lng: -0.119071 };
  // useMemo?

  const markers = [
    { lat: 51.5263922, lng: -0.083686 },
    { lat: 51.5165186, lng: -0.1441735 },
    { lat: 51.5128716, lng: -0.1299463 },
    { lat: 51.4618726, lng: -0.1414161 },
    { lat: 51.5357429, lng: -0.1279246 },
  ];

  return (
    <div className="App">
      <p>CoffeeBeen</p>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={12.5}>
          {markers.map(({ lat, lng }) => (
            <MarkerF position={{ lat, lng }} />
          ))}
        </GoogleMap>
      )}
    </div>
  );
}

export default App;
