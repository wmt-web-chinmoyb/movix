import React from 'react'
import "./style.scss"
import useFetch from "../../hooks/useFetch"
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailsBanner/DetailsBanner'
useParams

const Details = () => {
  // const params=useParams()
  // console.log(params)
  // const {data,loading}=useFetch(`/${params.mediaType}/${params.id}`)
  // console.log(data);

  return (
    <div>
      <DetailsBanner/>
    </div>
  )
}

export default Details