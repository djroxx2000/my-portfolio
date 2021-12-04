import React from "react";
import { GlobalContext } from "../contexts/Globals/GlobalProvider";

import "../styles/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faFacebook,
  faSpotify,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const [state] = React.useContext(GlobalContext);
  return (
    <div
      className={
        "footer-root " + (state.themeDark ? "theme-dark" : "theme-light")
      }
    >
      <div className="social-row">
        <div className="social-elem">
          <a
            rel="noreferrer"
            href="https://www.linkedin.com/in/dhananjay-s-9522a413a/"
            target="_blank"
          >
            <FontAwesomeIcon
              className={
                "footer-social-icon " +
                (state.themeDark ? "icon-dark" : "icon-light")
              }
              size="2x"
              icon={faLinkedin}
            />
          </a>
        </div>
        <div className="social-elem">
          <a
            rel="noreferrer"
            href="https://www.facebook.com/dhananjay.shettigar.1/"
            target="_blank"
          >
            <FontAwesomeIcon
              className={
                "footer-social-icon " +
                (state.themeDark ? "icon-dark" : "icon-light")
              }
              size="2x"
              icon={faFacebook}
            />
          </a>
        </div>
        <div className="social-elem">
          <a
            rel="noreferrer"
            href="https://www.instagram.com/djayroxx_forever/"
            target="_blank"
          >
            <FontAwesomeIcon
              className={
                "footer-social-icon " +
                (state.themeDark ? "icon-dark" : "icon-light")
              }
              size="2x"
              icon={faInstagram}
            />
          </a>
        </div>
        <div className="social-elem">
          <a
            rel="noreferrer"
            href="https://github.com/djroxx2000"
            target="_blank"
          >
            <FontAwesomeIcon
              className={
                "footer-social-icon " +
                (state.themeDark ? "icon-dark" : "icon-light")
              }
              size="2x"
              icon={faGithub}
            />
          </a>
        </div>
        <div className="social-elem">
          <a
            rel="noreferrer"
            href="https://open.spotify.com/playlist/2EKMeB1oiT7UJEbmJciUVh?si=pZhmvfHsRImkgtQqh7YE2Q&utm_source=copy-link"
            target="_blank"
          >
            <FontAwesomeIcon
              className={
                "footer-social-icon " +
                (state.themeDark ? "icon-dark" : "icon-light")
              }
              size="2x"
              icon={faSpotify}
            />
          </a>
        </div>
      </div>
      <div className="footer-message">
        <span>Built with ❤️ by Dhananjay Shettigar</span>
      </div>
    </div>
  );
}
