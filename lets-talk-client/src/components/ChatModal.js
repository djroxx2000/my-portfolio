import React, { useEffect, useRef } from "react";
import { GlobalContext } from "../contexts/Globals/GlobalProvider";

import "../styles/ChatModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import ChatElement from "./ChatElement";

import { v4 as uuidv4 } from "uuid";
import { getUTCTimeObj } from "../utility/utility";

// import socket from "socket";

export default function ChatModal() {
  const [state, dispatch, socket] = React.useContext(GlobalContext);

  const modal = useRef(null);
  const modalClose = useRef(null);
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
    };
    dispatch({
      type: "add_message",
      payload: payload,
    });
    socket.emit("message", payload);
  };

  const handleInputKeyPress = (ev) => {
    ev.preventDefault();
    if (ev.keyCode === 13) {
      sendMessage(userInput.current.value, state.username);
      userInput.current.value = "";
    }
  };

  useEffect(() => {
    socket.on("connInit", (payload) => {
      dispatch({
        type: "username_change",
        payload: { username: payload.username },
      });
      dispatch({
        type: "init_messages",
        payload: { messages: payload.messages },
      });
    });

    socket.on("message", (payload) => {
      dispatch({ type: "add_message", payload: payload });
    });

    userSend.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.chatModalOpen) {
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
  }, [state.chatModalOpen]);

  return (
    <div className="modal-chat-root" ref={modal}>
      <div
        className="modal-chat-close-btn"
        ref={modalClose}
        onClick={() => {
          dispatch({
            type: "toggle_chat_modal",
            payload: { chatModalOpen: false, modalOpen: false },
          });
        }}
      >
        <FontAwesomeIcon
          className="modal-close-icon"
          size="3x"
          icon={faTimes}
        />
      </div>
      <div
        className={
          "modal-chat-window " + (state.themeDark ? "font-dark" : "font-light")
        }
      >
        <div className="modal-chat-info">Your username is {state.username}</div>
        <div className="modal-chat-input" onKeyUp={handleInputKeyPress}>
          <input
            type="text"
            className="modal-chat-input-box"
            style={
              state.themeDark
                ? { color: "var(--color-dark-font)" }
                : { color: "var(--color-bright-font)" }
            }
            ref={userInput}
          />
          <button
            className="modal-chat-send"
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
        <div className="modal-chat-list">
          {state.messages.map((message) => (
            <ChatElement key={message.messageId} message={message} />
          ))}
        </div>
      </div>
    </div>
  );
}
