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
import VideoPopup from "../../../components/videoPopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const params = useParams();
  console.log(video, "DFDF");

  const { data, loading } = useFetch(`/${params.mediaType}/${params.id}`);
  console.log(data);
  const { url } = useSelector((state) => state.home);
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };
  const director = crew?.filter((cr) => cr.job === "Director");
  const writer = crew?.filter(
    (wr) => wr.job === "Screenplay" || wr.job === "story" || wr.job === "writer"
  );
  console.log(director, "director");

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
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
                  <div className="title">{`${
                    data?.name || data?.title
                  } (${dayjs(data?.release_date).format("YYYY")})`}</div>
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
                    <CircleRating2 rating={data?.vote_average.toFixed(1)} />
                    <div
                      className="playbtn"
                      onClick={() => {
                        setShow(true);
                        setVideoId(video?.key);
                      }}
                    >
                      <PlayBtn />
                      <span className="text">Watch Trailer</span>
                    </div>
                  </div>
                  <div className="overview">
                    <div className="heading">Overview</div>
                    <div className="description">{data?.overview}</div>
                  </div>
                  <div className="info">
                    {data?.status && (
                      <div className="infoItem">
                        <span className="text bold">Status: </span>
                        <span className="text">{data?.status}</span>
                      </div>
                    )}
                    {data?.release_date && (
                      <div className="infoItem">
                        <span className="text bold">Release Date: </span>
                        <span className="text">
                          {dayjs(data?.release_date).format("MMM D, YYYY")}
                        </span>
                      </div>
                    )}
                    {data?.runtime && (
                      <div className="infoItem">
                        <span className="text bold">Runtime: </span>
                        <span className="text">
                          {toHoursAndMinutes(data?.runtime)}
                        </span>
                      </div>
                    )}
                  </div>
                  {director?.length > 0 && (
                    <div className="info">
                      <span className="text bold">Director: </span>
                      <span className="text">
                        {director?.map((di, i) => {
                          return <span key={i}>{di.name}</span>;
                        })}
                      </span>
                    </div>
                  )}
                  {writer?.length > 0 && (
                    <div className="info">
                      <span className="text bold">Writer: </span>
                      <span className="text">
                        {writer?.map((di, i) => {
                          return <span key={i}>{di.name}, </span>;
                        })}
                      </span>
                    </div>
                  )}
                  {data?.created_by?.length > 0 && (
                    <div className="info">
                      <span className="text bold">Creator: </span>
                      <span className="text">
                        {data?.created_by?.map((di, i) => {
                          return <span key={i}>{di.name}, </span>;
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </ContentWrapper>
          </div>
          <div style={{margin:"20px"}}>
            <VideoPopup show={show} setVideoId={setVideoId} videoId={videoId} setShow={setShow} />
          </div>
        </>
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
