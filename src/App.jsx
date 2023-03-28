import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/Api";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import PageNotFound from "./pages/404/PageNotFound";
import Explore from "./pages/explore/Explore";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";

function App() {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.home);
  console.log(url);
  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);
  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  };
  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};
    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`genre/${url}/list`));
    });
    const data = await Promise.all(promises);
    data?.map(({ genres }) => {
      return genres?.map((item) => (allGenres[item.id] = item));
    });
    dispatch(getGenres(allGenres));
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
