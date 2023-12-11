import "./App.css";
import Header from "./components/general/Header";
import Footer from "./components/general/Footer";
import Guidelines from "./components/guidelines/Guideline";
import HelpCenter from "./components/guidelines/helpCenter/HelpCenter";
import AboutUs from "./components/about/aboutUsPage";
import Blog from "./components/blog/BlogPage";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Onboarding from "./components/onboarding/Onboarding";
import Home from "./components/home/Home";
// import Game from "./components/home/game";
import GameDetail from "./components/home/GameDetail";
import GamePodcast from "./components/home/GamePodcast";
import GameStore from "./components/home/GameStore";
import GameCoin from "./components/home/GameCoin";
import LandingPage from "./components/landingPage/LandingPage";
import Carousel from "./components/general/uiElements/Carousel";
import { useState } from "react";
import OnboardSuccessPage from "./components/onboarding/OnboardSuccessPage";
import Settings from "./components/home/Settings";

function App() {
  const location = useLocation();
  const [dataIdx, setDataIdx] = useState(0);

  const chooseDataIdx = (dataIdx) => {
    setDataIdx(dataIdx);
  };

  return (
    <>
      {location.pathname !== "/on-boarding" &&
        location.pathname !== "/home" &&
        location.pathname !== "/onboard-success" &&
        location.pathname !== "/game" &&
        location.pathname !== "/game-detail" &&
        location.pathname !== "/podcast" &&
        location.pathname !== "/game-store" &&
        location.pathname !== "/settings" &&
        location.pathname !== "/game-coin" && <Header />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/guidelines"
          element={<Guidelines chooseDataIdx={chooseDataIdx} />}
        />
        <Route path="/helpcenter" element={<HelpCenter dindex={dataIdx} />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/on-boarding" element={<Onboarding />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/game" element={<Game />} /> */}
        <Route path="/game-detail" element={<GameDetail />} />
        <Route path="/podcast" element={<GamePodcast />} />
        <Route path="/game-store" element={<GameStore />} />
        <Route path="/game-coin" element={<GameCoin />} />
        <Route path="/carousel" element={<Carousel />} />
        <Route path="/onboard-success" element={<OnboardSuccessPage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      {location.pathname !== "/on-boarding" &&
        location.pathname !== "/home" &&
        location.pathname !== "/game" &&
        location.pathname !== "/game-detail" &&
        location.pathname !== "/onboard-success" &&
        location.pathname !== "/podcast" &&
        location.pathname !== "/game-store" &&
        location.pathname !== "/settings" &&
        location.pathname !== "/game-coin" && <Footer />}
    </>
  );
}

export default App;
