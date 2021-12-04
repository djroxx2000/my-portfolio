import React, { useEffect, useRef } from "react";
import { GlobalContext } from "../../contexts/Globals/GlobalProvider";

import "../../styles/ContentModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function ContentModal() {
  const [state, dispatch] = React.useContext(GlobalContext);

  const modal = useRef(null);
  const modalClose = useRef(null);

  useEffect(() => {
    if (state.contentModalOpen) {
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
  }, [state.contentModalOpen]);

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
    <div className="modal-content-root" ref={modal}>
      <div
        className="modal-close-btn"
        ref={modalClose}
        onClick={() => {
          dispatch({
            type: "toggle_content_modal",
            payload: { contentModalOpen: false, modalOpen: false },
          });
        }}
      >
        <FontAwesomeIcon
          className="modal-close-icon"
          size="3x"
          icon={faTimes}
        />
      </div>
      <div className="modal-element modal-image-wrapper">
        <img
          src={state.contentModalImg}
          className="modal-image"
          alt="A beautiful landscape view"
        />
        <div className="modal-image-overlay"></div>
      </div>
      <div className="modal-description-wrapper">
        <div className="modal-element modal-title">
          <span>{state.contentModalTitle}</span>
        </div>
        <div className="modal-element modal-description">
          <span>{state.contentModalDescription}</span>
        </div>
      </div>
    </div>
  );
}
