import React from "react";
// import { GlobalContext } from "../contexts/Globals/GlobalProvider";

export const switchTheme = (className, state) => {
  const elems = document.getElementsByClassName(className);
  for (let elem of elems) {
    if (state.themeDark) {
      elem.classList.remove("theme-bright");
      elem.classList.add("theme-dark");
    } else {
      elem.classList.remove("theme-dark");
      elem.classList.add("theme-bright");
    }
  }
};
