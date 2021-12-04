import React, { useEffect } from "react";
import { GlobalContext } from "../contexts/Globals/GlobalProvider";

import PortfolioElem from "./utilities/PortfolioElem";
import "../styles/PortfolioGrid.css";

import {
  languagesView,
  languagesDescription,
  skillsView,
  skillsDescription,
  websiteDescription,
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

  const openModalElem = (title, desc) => {
    dispatch({
      type: "populate_content_modal",
      payload: {
        contentModalTitle: title,
        contentModalDescription: desc,
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

  const openModalElem1 = (e) => {
    openModalElem("Call me DJ", "Unset");
  };

  const openModalElem2 = (e) => {
    openModalElem("I speak ...", languagesDescription);
  };

  const openModalElem3 = (e) => {
    openModalElem();
  };

  const openModalElem4 = (e) => {
    openModalElem("I work with ...", skillsDescription);
  };

  const openModalElem5 = (e) => {
    openModalElem("It was fun until it wasn't...", websiteDescription);
  };

  const openModalElem6 = (e) => {
    openModalElem();
  };

  const openModalElem7 = (e) => {
    openModalElem();
  };

  const openModalElem8 = (e) => {
    openModalElem();
  };

  return (
    <div className={"portfolio-root " + (!state.modalOpen ? "" : "blur-all")}>
      <div
        className="portfolio-elem-1 portfolio-elem-wrapper"
        onClick={openModalElem1}
      >
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
      <div
        className="portfolio-elem-3 portfolio-elem-wrapper"
        onClick={openModalElem3}
      >
        <PortfolioElem
          title={<span className="single-title">I write</span>}
          description="I have the ability to sit very still and write one whole page a day..."
        />
      </div>
      <div
        className="portfolio-elem-4 portfolio-elem-wrapper"
        onClick={openModalElem4}
      >
        <PortfolioElem title={skillsView} />
      </div>
      <div
        className="portfolio-elem-5 portfolio-elem-wrapper"
        onClick={openModalElem5}
      >
        <PortfolioElem
          title={<span className="single-title">This website</span>}
          description="Now I understand why so many websites don't have a theme toggle..."
        />
      </div>
      <div
        className="portfolio-elem-6 portfolio-elem-wrapper"
        onClick={openModalElem6}
      >
        <PortfolioElem
          title={<span className="single-title">Happiness</span>}
          description="Finishing this website was a moment of joy among so many others..."
        />
      </div>
      <div
        className="portfolio-elem-7 portfolio-elem-wrapper"
        onClick={openModalElem7}
      >
        <PortfolioElem
          title={<span className="single-title">The Plan</span>}
          description="I am not one to make daily regimens or tight schedules but I do have hopes and aspirations for the future just like you. And the future looks good..."
        />
      </div>
      <div
        className="portfolio-elem-8 portfolio-elem-wrapper"
        onClick={openModalElem8}
      >
        <PortfolioElem
          title={<span className="single-title">What I've done</span>}
          description="I like to think I make a considerable difference wherever I go..."
        />
      </div>
    </div>
  );
}
