import React,{useState} from 'react'
import Carousel from '../../../components/carousel/Carousel'

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTab from '../../../components/switchTabs/SwitchTab'
import useFetch from '../../../hooks/useFetch'


const Trending = () => {
    const [endPoint,setEndPoint]=useState("day")
    const {data,loading}=useFetch(`/trending/all/${endPoint}`)
    const onTabChange = (tab) => {
        setEndPoint(tab==="Day"? "day":"week")
      
    }
  return (
   <div className='carouselSection'>
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTab data={["Day","Week"]} onTabChange={onTabChange}/>
        
      </ContentWrapper>
      <div style={{padding:" 0 50px"}}>
      <Carousel data={data?.results} loading={loading}/>
      </div>
      
      
      
   </div>
  )
}

export default Trending