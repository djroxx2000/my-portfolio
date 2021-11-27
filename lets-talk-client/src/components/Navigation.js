import React, { useEffect, useRef } from "react";
import { GlobalContext } from "../contexts/Globals/GlobalProvider";

import "../styles/Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSun,
  faMoon,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";

export default function Navigation() {
  const [state, dispatch] = React.useContext(GlobalContext);

  const navRoot = useRef(null);
  const navTop = useRef(null);
  const navRight = useRef(null);
  const navCoreIcon = useRef(null);
  const navThemeIcon = useRef(null);

  useEffect(() => {
    navElementHide();
  }, []);

  useEffect(() => {
    if (state.modalOpen) {
      navRoot.current.style.display = "none";
    } else {
      navRoot.current.style.display = "block";
    }
  }, [state.modalOpen]);

  const setOpenNavAnimations = () => {
    navTop.current.style.transform = "translateX(0)";
    navRight.current.style.transform = "translateY(0)";
    navCoreIcon.current.style.transform = "rotate(45deg)";
    if (state.themeDark) {
      navCoreIcon.current.style.color = "var(--color-dark-bg)";
    } else {
      navCoreIcon.current.style.color = "var(--color-bright-bg)";
    }
    setTimeout(() => {
      navElementShow();
    }, 2500);
  };

  const setCloseNavAnimations = () => {
    navTop.current.style.transform = "translateX(-100vw)";
    navRight.current.style.transform = "translateY(-100vh)";
    navCoreIcon.current.style.transform = "rotate(-360deg) ";
    navThemeIcon.current.style.display = "none";
    setTimeout(() => {
      if (state.themeDark) {
        navCoreIcon.current.style.color = "var(--color-dark-accent)";
      } else {
        navCoreIcon.current.style.color = "var(--color-bright-accent)";
      }
    }, 2500);
  };

  const navElementShow = () => {
    const navPageIcons = document.getElementsByClassName("nav-open-icon");
    for (let elem of navPageIcons) {
      elem.style.display = "block";
    }
  };

  const navElementHide = () => {
    const navPageIcons = document.getElementsByClassName("nav-open-icon");
    for (let elem of navPageIcons) {
      elem.style.display = "none";
    }
  };

  const toggleNavState = (ev) => {
    ev.preventDefault();
    dispatch({ type: "toggle_nav" });
    console.log(state.navOpen);
    if (state.navOpen) {
      setOpenNavAnimations();
    } else {
      setCloseNavAnimations();
      navElementHide();
    }
  };

  const toggleTheme = (ev) => {
    ev.preventDefault();
    console.log("theme toggle");
    dispatch({ type: "toggle_theme" });
    console.log(state.themeDark);
    if (!state.themeDark) {
      navTop.current.style.background = "var(--color-dark-accent)";
      navTop.current.style.color = "var(--color-dark-bg)";
      navRight.current.style.background = "var(--color-dark-accent)";
      navRight.current.style.color = "var(--color-dark-bg)";
      navCoreIcon.current.style.color = "var(--color-dark-bg)";
    } else {
      navTop.current.style.background = "var(--color-bright-accent)";
      navTop.current.style.color = "var(--color-bright-bg)";
      navRight.current.style.background = "var(--color-bright-accent)";
      navRight.current.style.color = "var(--color-bright-bg)";
      navCoreIcon.current.style.color = "var(--color-bright-bg)";
    }
    // navTop.current.style.background = "var(--color-bright-accent)";
  };

  return (
    <div ref={navRoot} className="nav-root">
      <div ref={navTop} className="nav-top">
        <div
          ref={navThemeIcon}
          onClick={toggleTheme}
          className="icon-div nav-open-icon nav-theme-icon-wrapper"
        >
          <FontAwesomeIcon
            className="nav-theme-icon"
            size="2x"
            icon={state.themeDark ? faMoon : faSun}
          />
        </div>
      </div>
      <div onClick={toggleNavState} className="nav-core">
        <div ref={navCoreIcon} className="icon-div nav-core-icon-wrapper">
          <FontAwesomeIcon className="nav-core-icon" size="3x" icon={faPlus} />
        </div>
      </div>
      <div ref={navRight} className="nav-right">
        <div>{/* This div for making flex column work right */}</div>
        <div className="nav-page-elem-wrapper">
          <div className="nav-open-icon">
            <a
              href="#hero"
              onClick={() => {
                dispatch({ type: "click_nav" });
              }}
            >
              <FontAwesomeIcon
                className="nav-page-icon"
                size="lg"
                icon={faEthereum}
              />
            </a>
          </div>
          <div className="nav-open-icon">
            <a
              href="#portfolio"
              className="nav-open-icon"
              onClick={() => {
                dispatch({ type: "click_nav" });
              }}
            >
              <FontAwesomeIcon
                className="nav-page-icon"
                size="lg"
                icon={faEthereum}
              />
            </a>
          </div>
          <div className="nav-open-icon">
            <a
              href="#"
              className="nav-open-icon"
              onClick={() => {
                dispatch({ type: "click_nav" });
              }}
            >
              <FontAwesomeIcon
                className="nav-page-icon"
                size="lg"
                icon={faEthereum}
              />
            </a>
          </div>
        </div>
        <div
          className="nav-open-icon"
          onClick={() => {
            dispatch({ type: "toggle_modal" });
          }}
        >
          <FontAwesomeIcon
            className="nav-chat-icon"
            size="2x"
            icon={faComments}
          />
        </div>
      </div>
    </div>
  );
}
