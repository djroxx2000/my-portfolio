import React, { useEffect } from "react";
import { GlobalContext } from "../contexts/Globals/GlobalProvider";

import TypeWriter from "typewriter-effect";
import "../styles/Hero.css";

export default function Hero() {
  const [state] = React.useContext(GlobalContext);

  useEffect(() => {
    const typeCursor = document.getElementsByClassName("Typewriter__cursor")[0];
    if (state.themeDark) {
      typeCursor.style.color = "var(--color-dark-accent)";
    } else {
      typeCursor.style.color = "var(--color-bright-accent)";
    }
  }, [state.themeDark]);

  const greetings = [
    "<span>hi</span>.",
    "<span>नमस्ते</span>.",
    "<span>bonjour</span>.",
    "<span>guten tag</span>.",
    "<span>ನಮಸ್ತೆ</span>.",
  ];
  return (
    <div
      className={
        "hero " +
        (state.themeDark ? "theme-dark " : "theme-light ") +
        (state.modalOpen ? "blur-all" : "")
      }
    >
      <div className="hero-title">
        <TypeWriter
          className="typewriter"
          options={{
            strings: greetings,
            autoStart: true,
            loop: true,
            pauseFor: 4000,
            delay: 150,
            deleteSpeed: 85,
          }}
        />
        <span>i’m</span>
        <br />
        <span>dhananjay shettigar</span>.👋🏽
      </div>
      <div className="intro-para intro">
        I'm a budding software developer with a passion to learn new things and
        deepdive into theoretical topics yet to be brought to life. I'm at
        juspay working on complex financial instruments enabling millions of
        daily transactions. Wanna chat?
      </div>
      <div className="email-button">
        <a
          href="mailto:dhananjay.shettigar2252000@gmail.com"
          className={
            "btn-mail " + (state.themeDark ? "theme-dark " : "theme-light ")
          }
        >
          <span>Hit me up</span>
        </a>
      </div>
    </div>
  );
}
