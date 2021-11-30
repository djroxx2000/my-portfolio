import React, { useRef, useEffect } from "react";
import { GlobalContext } from "../contexts/Globals/GlobalProvider";

import "../styles/App.css";
import Hero from "./Hero";
import Navigation from "./Navigation";
import PortfolioGrid from "./PortfolioGrid";
import ContentModal from "./ContentModal";
import ChatModal from "./ChatModal";

function App() {
  // Welcome Log
  useEffect(() => {
    console.log(
      "Hey there, fellow developer! You can checkout the code repository for this website at https://github.com/djroxx2000/my-portfolio, if it interests you. Thanks for visiting. Have a lovely day ahead!"
    );
  }, []);

  const [state] = React.useContext(GlobalContext);
  const hero = useRef(null);
  const portfolio = useRef(null);

  useEffect(() => {
    scrollToComponent();
  }, [state.navClick]);

  useEffect(() => {
    if (state.themeDark) {
      document.documentElement.style.background = "var(--color-dark-bg)";
      document.getElementById("favicon").href = "./favicon_dark.ico";
    } else {
      document.documentElement.style.background = "var(--color-bright-bg)";
      document.getElementById("favicon").href = "./favicon_light.ico";
    }
  }, [state.themeDark]);

  const scrollToComponent = () => {
    switch (window.location.hash) {
      case "#hero":
        hero.current.scrollIntoView();
        hero.current.focus();
        break;
      case "#portfolio":
        portfolio.current.scrollIntoView();
        portfolio.current.focus();
        break;
      default:
        hero.current.scrollIntoView();
        hero.current.focus();
    }
  };

  return (
    <div className={"App " + (state.themeDark ? "theme-dark" : "theme-light")}>
      <ContentModal />
      <ChatModal />
      <div>
        <Navigation />
      </div>
      <div ref={hero}>
        <Hero />
      </div>
      <div ref={portfolio}>
        <PortfolioGrid />
      </div>
    </div>
  );
}

export default App;
