import React,{useRef} from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import posterFallback from "../../assets/no-poster.png";
import "./Style.scss";
import dayjs from "dayjs";
import CircleRating from "../circleRating/CircleRating";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadingImage/Img"



const Carousel = ({ data, loading ,endPoint, Title}) => {
  const { url } = useSelector((state) => state.home);
  
  const navigate = useNavigate();
  console.log(data,"caro")
  
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 5,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
   swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  return (
    <div>
    {Title && <div>{Title}</div>}
      <Slider {...settings}>
        
        {data?.map((item, i) => {
          const posterUrl = item.poster_path
            ? url.poster + item.poster_path
            : posterFallback;
          return (
            <div key={i} className="carouselItem" onClick={()=>navigate(`/${item.media_type || endPoint}/${item.id}`)}>
              <div className="posterBlock">
                <Img src={posterUrl} alt="poster" />
                <div className="circle" ><CircleRating rating={item.vote_average.toFixed(1)} /></div>
              </div>
              <div className="textBlock">
                <span className="title">{item.title || item.name}</span> 
              </div>
            </div>
            
          );
        })}
      </Slider>
    </div>
  );
};

export default Carousel;
