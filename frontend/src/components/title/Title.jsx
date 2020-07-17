import React from 'react'
import './title.css'

function LargeText(props) {

  return (
    <h1 style={props.style} className="title">{props.children}</h1>
  )
}

export default LargeText