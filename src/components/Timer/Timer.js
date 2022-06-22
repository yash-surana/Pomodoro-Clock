import "papercss/dist/paper.css";
import "./timer.css"
import React from 'react'

const Timer = (props) => {
    return(
        <div className="container container.md border shadow">
          <h4 id="heading">{props.activity}</h4>
          <div className="time">25:00</div>
        </div>
    );
};

export default Timer;