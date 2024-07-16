import React from 'react'
import scrollbarData from './homeIcons.js'
import './scrollbar.css'

export default function ScrollBar(props) {

  //paragraph styles
  const P_style = {
    display: props.displayIcons?'block':'none',
    
  }

  //item styles
  const ItemStyle = (isHeld)=>({
    //if item.isHeld is true then the background colour is changed.
    backgroundColor:isHeld?'#d6d6d6':'white',
    width:!props.displayIcons?'20%':'100%'//if display icons is true then the icons are displayed else not
  })

  //updating isHeld of the respective item
  function selectItem(id,type,url_id) {
    //type means subscribedItems or the others

    //url_id is only for the scroll bar items
    if(type == 'links'){
      //setting the video category id
      props.setCategory(url_id)
      
      setItems(items.map((item) =>{
      if(item.id === id){
        return {...item, isHeld:true}
      }
      else{
        return {...item, isHeld:false}
      }
    }))
    }

    else{
      setSubscribedItems(subscribedItems.map((item) =>{
        if(item.id === id){
          return {...item, isHeld:true}
        }
        else{
          return {...item, isHeld:false}
        }
      }))
    }
    
  }

  function createItem(item,className,type) {
     return (
       <div 
         key = {item.id} 
         className = {className} 
         style = {ItemStyle(item.isHeld)} 
         onClick = {() => selectItem(item.id,type,item.url_id)} >
         
         <img src = {item.img}/>
         <p style = {P_style}>{item.text}</p>
         
       </div>
     )
  }
  
   const [items,setItems] = React.useState(scrollbarData[0])
   const scrollBarItems = items.map((item) =>{
     return(
       createItem(item,"scrollBarItem","links")
     )
   })

  
  const [subscribedItems, setSubscribedItems] = React.useState(scrollbarData[1])

  const ItemsSubscribed = subscribedItems.map((item) =>{
    return(
      createItem(item,"scrollBarItem-subscribed","subscriptions")
    )
  })
  
  return(
    
    <div 
      className = "scrollBar" 
      style = {props.displayIcons?{}:{width:'5%'}}
      >
      <div className = "item-container-links">
        {scrollBarItems}</div>
      <div className = "item-container-subscribed">
        <h4 
          style = {props.displayIcons?{}:{visibility:'hidden'}}
          >
          Subscriptions
        </h4>
        {ItemsSubscribed}
      </div>
      
      
    </div>
  )
}
