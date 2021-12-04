import React, { useRef, useEffect } from "react";
import { GlobalContext } from "../contexts/Globals/GlobalProvider";

import "../styles/App.css";
import Hero from "./Hero";
import Navigation from "./utilities/Navigation";
import PortfolioGrid from "./PortfolioGrid";
import ContentModal from "./modals/ContentModal";
import ChatModal from "./modals/ChatModal";
import Footer from "./Footer";
import Notification from "./utilities/Notification";
import ChatOptions from "./modals/ChatOptions";

function App() {
  // Welcome Log
  const [state, dispatch, socket] = React.useContext(GlobalContext);

  useEffect(() => {
    console.log(
      "Hey there, fellow developer! You can checkout the code repository for this website at https://github.com/djroxx2000/my-portfolio, if it interests you. Thanks for visiting. Have a lovely day ahead!"
    );

    socket.on("game-invite", (payload) => {
      dispatch({
        type: "toggle_notification",
        payload: {
          notificationOpen: 2,
          notificationMsg: `${payload.username} is inviting you to ${payload.game}`,
          navCoreOn: false,
        },
      });
      dispatch({
        type: "game_invite",
        payload: {
          opponentId: payload.userId,
          curGame: payload.game,
        },
      });
    });

    socket.on("userMessage", (payload) => {
      dispatch({
        type: "toggle_notification",
        payload: {
          notificationOpen: 1,
          notificationMsg: `${payload.username}: ${payload.message}`,
          navCoreOn: false,
        },
      });
      console.log(payload);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Notification />
      <ContentModal />
      <ChatModal />
      <ChatOptions />
      <div>
        <Navigation />
      </div>
      <div ref={hero}>
        <Hero />
      </div>
      <div ref={portfolio}>
        <PortfolioGrid />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
