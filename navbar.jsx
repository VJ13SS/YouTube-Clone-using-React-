import React from 'react'
import './nav.css'
import menu from '/src/Images/menu.png'
import Logo from '/src/Images/logo.png'
import Search from '/src/Images/search.png'
import cast from '/src/Images/cast.png'
import Profile from '/src/Images/user_profile.jpg'
import notification from '/src/Images/notification.png'
import {Link,useParams} from 'react-router-dom'


export default function Navbar(props){

  const [search,setSearch] = React.useState(false)
  
  function displaySearchBox() {
     setSearch(!search)
  }
  let {id} = useParams();
  console.log(id);
  
  
  return(
    <nav>
      <Link to = {'/'} className = "nav-left">
        <img src = {menu} onClick = {props.toggleScrollBar} id = 'menu'/>
        <img src = {Logo} className = 'navLogo'/>
      </Link>
      <div className = "nav-right">
        <input type = "text" placeholder= "Search" style = {search?{visibility:'block'}:{display:'none'}}/>
        <img src = {Search} className = "searchIcon" onClick = {displaySearchBox}/>
        <img src = {cast}/>
        <img src = {notification} />
        <img src = {Profile} className = "userIcon"/>
      </div>
      
    </nav>
  )
}
