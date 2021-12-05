import React, { useRef } from "react";
import { GlobalContext } from "../../contexts/Globals/GlobalProvider";

import "../../styles/ChatOptions.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import { v4 as uuidv4 } from "uuid";
import { getUTCTimeObj } from "../../utility/utility";

export default function ChatOptions() {
  const [state, dispatch, socket] = React.useContext(GlobalContext);

  const userInput = useRef(null);
  const userSend = useRef(null);

  const sendMessage = (message, username) => {
    if (message === "") {
      return;
    }
    let payload = {
      message: message,
      username: username,
      messageId: uuidv4(),
      sendTime: JSON.stringify(getUTCTimeObj()),
      receiver: state.opponentId,
    };
    socket.emit("userMessage", payload);
  };

  const handleInputKeyPress = (ev) => {
    ev.preventDefault();
    if (ev.keyCode === 13) {
      sendMessage(userInput.current.value, state.username);
      userInput.current.value = "";
    }
  };

  const closeChatOptions = (ev) => {
    dispatch({
      type: "toggle_chat_options",
      payload: { chatOptionsOpen: false },
    });
  };

  return (
    <div
      className={
        "chat-options-root " + (state.chatOptionsOpen ? "view-on" : "view-off")
      }
    >
      <div className="options-chat-wrapper">
        Send a direct message:
        <div className="options-chat-input" onKeyUp={handleInputKeyPress}>
          <input
            type="text"
            className="options-chat-input-box"
            style={
              state.themeDark
                ? { color: "var(--color-dark-font)" }
                : { color: "var(--color-light-font)" }
            }
            ref={userInput}
          />
          <button
            className="options-chat-send"
            ref={userSend}
            onClick={() => {
              sendMessage(userInput.current.value, state.username);
              userInput.current.value = "";
            }}
          >
            <FontAwesomeIcon
              className="modal-send-icon"
              size="2x"
              icon={faPaperPlane}
            />
          </button>
        </div>
        {/* <div className="game-invite-menu">Invite for:</div> */}
        <div className="chat-close" onClick={closeChatOptions}>
          <FontAwesomeIcon
            className="modal-send-icon"
            size="2x"
            icon={faTimesCircle}
          />
        </div>
      </div>
    </div>
  );
}
