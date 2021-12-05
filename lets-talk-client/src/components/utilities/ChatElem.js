import React, { useEffect, useRef } from "react";
import { GlobalContext } from "../../contexts/Globals/GlobalProvider";

import "../../styles/ChatElem.css";

import { getLocalTimeFromUTCTime } from "../../utility/utility";

export default function ChatElem({ message }) {
  const [state, dispatch] = React.useContext(GlobalContext);
  const curElement = useRef();
  let curTime = getLocalTimeFromUTCTime(
    JSON.parse(message.sendTime)
  ).toLocaleString();

  const openChatOptions = (ev) => {
    ev.preventDefault();
    if (message.userId === state.userId) {
      return;
    }
    dispatch({
      type: "toggle_chat_options",
      payload: { chatOptionsOpen: true, opponentId: message.userId },
    });
  };

  useEffect(() => {
    curElement.current.scrollIntoView();
  }, []);

  return (
    <div
      className={
        "modal-chat-element " + (state.themeDark ? "font-dark" : "font-light")
      }
      ref={curElement}
    >
      <div className="chat-username" onClick={openChatOptions}>
        {message.username + " · "}{" "}
        <span className="chat-time">[{curTime}]</span>
      </div>
      <div className="chat-message">{message.message}</div>
    </div>
  );
}
