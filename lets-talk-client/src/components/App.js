import React, { useRef, useEffect } from "react";
import { GlobalContext } from "../contexts/Globals/GlobalProvider";

import "../styles/App.css";
import Hero from "./Hero";
import Navigation from "./Navigation";
import PortfolioGrid from "./PortfolioGrid";
import PageModal from "./PageModal";

function App() {
  const [state, _] = React.useContext(GlobalContext);
  const hero = useRef(null);
  const portfolio = useRef(null);

  useEffect(() => {
    scrollToComponent();
  }, [state.navClick]);

  useEffect(() => {
    if (state.themeDark) {
      document.documentElement.style.background = "var(--color-dark-bg)";
    } else {
      document.documentElement.style.background = "var(--color-bright-bg)";
    }
  }, [state.themeDark]);

  const scrollToComponent = () => {
    let component = window.location.hash;
    switch (window.location.hash) {
      case "#hero":
        hero.current.scrollIntoView();
        hero.current.focus();
        break;
      case "#portfolio":
        portfolio.current.scrollIntoView();
        portfolio.current.focus();
        break;
    }
  };

  return (
    <div className={"App " + (state.themeDark ? "theme-dark" : "theme-light")}>
      <PageModal />
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
