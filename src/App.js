import "./styles/App.scss";
import Map from "./components/Map/Map";
import CoffeeShop from "./pages/CoffeeShop/CoffeeShop";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Map />}></Route>
          <Route path="/coffeeshop/:coffeeShopId" element={<CoffeeShop />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
