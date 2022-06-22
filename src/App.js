
import "papercss/dist/paper.css";
import './App.css';
import { useState,useEffect } from 'react';

function App() {
  const [isRunning,setIsRunning] = useState(false);
  const [currentActivity, setCurrentActivity] = useState("Work Session");
  const [seconds,setSeconds]=useState(5);
  const [minutes,setMinutes]=useState(0);
  const [numOfActivity, setNumOfActivity] = useState(1);
  const [cycle, setCycle]=useState(0);

  const doubleDigitMins = minutes >= 10 ? minutes : `0${minutes}`;
  const doubleDigitSeconds = seconds >= 10 ? seconds : `0${seconds}`;

  // Updating number of sessions to increase break time to 15 minutes 
  

  useEffect(() => {
    let interval = setInterval(() => {
      clearInterval(interval);
      if(isRunning){
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {

            clearInterval(interval);
            
            console.log(numOfActivity,currentActivity )
            if (numOfActivity===8){
              setMinutes(0);
              setCurrentActivity("Long Break");
              setSeconds(3);
              setNumOfActivity(0);
              // setCycle(cycle-0.5);
            }
            else{
              setCycle(cycle+0.5);
              setNumOfActivity(numOfActivity+1);
            let newActivity = (currentActivity === "Work Session" ? "Break Session" : "Work Session");
            setCurrentActivity(newActivity);
            currentActivity === "Work Session" ? (setMinutes(0)) : (setMinutes(0));
            setSeconds(3);
            }
          }
        } else {
          setSeconds(seconds - 1);
        }
      }else{
        return;
      }
       
    }, 1000);
  }, [seconds,currentActivity,isRunning]);

  const handleClick = () => {
      // Timer();
      
      setIsRunning(!(isRunning));
      
  }
  return (
    <div className='container'>
        <h2>Pomodoro Clock</h2>

        <div className="container container.md border shadow">
          <h4 id="heading">{currentActivity}</h4>
          <div className="time">{doubleDigitMins}:{doubleDigitSeconds}</div>
        </div>

        {/* Controls */}
        <div className="row functions">
           <button className="functionBtn btn-small" onClick={handleClick}>
            {isRunning ? (<img src="./images/pause.png" alt="pause" className="functionImg"/>) : (<img src="./images/start.png" alt="start" className="functionImg"/>)}
            
          </button>
          <button className=" btn-small functionBtn">
            <img src="./images/reset.png" alt="reset" className="functionImg"/>
          </button>

         </div>

        <div>
          <h5 className="cycles">Pomodoro cycles completed: {cycle}</h5>
        </div>
        {/* Settings */}
        <div className="row">
        <div className=" col-6 ">
        
        <h4>Session Time</h4>
        <div className='row activity'>
        <button>+</button>
        <h5 className='col col-4 timeSet'>25 mins</h5>
        <button>-</button>
        </div>
        </div>
        <div className=" col-6 ">
            
            <h4>Break Time</h4>
            <div className='row activity'>
            <button>+</button>
            <h5 className='col col-4 timeSet'>5 mins</h5>
            <button>-</button>
            </div>
        </div>
        </div>
    </div>
  );
}

export default App;
