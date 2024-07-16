import React from 'react'
import './feeds.css'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {Duration} from 'luxon'

export default function Feeds(props) {

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
  const imgStyles = {
    height: window.innerWidth<=500?'280px':props.displayIcons?'150px':'170px'
  }
  const apiKey = 'AIzaSyA1pBPKgtY1XG1ChcJzPKaJhNmIrzv38NA'

  const videoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${props.category}&key=${apiKey}`
  
  async function fetchData(){
    const response = await fetch(videoUrl)
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json()
    
    setVideoList(data.items)
  }

  const [videoList,setVideoList] = React.useState([])
  
  React.useEffect(() =>{
      fetchData()
  },[props.category])
  
  console.log(videoList)
  console.log(window.innerWidth);
  const videoFeeds = videoList.map((video) =>{
    return (
      <Link to ={`/video/${video.snippet.categoryId}/${video.id}`}
        key = {video.id}
        className = 'video-feed'
        style = {window.innerWidth<=500?{width:'100%'}:props.displayIcons?{width:'235px'}:{width:'280px'}}
      >
        
        <img src = {video.snippet.thumbnails.high.url}
style = {imgStyles} />
        <p id = "duration" style = {window.innerWidth<=500?{top:'230px'}:props.displayIcons?{top:'130px'}:{top:'150px'}}>{convertIsoDuration(video.contentDetails.duration)}</p>
        <h4>{video.snippet.title}</h4>
        <h5>{video.snippet.channelTitle}
        </h5>
        <div className='upload-details'>
            <p>{ValueConverter(video.statistics.viewCount)} views  • {moment(video.snippet.publishedAt).fromNow()}</p>
        </div>
        
      </Link>
    )
  })
  
    return (
      <div className = 'videoFeeds' style = {props.displayIcons?{marginLeft:'auto'}:{marginLeft:'7%'}}>
        {videoFeeds}
      </div>
    )
}
