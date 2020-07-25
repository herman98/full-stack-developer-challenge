import React from 'react'
import './description.css'

function MediumText(props) {

  return (
    <p style={props.style} className="medium-text">{props.children}</p>
  )
}

export default MediumText