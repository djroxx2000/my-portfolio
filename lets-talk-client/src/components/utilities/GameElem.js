import React, { useRef } from "react";
import { GlobalContext } from "../../contexts/Globals/GlobalProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../styles/GameElem.css";

export default function GameElem({ title, description, icon }) {
  const [state] = React.useContext(GlobalContext);

  const separator = useRef(null);
  const overlay = useRef(null);

  return (
    <div
      className={
        "game-elem " + (state.themeDark ? "theme-dark" : "theme-light")
      }
    >
      <div
        className={
          "game-elem-overlay " +
          (state.themeDark ? "theme-dark" : "theme-light")
        }
        ref={overlay}
      ></div>
      <div className="game-elem-title">
        {icon ? (
          <FontAwesomeIcon
            className={"game-elem-title-icon"}
            size="2x"
            icon={icon}
          />
        ) : null}
        {title}
      </div>
      <div
        ref={separator}
        className={
          "game-elem-separator " +
          (description ? "view-on " : "view-off ") +
          (state.themeDark ? "theme-dark" : "theme-light")
        }
      ></div>
      <div>{description}</div>
    </div>
  );
}
