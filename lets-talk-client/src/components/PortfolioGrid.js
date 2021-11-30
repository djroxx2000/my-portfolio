import React, { useEffect } from "react";
import { GlobalContext } from "../contexts/Globals/GlobalProvider";

import PortfolioElem from "./PortfolioElem";
import "../styles/PortfolioGrid.css";

import {
  languagesView,
  languagesDescription,
  skillsView,
  skillsDescription,
} from "./loose/LooseComponents";

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

  const openModalElem2 = (e) => {
    dispatch({
      type: "populate_content_modal",
      payload: {
        contentModalTitle: "I speak ...",
        contentModalDescription: languagesDescription,
      },
    });
    dispatch({
      type: "toggle_content_modal",
      payload: {
        contentModalOpen: true,
        modalOpen: true,
        chatModalOpen: false,
      },
    });
  };

  const openModalElem4 = (e) => {
    dispatch({
      type: "populate_content_modal",
      payload: {
        contentModalTitle: "I work with ...",
        contentModalDescription: skillsDescription,
      },
    });
    dispatch({
      type: "toggle_content_modal",
      payload: {
        contentModalOpen: true,
        modalOpen: true,
        chatModalOpen: false,
      },
    });
  };

  return (
    <div className={"portfolio-root " + (state.modalOpen ? "blur-all" : "")}>
      <div className="portfolio-elem-1 portfolio-elem-wrapper">
        <PortfolioElem
          title={<span className="single-title">Bits about me</span>}
          description="Hey there, this is my personal website so I'm putting it out there. Let the world know about me, my dreams and stuff 😂. Tap to know more..."
        />
      </div>
      <div
        className="portfolio-elem-2 portfolio-elem-wrapper"
        onClick={openModalElem2}
      >
        <PortfolioElem title={languagesView} />
      </div>
      <div className="portfolio-elem-3 portfolio-elem-wrapper">
        <PortfolioElem
          title={<span className="single-title">Bits about this website</span>}
          description="I started out making a regular old portfolio. Tap for details..."
        />
      </div>
      <div
        className="portfolio-elem-4 portfolio-elem-wrapper"
        onClick={openModalElem4}
      >
        <PortfolioElem title={skillsView} />
      </div>
      <div className="portfolio-elem-5 portfolio-elem-wrapper">
        <PortfolioElem
          title={<span className="single-title">This website</span>}
          description="Now I understand why so many websites don't have a theme toggle..."
        />
      </div>
      <div className="portfolio-elem-6 portfolio-elem-wrapper">
        <PortfolioElem
          title={<span className="single-title">Bits about this website</span>}
          description="I started out making a regular old portfolio. Tap for details..."
        />
      </div>
      <div className="portfolio-elem-7 portfolio-elem-wrapper">
        <PortfolioElem
          title={<span className="single-title">Bits about this website</span>}
          description="I started out making a regular old portfolio. Tap for details..."
        />
      </div>
      <div className="portfolio-elem-8 portfolio-elem-wrapper">
        <PortfolioElem
          title={<span className="single-title">Bits about this website</span>}
          description="I started out making a regular old portfolio. Tap for details..."
        />
      </div>
    </div>
  );
}
