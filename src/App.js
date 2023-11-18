import "./styles/App.scss";
import Map from "./components/Map/Map";
import CoffeeShop from "./pages/CoffeeShop/CoffeeShop";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <p>CoffeeBeen</p>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Map />}></Route>
          <Route path="/coffeeshop/:id" element={<CoffeeShop />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
