import React from 'react'
import moment from 'moment'
import './video.css'
import {Duration} from 'luxon'

export default function Recommendations(){
  async function getRecommendedVideos() {
     let response = await fetch(recommendUrl)
    let data = await response.json()
    console.log(data)
    setRecommendedVideos(data.items)
  }

  function ValueConverter(value) {
     if(value >= 1000000){
       return Math.floor(value/1000000) + 'M'
     }
    else if(value >= 1000){
      return Math.floor(value/1000)+ 'k'
    }
    return value 
  }

    const convertIsoDuration = (Isoduration) =>{
    const duration = Duration.fromISO(Isoduration)
    const hours = duration.hours.toString().padStart(2, '0')//padStart(2, '0') adds a leading zero if the number is less than 10
    const minutes = duration.minutes.toString().padStart(2, '0')
    const seconds = duration.seconds.toString().padStart(2, '0')

    const videoDuration = `${"00"?"":hours + ':'} ${minutes}:${seconds}`
    return videoDuration
    }
  
  const recommendUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=${Your Api Key}`
  const [recommendedVideos,setRecommendedVideos] = React.useState([])

    const videoRecommendations = recommendedVideos.map((video,index) =>{
    return (
      <div className = 'video-recommended' key = {index}>
        <img src = {video.snippet.thumbnails.high.url} />
        <p id = "duration">{convertIsoDuration(video.contentDetails.duration)}</p>
        <p id = 'video-title'>{video.snippet.title}</p>
        <p>{video.snippet.channelTitle}</p>
        <p>{moment(video.snippet.publishedAt).fromNow()} • {ValueConverter(video.statistics.viewCount)} views</p>
      </div>
    )
  })

  React.useEffect(()=>{
    getRecommendedVideos()
  },[])

  console.log(recommendedVideos);
  
  return(
    <div className = 'recommendations'>
    {videoRecommendations}
    </div>
  )
}
