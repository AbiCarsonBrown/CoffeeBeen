import "./styles/App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import CoffeeShop from "./pages/CoffeeShop/CoffeeShop";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Footer from "./components/Footer/Footer";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import { useState } from "react";

function App() {
  const [showList, setShowList] = useState(false);
  const handleShowList = () => {
    setShowList(!showList);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header handleShowList={handleShowList} showList={showList} />
        <Routes>
          <Route
            path="/"
            element={<Home showList={showList} setShowList={setShowList} />}
          />
          <Route path="/places" element={<Navigate to="/" />} />
          <Route path="/places/:coffeeShopId" element={<CoffeeShop />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
