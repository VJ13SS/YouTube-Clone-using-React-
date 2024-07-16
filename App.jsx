import React from 'react'
import {Route, Routes}from 'react-router-dom';
import './App.css'
import Navbar from './Navbar/navbar.jsx'
import Home from './HomePage/homepage.jsx'
import Video from './Video/video.jsx'

export default function App() {

  function Toggle() {
     setScrollBarIcons(!scrollBarIcons)
  }
  
  const [scrollBarIcons,setScrollBarIcons] = React.useState(true)
  
  return (

          <div className = "app">
      <Navbar scrollBarIcons = {scrollBarIcons} toggleScrollBar = {Toggle}/>
            
      <Routes>
        <Route 
          path = '/' 
          element = {<Home scrollBarIcons = {scrollBarIcons}/>}
        />
        <Route 
          path = '/Video/:categoryid/:videoid' 
          element = {<Video />}
        />
        
      </Routes>
      
    </div>

  )
}
