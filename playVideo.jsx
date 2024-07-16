import React from 'react'
import likeImage from '/src/Images/like.png';
import likedImage from '/src/Images/Liked.jpg';
import dislikeImage from '/src/Images/dislike.png';
import shareImage from '/src/Images/share.png';
import saveImage from '/src/Images/save.png';
import replyImg from '/src/Images/messages.png';
import './video.css'
import moment from 'moment'

export default function PlayVideo({parameters}){
  
  function ValueConverter(value) {
     if(value >= 1000000){
       return Math.floor(value/1000000) + 'M'
     }
    else if(value >= 1000){
      return Math.floor(value/1000)+ 'k'
    }
    return value 
  }

    async function getVideoData() {
     let response = await fetch(videoDetailsUrl)
    let data = await response.json()
    
    setVideoDetails(data.items['0'].snippet?data.items['0'].snippet:'')
    setVideoAnalytics(data.items['0']. statistics?data.items['0']. statistics:'')
    setChannelId(data.items['0'].snippet.channelId?data.items['0'].snippet.channelId:'')
  }

  async function getChannelData() {
     let response = await fetch(channelUrl)
    let data = await response.json()
    setChannelSubscribers(data.items['0'].statistics.subscriberCount?data.items['0'].statistics.subscriberCount:'')
    setChannelLogo(data.items['0'].snippet.thumbnails.high.url?data.items['0'].snippet.thumbnails.high.url:'')
  }

  async function getComment() {
     let response = await fetch(commentUrl)
    let data = await response.json()
    setVideoComments(data.items)
  }

  
    const video_url = `https://www.youtube.com/embed/${parameters['videoid']}?autoplay=1`

  const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${parameters['videoid']}&key=${Your Api key}`

  const [channelid,setChannelId] = React.useState('');

  const channelUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelid}&key=${Your Api Key}`

  const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${parameters['videoid']}&key=${Your ApiKey}`

    const [video_details,setVideoDetails] = React.useState('');
  const [video_analytics,setVideoAnalytics] = React.useState('');
  const [channelSubscribers,setChannelSubscribers] = React.useState("")
  const [channelLogo,setChannelLogo] = React.useState("")
  
 const [Comments,setVideoComments] = React.useState([])

  const [viewDescription,setViewDescription] = React.useState(false)
  const [viewComments,setViewComments] = React.useState(false)

    const VideoComments = Comments.map((comment,index) =>{
    return(
      <div className = 'video-comment' 
        key = {index}
        style = {viewComments?{display:'block'}:{display:'none'}}>
        <div className = 'commented-by'>
          <img src = {comment.snippet.topLevelComment.snippet.authorProfileImageUrl} />
          <p>{comment.snippet.topLevelComment.snippet.authorDisplayName} • {moment(comment.snippet.topLevelComment.snippet.publishedAt).fromNow()}</p>
        </div>
        <p id = 'comment'>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
        <div className = 'comment-analytics'>
          <img src = {likeImage} />
          <p>{ValueConverter(comment.snippet.topLevelComment.snippet.likeCount)}</p>
          <img src = {dislikeImage} />
          <img src = {replyImg} />
          <p>{ValueConverter(comment.snippet.totalReplyCount)}</p>
        </div>
      </div>
    )
  })

  React.useEffect(()=>{
    getVideoData();
    getComment()
  },[])
  
  React.useEffect(()=>{
    getChannelData();
  },[channelid])

  const [liked,setLiked] = React.useState(false)

    return (
      <div className = 'video-container'>
        <iframe
              className = 'iframe-video'
              src={video_url}
              title="YouTube video player"
              allow="autoplay;accelerometer;clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
        <div className= 'video-details-text'>
          
          <h3 onClick = {()=>(setViewDescription(!viewDescription))}>{video_details.title}</h3>
          <p>{ValueConverter(video_analytics.viewCount)} views • {moment(video_details.publishedAt).fromNow()}</p>
          
          <p 
            id = 'description' 
            style = {viewDescription?{display:'block'}:{display:'none'}}>{video_details.description}
          </p>
          
          <div className = 'video-details-channel'>
            
            <div className = 'video-details-channel-name'>
              <img src = {channelLogo} />
              <h5>{video_details.channelTitle}</h5>
              <p>{ValueConverter(channelSubscribers)}</p>
            </div>
            <button>Subscribe </button>
          </div>
          <div className = 'video-analytics'>
            <img src = {!liked?likeImage:likedImage} onClick = {()=>setLiked(!liked)} /><p>{ValueConverter(video_analytics.likeCount)}</p>
            <img src = {dislikeImage} /><p>dislike </p>
            <img src = {shareImage} /><p>share</p>
            <img src = {saveImage} /><p>Save</p>
          </div>
        </div>
        <div className = 'video-comments'>
          <h5 onClick = {()=>(setViewComments(!viewComments))}>Comments {ValueConverter(video_analytics.commentCount)}</h5>
          {VideoComments}
        </div>
      </div>
  );
          }
