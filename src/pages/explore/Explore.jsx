import React, { useEffect, useState } from "react";
import "./style.scss";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import { useParams } from "react-router-dom";
import Select from "react-select";
import useFetch from "../../hooks/useFetch";
import { fetchDataFromApi } from "../../utils/Api";
import { Spin } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../../components/movieCard/MovieCard";
let filters = {};
const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);
  const params = useParams();

  const { data: genresData } = useFetch(`/genre/${params.mediaType}/list`);

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/discover/${params.mediaType}`, filters).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`, filters).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };
  const onChange = (selectedItem, action) => {
    console.log(selectedItem.value, "selectedItemttt");
    if (action.name === "sortby") {
      setSortby(selectedItem);
      if (action.action !== "clear") {
        filters.sort_by = selectedItem.value;
      } else {
        delete filters.sort_by;
      }
    }
    if (action.name === "genres") {
      setGenre(selectedItem);
      if (action.action !== "clear") {
        let genreId = selectedItem.map((gen) => gen.id);
        genreId = JSON.stringify(genreId);
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }
    setPageNum(1);
    fetchInitialData();
  };

  useEffect(() => {
    filters = {};
    setPageNum(1);
    setData();
    setSortby();
    setGenre();
    fetchInitialData();
  }, [params.mediaType]);

  console.log(data, "data");
  return (
    <div className="explorePage">
      <ContentWrapper>
        <div className="pageHeader">
          <div className="pageTitle">
            {params.mediaType === "movie"
              ? "Explore Movies"
              : "Explore Tv shows"}
          </div>
          <div className="filters">
            <Select
              isMulti
              name="genres"
              options={genresData?.genres}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onChange={onChange}
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Select genres"
            />
            <Select
              name="sortby"
              options={sortbyData}
              onChange={onChange}
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Sort by"
            />
          </div>
        </div>
        {loading && (
          <div className="spinner">
            <Spin />
          </div>
        )}
        {!loading && (
          <>
            {data?.results?.length > 0 ? (
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
              >
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard
                      key={index}
                      data={item}
                      mediaType={params.mediaType}
                    />
                  );
                })}
              </InfiniteScroll>
            ) : (
              <span className="resultNotFound">Sorry, Results not found!</span>
            )}
          </>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Explore;
