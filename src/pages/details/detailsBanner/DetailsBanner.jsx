import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";
import FallbackImg from "../../../assets/no-poster.png";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import CircleRating2 from "../../../components/circleRating/CircleRating2";
import Img from "../../../components/lazyLoadingImage/Img";
import { PlayBtn } from "../PlayBtn";

const DetailsBanner = ({ video, crew }) => {
  const params = useParams();

  const { data, loading } = useFetch(`/${params.mediaType}/${params.id}`);
  console.log(data);
  const { url } = useSelector((state) => state.home);
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <div>
          <div className="backdrop-img">
            <Img src={url.backdrop + data?.backdrop_path} />
          </div>
          <div className="opacity-layer"></div>
          <ContentWrapper>
            <div className="content">
              <div className="left">
                {data?.poster_path ? (
                  <Img
                    className="posterImg"
                    src={url.backdrop + data?.poster_path}
                  />
                ) : (
                  <Img className="posterImg" src={FallbackImg} />
                )}
              </div>
              <div className="right">
                <div className="title">{`${data?.name || data?.title} (${dayjs(
                  data?.release_date
                ).format("YYYY")})`}</div>
                <div className="subtitle">{data?.tagline}</div>
                <div className="gen">
                  {data?.genres?.map((gen, i) => {
                    return (
                      <span key={i} className="gen-item">
                        {gen.name}
                      </span>
                    );
                  })}
                </div>
                <div className="row">
                
                    <CircleRating2 rating={data?.vote_average.toFixed(1)}/>
                    <div className="playbtn" on>
                      <PlayBtn/>
                      <span className="text">
                        Watch Trailer
                      </span>
                    </div>
                    <PlayBtn/>
                  
                </div>
              </div>
            </div>
          </ContentWrapper>
        </div>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
