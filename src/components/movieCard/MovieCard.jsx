import React from "react";
import "./style.scss";
import { useSelector } from "react-redux";
import Img from "../lazyLoadingImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";

const MovieCard = ({ data, fromSearch ,mediaType }) => {
  console.log(data,"dataaaa")
  const { url } = useSelector((state) => state.home);
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : PosterFallback;
    const navigate=useNavigate();
  return (
    <div className="movieCard" onClick={()=>navigate(`/${data.media_type || mediaType}/${data.id}`)}>
      <div className="posterBlock">
        <Img src={posterUrl} className="posterImg" />
      </div>
      <div className="textBlock">
        <span className="title">{data.title || data.name}</span>
        <span className="date">
          {dayjs(data.release_date).format("MMM D, YYYY")}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
