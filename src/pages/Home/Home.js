import "./Home.scss";
import Map from "../../components/Map/Map";
import PlaceList from "../../components/PlaceList/PlaceList";

export default function Home({ showList }) {
  return (
    <main className="home">
      <Map />
      {showList && <PlaceList />}
    </main>
  );
}
