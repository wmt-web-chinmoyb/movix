import React from 'react'
import { useSelector } from 'react-redux'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import Img from '../../../components/lazyLoadingImage/Img'
import "./style.scss"
import avatar from "../../../assets/avatar.png"


const Cast = ({data,loading}) => {
    const {url}=useSelector(state=>state.home)
    console.log(url,"urrr")
    console.log(data,"cast")
  return (
    <div className='castSection'>
      <ContentWrapper>
        <div className="sectionHeading">
            Top Cast
        </div>
        {!loading ? (
            <div className='listItems'>
                {data?.map(cast => {
                    let imgUrl=cast.profile_path ? url.profile + cast.profile_path : avatar
                   return (
                    <div key={cast.id} className="listItem">
                    <div className='profileImg'>
                        <Img src={imgUrl}/>
                    </div>
                    <div className='name'>{cast.name}</div>
                    <div className='character'>{cast.character}</div>
                    </div>
                   )
                })}
            </div>
        ):"loading"}
      </ContentWrapper>
    </div>
  )
}

export default Cast
