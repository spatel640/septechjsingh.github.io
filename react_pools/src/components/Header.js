import React from 'react'


const Header =(props)=>{
  return (
    <div className="header-identifier">
    <h1 className="license-number">{props.text.customId} </h1>
    <h3 className="pool-name">{props.text.name} </h3>
    </div>
  )

};

export default Header
