import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigation, useLocation, useNavigate } from "react-router-dom";
import "./Header.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";
import { Button } from "antd";
const Header = () => {
  const [isLogin, setLogin] = useState(
    localStorage.getItem("isLoggedin") || false
  );
  const isLoggedin = localStorage.getItem("isLoggedin");

  const [show, setShow] = useState("top");

  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };
  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };
  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);

      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };
  const deleteStorage = () => {
    localStorage.removeItem("isLoggedin");
    navigate("/login")
  };
  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };
  let buttonText = "";

  if (location.pathname === "/login") {
    buttonText = "Sign up";
  } else if (location.pathname === "/signup") {
    buttonText = "Sign in";
  } else if (location.pathname === "/") {
    buttonText = "Sign in";
  }
  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper className="contentWrapper">
        <div className="logo">
          <img src={logo} alt="logo" onClick={() => navigate("/")} />
        </div>
        {isLoggedin && (
          <ul className="menuItems">
            <li className="menuItem" onClick={() => navigationHandler("movie")}>
              Movies
            </li>
            <li className="menuItem" onClick={() => navigationHandler("tv")}>
              Tv Shows
            </li>
            <li className="menuItem">
              <HiOutlineSearch onClick={openSearch} />
            </li>
            <li className="menuItem" onClick={() => navigationHandler("movie")}>
              <Button type="primary" danger onClick={deleteStorage}>
                Logout
              </Button>
            </li>
          </ul>
        )}
        <div className="mobileMenuItems">
          {isLoggedin && (
            <>
              <HiOutlineSearch onClick={openSearch} />
              <Button type="primary" danger onClick={deleteStorage}>
                Logout
              </Button>
            </>
          )}
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or a tv show..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
