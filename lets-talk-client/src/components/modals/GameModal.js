import React, { useEffect, useRef } from "react";
import { GlobalContext } from "../../contexts/Globals/GlobalProvider";

import "../../styles/GameModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function GameModal() {
  const [state, dispatch] = React.useContext(GlobalContext);

  const modal = useRef(null);
  const modalClose = useRef(null);
  const gameCanvasRef = useRef(null);

  const resize = (canvas) => {
    let smaller = modal.current.offsetWidth;
    if (modal.current.offsetWidth > 450) {
      smaller =
        modal.current.offsetWidth < modal.current.offsetHeight
          ? modal.current.offsetWidth
          : modal.current.offsetHeight;
      smaller -= (7 * smaller) / 100;
    }
    canvas.width = canvas.height = smaller;
  };

  useEffect(() => {
    if (state.playGame) {
      modal.current.style.display = "block";
      setTimeout(() => {
        modal.current.style.opacity = "1";
      }, 70);
    } else {
      modal.current.style.opacity = "0";
      setTimeout(() => {
        modal.current.style.display = "none";
      }, 500);
    }
  }, [state.playGame]);

  useEffect(() => {
    if (state.themeDark) {
      modal.current.style.background = "var(--color-light-transparent-low)";
      modalClose.current.style.color = "var(--color-dark-alert)";
    } else {
      modal.current.style.background = "var(--color-dark-transparent-low)";
      modalClose.current.style.color = "var(--color-light-alert)";
    }
  }, [state.themeDark]);

  useEffect(() => {
    const canvas = gameCanvasRef.current;
    const context = canvas.getContext("2d");
    const step = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // update();
      // render(context);
      context.fillStyle = "#000000";
      context.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(step);
    };
    resize(canvas);
    step();
    window.onresize = (_) => resize(canvas);
  }, []);

  return (
    <div className="modal-game-root" ref={modal}>
      <div
        className="modal-close-btn"
        ref={modalClose}
        onClick={() => {
          dispatch({
            type: "toggle_game",
            payload: { playGame: false, modalOpen: false },
          });
        }}
      >
        <FontAwesomeIcon
          className="modal-close-icon"
          size="3x"
          icon={faTimes}
        />
      </div>
      <div className="game-canvas-wrapper">
        <div className="game-status">
          Waiting for opponent&nbsp;
          <div className="game-loader">
            <FontAwesomeIcon size="lg" icon={faSpinner} />
          </div>
        </div>
        <canvas className="game-canvas" ref={gameCanvasRef}></canvas>
      </div>
    </div>
  );
}
