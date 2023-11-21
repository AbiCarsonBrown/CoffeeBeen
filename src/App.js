import "./styles/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Map from "./components/Map/Map";
import CoffeeShop from "./pages/CoffeeShop/CoffeeShop";
import Header from "./components/Header/Header";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Map />}></Route>
          <Route path="/coffeeshop/:coffeeShopId" element={<CoffeeShop />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
