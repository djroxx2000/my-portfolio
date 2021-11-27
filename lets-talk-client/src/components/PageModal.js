import React, { useEffect, useRef } from "react";
import { GlobalContext } from "../contexts/Globals/GlobalProvider";

import "../styles/PageModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function PageModal() {
  const [state, dispatch] = React.useContext(GlobalContext);

  const modal = useRef(null);
  const modalClose = useRef(null);

  useEffect(() => {
    if (state.modalOpen) {
      modal.current.style.display = "block";
    } else {
      modal.current.style.display = "none";
    }
  }, [state.modalOpen]);

  useEffect(() => {
    if (state.themeDark) {
      modal.current.style.background = "var(--color-bright-transparent-low)";
      modalClose.current.style.color = "var(--color-dark-alert)";
    } else {
      modal.current.style.background = "var(--color-dark-transparent-low)";
      modalClose.current.style.color = "var(--color-bright-alert)";
    }
  }, [state.themeDark]);

  return (
    <div className="global-modal" ref={modal}>
      <div
        className="modal-close-btn"
        ref={modalClose}
        onClick={() => {
          dispatch({ type: "toggle_modal" });
        }}
      >
        <FontAwesomeIcon
          className="modal-close-icon"
          size="3x"
          icon={faTimes}
        />
      </div>
    </div>
  );
}
