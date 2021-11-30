import React, { useEffect, useRef } from "react";
import { GlobalContext } from "../contexts/Globals/GlobalProvider";

import "../styles/ChatElement.css";

import { getLocalTimeFromUTCTime } from "../utility/utility";

export default function ChatElement({ message }) {
  const [state] = React.useContext(GlobalContext);
  const curElement = useRef();
  let curTime = getLocalTimeFromUTCTime(
    JSON.parse(message.sendTime)
  ).toLocaleString();
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
      <div className="chat-username">
        {message.username + " · "}{" "}
        <span className="chat-time">[{curTime}]</span>
      </div>
      <div className="chat-message">{message.message}</div>
    </div>
  );
}
