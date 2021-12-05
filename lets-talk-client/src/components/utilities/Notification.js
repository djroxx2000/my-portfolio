import React, { useEffect } from "react";
import { GlobalContext } from "../../contexts/Globals/GlobalProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBellSlash } from "@fortawesome/free-solid-svg-icons";
import "../../styles/Notification.css";

export default function Notification() {
  const [state, dispatch, socket] = React.useContext(GlobalContext);

  useEffect(() => {
    if (state.notificationOpen) {
      setTimeout(() => {
        if (state.notificationOn) {
          dispatch({
            type: "toggle_notification",
            payload: { notificationOpen: 0, navCoreOn: true },
          });
        }
      }, 8000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.notificationOpen]);

  const acceptInvite = (ev) => {
    dispatch({
      type: "toggle_notification",
      payload: { notificationOpen: 0, navCoreOn: true },
    });
    socket.emit("acceptInvite", {
      sender: state.userId,
      username: state.username,
      receiver: state.opponentId,
      game: state.curGame,
    });
    setTimeout(() => {
      dispatch({ type: "click_nav" });
    }, 500);
    setTimeout(() => {
      dispatch({ type: "toggle_game" });
    }, 1500);
  };

  const rejectInvite = (ev) => {
    dispatch({
      type: "toggle_notification",
      payload: { notificationOpen: 0, navCoreOn: true },
    });
    socket.emit("rejectInvite", {
      sender: state.userId,
      username: state.username,
      receiver: state.opponentId,
      game: state.curGame,
    });
  };

  const toggleNotificationPref = (ev) => {
    ev.preventDefault();
    ev.target.style.display = "none";
    dispatch({
      type: "toggle_notification",
      payload: {
        notificationMsg: "Notifications are off. Open Chat to enable.",
        notificationOpen: 1,
      },
    });
    setTimeout(() => {
      dispatch({
        type: "toggle_notification_pref",
        payload: { notificationOn: false, notificationOpen: 0 },
      });
      ev.target.style.display = "block";
    }, 3000);
  };

  return (
    <div
      className={
        "notification-root " +
        (state.notificationOn && state.notificationOpen
          ? "view-on"
          : "view-off")
      }
    >
      <div className="notification-body">
        <div className="notification-msg">
          <div className="notification-msg-content">
            {state.notificationMsg}&nbsp;
          </div>
          <div
            className={
              "notification-btn-wrapper " +
              (state.notificationOpen === 2 ? "view-on" : "view-off")
            }
          >
            <a
              href="#games"
              className="notification-accept btn-mail"
              onClick={acceptInvite}
            >
              Accept
            </a>
            <a
              href="#hero"
              className="notification-reject btn-mail"
              onClick={rejectInvite}
            >
              Reject
            </a>
          </div>
        </div>
        <div className="notification-pref" onClick={toggleNotificationPref}>
          <FontAwesomeIcon
            className="nav-chat-icon"
            size="2x"
            icon={faBellSlash}
          />
        </div>
      </div>
    </div>
  );
}
