import React from "react";
import { reducer, initialState } from "./reducer";
import connect from "socket.io-client";

const socket = connect(process.env.REACT_APP_SERVER_URL, {
  transports: ["websocket"],
});

export const GlobalContext = React.createContext({
  state: initialState,
  dispatch: () => null,
  socket: socket,
});

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={[state, dispatch, socket]}>
      {children}
    </GlobalContext.Provider>
  );
};
