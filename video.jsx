import React from 'react';
import './video.css'
import { useParams } from 'react-router-dom';
import PlayVideo from './playVideo.jsx'
import Recommendations from './recommendations.jsx'

export default function Video() {

  let parameters = useParams();
  
  return(
    <div className = 'video'>
    <PlayVideo parameters = {parameters}/>
    <Recommendations />
    </div>
  )
  
}
