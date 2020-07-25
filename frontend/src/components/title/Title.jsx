import React from 'react'
import './title.css'

function LargeText(props) {

  return (
    <h2 style={props.style} className="title">{props.children}</h2>
  )
}

export default LargeText