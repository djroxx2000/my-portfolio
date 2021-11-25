import React, { useState, useRef } from "react";
import { GlobalContext } from "../contexts/Globals/GlobalProvider";

import "../styles/Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Navigation() {
  const [state, dispatch] = React.useContext(GlobalContext);
  const [navOpen, setNavOpen] = useState(false);

  const navTop = useRef(null);
  const navCoreIcon = useRef(null);
  const navRight = useRef(null);

  const setOpenNavAnimations = () => {
    navTop.current.style.animation = "fadeInLeft 4s ease-in infinite";
    navCoreIcon.current.style.animation = "rotateAntiClock 4s ease-in infinite";
    navRight.current.style.animation = "fadeInDown 4s ease-in infinite";
  };

  const setCloseNavAnimations = () => {
    navTop.current.style.animation = "fadeOutRight 4s ease-in infinite";
    navCoreIcon.current.style.animation = "rotateClock 4s ease-in infinite";
    navRight.current.style.animation = "fadeOutUp 4s ease-in infinite";
  };

  const removeNavAnimations = () => {
    navTop.current.style.animation = "";
    navCoreIcon.current.style.animation = "";
    navRight.current.style.animation = "";
  };

  const adjustNavStyles = () => {
    if (navOpen) {
      navTop.current.style.opacity = "0";
      navRight.current.style.opacity = "0";
      navCoreIcon.current.style.transform = "rotate(0deg)";
      navCoreIcon.current.style.color = "orange";
    } else {
      navTop.current.style.opacity = "1";
      navRight.current.style.opacity = "1";
      navCoreIcon.current.style.transform = "rotate(315deg)";
      navCoreIcon.current.style.color = "black";
    }
  };

  const toggleNavState = (ev) => {
    ev.preventDefault();
    if (navOpen) {
      setCloseNavAnimations();
    } else {
      setOpenNavAnimations();
    }
    setNavOpen(!navOpen);
    if (!navOpen) {
      adjustNavStyles();
    }
    setTimeout(() => {
      removeNavAnimations();
      if (navOpen) {
        adjustNavStyles();
      }
    }, 4000);
  };

  return (
    <div className="nav-root">
      <div ref={navTop} className="nav-top"></div>
      <div onClick={toggleNavState} className="nav-core">
        <div ref={navCoreIcon} className="nav-core-icon-wrapper">
          <FontAwesomeIcon className="nav-core-icon" size="3x" icon={faPlus} />
        </div>
      </div>
      <div ref={navRight} className="nav-right"></div>
    </div>
  );
}
