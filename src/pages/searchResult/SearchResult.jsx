import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchDataFromApi } from "../../utils/Api";
import noResults from "../../assets/no-results.png";
import "./style.scss";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import { Button, Spin } from "antd";
import MovieCard from "../../components/movieCard/MovieCard";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();
  const [click,setClick]=useState(false)
  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setLoading(false);
      }
    );
  };
  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data.results) {
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
  useEffect(() => {
    fetchInitialData();
  }, [query]);

  setTimeout(() => {
    console.log(data, "daaaa");
  }, 3000);
  return (
    <div className="searchResultsPage">
      {loading && (
        <div className="loading">
          <Spin />
        </div>
      )}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data.total_results > 1 ? "results" : "result"
                } of '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length}
                next={click && fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spin />}
              >
                {data?.results?.map((result, i) => {
                  if (result.media_type === "person") return;
                  return <MovieCard key={i} data={result} fromSearch={true} />;
                })}
                <div className="btn-loadmore">
                <Button type="primary" danger onClick={()=>setClick(true)}>
                  Load more
                </Button>
              </div>
              </InfiniteScroll>
              
            </>
          ) : (
            <span className="resultNOtFound">Sorry,Results not Found !</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
