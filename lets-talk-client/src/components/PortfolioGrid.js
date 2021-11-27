import React, { useEffect } from "react";
import { GlobalContext } from "../contexts/Globals/GlobalProvider";

import "../styles/PortfolioGrid.css";

export default function PortfolioGrid() {
  const [state, dispatch] = React.useContext(GlobalContext);

  useEffect(() => {
    const elems = document.getElementsByClassName("portfolio-elem");
    for (let elem of elems) {
      if (state.themeDark) {
        elem.classList.remove("theme-bright");
        elem.classList.add("theme-dark");
      } else {
        elem.classList.remove("theme-dark");
        elem.classList.add("theme-bright");
      }
    }
  }, [state.themeDark]);

  return (
    <div className="portfolio-root">
      <div className="portfolio-elem portfolio-elem-1">Elem1</div>
      <div className="portfolio-elem portfolio-elem-2">Elem2</div>
      <div className="portfolio-elem portfolio-elem-3">Elem3</div>
      <div className="portfolio-elem portfolio-elem-4">Elem4</div>
      <div className="portfolio-elem portfolio-elem-5">Elem5</div>
      <div className="portfolio-elem portfolio-elem-6">Elem6</div>
      <div className="portfolio-elem portfolio-elem-7">Elem7</div>
      <div className="portfolio-elem portfolio-elem-8">Elem8</div>
      <div className="portfolio-elem portfolio-elem-9">Elem9</div>
    </div>
  );
}
