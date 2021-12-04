import React, { useEffect, useRef } from "react";
import { GlobalContext } from "../../contexts/Globals/GlobalProvider";

import "../../styles/Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSun,
  faMoon,
  faDiceD6,
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

  // useEffect(() => {
  //   if (state.modalOpen) {
  //     navRoot.current.style.display = "none";
  //   } else {
  //     navRoot.current.style.display = "block";
  //   }
  // }, [state.modalOpen]);

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
    }, 2000);
  };

  const setCloseNavAnimations = () => {
    navTop.current.style.transform = "translateX(-100vw)";
    navRight.current.style.transform = "translateY(-100vh)";
    navCoreIcon.current.style.transform = "rotate(-360deg) ";
    navThemeIcon.current.style.display = "none";
    if (state.themeDark) {
      navCoreIcon.current.style.color = "var(--color-dark-accent)";
    } else {
      navCoreIcon.current.style.color = "var(--color-bright-accent)";
    }
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
    if (state.notificationOpen) {
      return;
    }
    dispatch({ type: "toggle_nav" });
    if (state.navOpen) {
      setOpenNavAnimations();
    } else {
      setCloseNavAnimations();
      navElementHide();
    }
  };

  const toggleTheme = (ev) => {
    ev.preventDefault();
    dispatch({ type: "toggle_theme" });
    if (state.themeDark) {
      navCoreIcon.current.style.color = "var(--color-bright-bg)";
    } else {
      navCoreIcon.current.style.color = "var(--color-dark-bg)";
    }
  };

  return (
    <div
      ref={navRoot}
      className={
        "nav-root " +
        (state.navCoreOn && !state.modalOpen ? "view-on" : "view-off")
      }
    >
      <div
        ref={navTop}
        className={
          "nav-top " + (state.themeDark ? "theme-dark" : "theme-light")
        }
      >
        <div
          className="nav-open-icon tooltip"
          onClick={() => {
            dispatch({
              type: "toggle_chat_modal",
              payload: {
                chatModalOpen: true,
                modalOpen: true,
                contentModalOpen: false,
                notificationOn: true,
              },
            });
          }}
        >
          <span
            className={
              "tooltiptext-bottom " +
              (state.themeDark ? "theme-dark" : "theme-light")
            }
          >
            Visitor Chat
          </span>
          <FontAwesomeIcon
            className="nav-chat-icon"
            size="2x"
            icon={faDiceD6}
          />
        </div>
      </div>
      <div
        onClick={toggleNavState}
        className={"nav-core " + (state.navCoreOn ? "" : "view-off")}
      >
        <div ref={navCoreIcon} className="icon-div nav-core-icon-wrapper">
          <FontAwesomeIcon
            className={
              "nav-core-icon " + (state.notificationOpen ? "nav-disabled" : "")
            }
            size="3x"
            icon={faPlus}
          />
        </div>
      </div>
      <div
        ref={navRight}
        className={
          "nav-right " + (state.themeDark ? "theme-dark" : "theme-light")
        }
      >
        <div>{/* This div for making flex column work right */}</div>
        <div className="nav-page-elem-wrapper">
          <div className="nav-open-icon tooltip">
            <span
              className={
                "tooltiptext-left " +
                (state.themeDark ? "theme-dark" : "theme-light")
              }
            >
              Home
            </span>
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
          <div className="nav-open-icon tooltip">
            <span
              className={
                "tooltiptext-left " +
                (state.themeDark ? "theme-dark" : "theme-light")
              }
            >
              Portfolio
            </span>
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
          <div className="nav-open-icon tooltip">
            <span
              className={
                "tooltiptext-left " +
                (state.themeDark ? "theme-dark" : "theme-light")
              }
            >
              Unset
            </span>
            <a
              href="#hero"
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
          ref={navThemeIcon}
          onClick={toggleTheme}
          className="nav-open-icon nav-theme-icon-wrapper tooltip"
        >
          <span
            className={
              "tooltiptext-left " +
              (state.themeDark ? "theme-dark" : "theme-light")
            }
          >
            Theme
          </span>
          <FontAwesomeIcon
            className="nav-theme-icon"
            size="2x"
            icon={state.themeDark ? faMoon : faSun}
          />
        </div>
      </div>
    </div>
  );
}
