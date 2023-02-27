import { useState,useEffect } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import {fetchDataFromApi} from "./utils/Api"
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration,getGenres } from './store/homeSlice'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import PageNotFound from './pages/404/PageNotFound'
import Explore from './pages/explore/Explore'
import Details from './pages/details/Details'
import SearchResult from './pages/searchResult/SearchResult'




function App() {
 const dispatch=useDispatch()
  const url=useSelector((state)=>state.home)
  console.log(url)
  useEffect(()=>{
    fetchApiConfig()
  },[])
 const fetchApiConfig=()=>{
  fetchDataFromApi('/configuration').then(res=>{
    const url={
      backdrop: res.images.secure_base_url +"original",
      poster: res.images.secure_base_url +"original",
      profile: res.images.secure_base_url +"original"
    

    }
    dispatch(getApiConfiguration(url))
  })
 }
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/:mediaType/:id" element={<Details/>}/>
        <Route path="/search/:query" element={<SearchResult/>}/>
        <Route path='*' element={<PageNotFound/>}/>
        <Route path='/explore/:mediaType' element={<Explore/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
