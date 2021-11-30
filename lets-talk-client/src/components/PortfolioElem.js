import React, { useRef } from "react";
import { GlobalContext } from "../contexts/Globals/GlobalProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../styles/PortfolioElem.css";

export default function PortfolioElem({ title, description, icon }) {
  const [state] = React.useContext(GlobalContext);

  const separator = useRef(null);
  const overlay = useRef(null);

  return (
    <div
      className={
        "portfolio-elem " + (state.themeDark ? "theme-dark" : "theme-light")
      }
    >
      <div
        className={
          "portfolio-elem-overlay " +
          (state.themeDark ? "theme-dark" : "theme-light")
        }
        ref={overlay}
      ></div>
      <div className="portfolio-elem-title">
        {icon ? (
          <FontAwesomeIcon
            className={"portfolio-elem-title-icon"}
            size="2x"
            icon={icon}
          />
        ) : null}
        {title}
      </div>
      <div
        ref={separator}
        className={
          "portfolio-elem-separator " +
          (description ? "view-on " : "view-off ") +
          (state.themeDark ? "theme-dark" : "theme-light")
        }
      ></div>
      <div>{description}</div>
    </div>
  );
}
