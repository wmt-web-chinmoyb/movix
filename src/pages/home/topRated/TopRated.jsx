import React,{useState} from 'react'
import Carousel from '../../../components/carousel/Carousel'

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTab from '../../../components/switchTabs/SwitchTab'
import useFetch from '../../../hooks/useFetch'


const TopRated = () => {
    const [endPoint,setEndPoint]=useState("movie")
    const {data,loading}=useFetch(`/${endPoint}/top_rated`)
    const onTabChange = (tab) => {
        setEndPoint(tab==="Movies"? "movie":"tv")
      
    }
  return (
   <div className='carouselSection'>
      <ContentWrapper>
        <span className="carouselTitle">Top Rated</span>
        <SwitchTab data={["Movies","Tv Shows"]} onTabChange={onTabChange}/>
        
      </ContentWrapper>
      <div style={{padding:" 0 50px"}}>
      <Carousel data={data?.results} loading={loading} endPoint={endPoint}/>
      </div>
      
      
      
   </div>
  )
}

export default TopRated;