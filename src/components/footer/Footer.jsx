import React from "react";
import "./Footer.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <ContentWrapper>
        <div className="listWrapper">
          <ul className="list">
            <li className="listItem">Terms of use</li>
            <li className="listItem">Privacy policy</li>
            <li className="listItem">About </li>
            <li className="listItem">Blog </li>
            <li className="listItem">FAQ </li>
          </ul>
        </div>
        <div className="infowrapper">
          <div className="text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </div>
        </div>
        <div className="socialIcons">
            <span className="icon">
              <FaFacebookF />
            </span>
            <span className="icon">
              <FaInstagram/>
            </span>
            <span className="icon">
              <FaTwitter/>
            </span>
            <span className="icon">
              <FaLinkedin/>
            </span>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Footer;
