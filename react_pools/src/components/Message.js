import React from 'react'
import '../Message.css'

const Message = (props)=>{
  return(
    <div className={`${props.class} message-container`}>
    {props.message}
    </div>
  )

}

export default Message
