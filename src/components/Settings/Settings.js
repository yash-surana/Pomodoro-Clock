import React from 'react'
import "papercss/dist/paper.css";
import "./settings.css"

export const Settings = (props) => {
  return (
    <div>
        <h4>{props.activity} Time</h4>
        <div className='row activity'>
        <button>+</button>
        <h5 className='col col-4 timeSet'>{props.initialTime} mins</h5>
        <button>-</button>
        </div>
        
        
    </div>
  )
}
