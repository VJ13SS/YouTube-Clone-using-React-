import React from 'react'
import ScrollBar from './Scrollbar/scrollbar.jsx'
import Feeds from './VideoFeeds/feeds.jsx'


export default function Home(props) {
  const [category,setCategory] = React.useState(0);

  const styles = {
    display:'flex',
  gap:'10px'
  }

   return(
     <main style = {styles}>
       <ScrollBar 
         displayIcons = {props.scrollBarIcons} 
         category = {category}
         setCategory = {setCategory}
         />
       <Feeds 
         displayIcons = {props.scrollBarIcons}
         category = {category}
         />
     </main>
   )
}
