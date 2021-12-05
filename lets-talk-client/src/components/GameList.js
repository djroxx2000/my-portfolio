import React, { useEffect } from "react";
import { GlobalContext } from "../contexts/Globals/GlobalProvider";

import GameElem from "./utilities/GameElem";
import "../styles/GameList.css";

export default function GameGrid() {
  const [state, dispatch] = React.useContext(GlobalContext);

  useEffect(() => {
    const elems = document.getElementsByClassName("game-elem");
    for (let elem of elems) {
      if (state.themeDark) {
        elem.classList.remove("theme-light");
        elem.classList.add("theme-dark");
      } else {
        elem.classList.remove("theme-dark");
        elem.classList.add("theme-light");
      }
    }
  }, [state.themeDark]);

  const openModalElem = (title, desc) => {
    dispatch({
      type: "populate_game_modal",
      payload: {
        gameModalTitle: title,
        gameModalDescription: desc,
      },
    });
    dispatch({
      type: "toggle_game_modal",
      payload: {
        gameModalOpen: true,
        modalOpen: true,
        chatModalOpen: false,
        contentModalOpen: false,
      },
    });
  };

  const openModalElem1 = (e) => {
    openModalElem("TicTacToe", "A well known classic");
  };

  const openModalElem2 = (e) => {
    openModalElem("Stay Tuned!", "More games coming soon ...");
  };

  return (
    <div className={"game-root " + (!state.modalOpen ? "" : "blur-all")}>
      <div className="game-elem-1 game-elem-wrapper" onClick={openModalElem1}>
        <GameElem
          title={<span className="single-title">TicTacToe</span>}
          description="The classic. Xs and Os."
        />
      </div>
      <div
        className="game-elem-2 game-elem-wrapper game-vertical"
        onClick={openModalElem2}
      >
        <GameElem
          title={
            <div className="game-vertical">
              <div className="game-vertical-elem">Stay Tuned...</div>
            </div>
          }
        />
      </div>
    </div>
  );
}
