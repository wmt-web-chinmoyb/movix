import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import './style.scss'



const HeroBanner = () => {

  const navigate=useNavigate()
  const {url}=useSelector(state=>state.home)
  const [background,setBackground]=useState("")
  console.log(background)
  const [query,setQuery]=useState("")
  const {data,loading}=useFetch("/movie/upcoming")
   useEffect(()=>{
    const bg=url.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
    setBackground(bg)
   },[data])
 
  const searchQueryHandler=(e)=>{
      if(e.key==="Enter" && query.length >0){
        navigate(`/search/${query}`)
      }
         
    
  }
  return (
    <div className='heroBanner'>
      <div className='backdrop-img'>
        
      </div>
      <div className="wrapper">
        <div className="heroBannerContent">
          <span className='title'>Welcome.</span>
          <span className='subtitle'>Millions of movies, TV shows and people to discover</span>
          <div className='searchInput'>
               <input type="text" 
               placeholder='Search for a movie or a tv show...' 
               onChange={(e)=>setQuery(e.target.value)
              }
               onKeyUp={searchQueryHandler}
               />
               <button>Search</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner