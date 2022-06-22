import React from 'react'
import "papercss/dist/paper.css";
import "./controls.css"
import { useState } from 'react';

export const Controls = () => {
  const [timerPlayStarted,setTimerPlayStarted] = useState(false);

  const handleClick = () => {
      setTimerPlayStarted(!timerPlayStarted);
  }

  return (
    <div className="row functions">
           <button className="functionBtn btn-small" onClick={handleClick}>
            {timerPlayStarted ? (<img src="./images/pause.png" alt="pause" className="functionImg"/>) : (<img src="./images/start.png" alt="start" className="functionImg"/>)}
            
          </button>
          <button className=" btn-small functionBtn">
            <img src="./images/reset.png" alt="reset" className="functionImg"/>
          </button>

         </div>
  )
}
