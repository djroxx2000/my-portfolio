import React, { useEffect } from "react";
import { GlobalContext } from "../../contexts/Globals/GlobalProvider";

import "../../styles/Notification.css";

export default function Notification() {
  const [state, dispatch, socket] = React.useContext(GlobalContext);

  useEffect(() => {
    if (state.notificationOpen) {
      setTimeout(() => {
        console.log("timeout done!");
        dispatch({
          type: "toggle_notification",
          payload: { notificationOpen: 0, navCoreOn: true },
        });
      }, 10000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.notificationOpen]);

  const acceptInvite = (ev) => {
    ev.preventDefault();
    dispatch({
      type: "toggle_notification",
      payload: { notificationOpen: 0, navCoreOn: true },
    });
    socket.emit("acceptInvite", { receiver: state.opponentId });
  };

  const rejectInvite = (ev) => {
    ev.preventDefault();
    dispatch({
      type: "toggle_notification",
      payload: { notificationOpen: 0, navCoreOn: true },
    });
    socket.emit("rejectInvite", { receiver: state.opponentId });
  };

  const toggleNotificationPref = (ev) => {
    ev.preventDefault();
    dispatch({ type: "toggle_notification_pref" });
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
            <span
              className="notification-accept btn-mail"
              onClick={acceptInvite}
            >
              Accept
            </span>
            <span
              className="notification-reject btn-mail"
              onClick={rejectInvite}
            >
              Reject
            </span>
          </div>
        </div>
        <div className="notification-pref" onClick={toggleNotificationPref}>
          Turn off notifications?
        </div>
      </div>
    </div>
  );
}
