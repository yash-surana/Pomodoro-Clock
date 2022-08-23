
import "papercss/dist/paper.css";
import './App.css';
import { useState,useEffect } from 'react';

function App() {

  
  const [breakTime, setBreakTime] = useState(5);
  const [workTime, setWorkTime] = useState(25);
  const [isRunning,setIsRunning] = useState(false);
  const [currentActivity, setCurrentActivity] = useState("Work Session");
  const [seconds,setSeconds]=useState(0);
  const [minutes,setMinutes]=useState(workTime);
  const [numOfActivity, setNumOfActivity] = useState(1);
  const [cycle, setCycle]=useState(0);
  const [resetClicked, setResetClicked] = useState(false);



  // Converting minutes and seconds to add 0 at start when they are single digits
  const doubleDigitMins = minutes >= 10 ? minutes : `0${minutes}`;
  const doubleDigitSeconds = seconds >= 10 ? seconds : `0${seconds}`;

  
  
  
  useEffect(() => {
    // debugger;
    let interval = setInterval(() => {
      clearInterval(interval);
      if(resetClicked){
        setBreakTime(5);
        setWorkTime(25);
        setSeconds(0);
        setMinutes(25);
        setCurrentActivity(currentActivity)
        setIsRunning(false)
        setNumOfActivity(1);
        setCycle(0);
        return;
      }
      if(isRunning){
        
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {

            clearInterval(interval);
            
            console.log(numOfActivity,currentActivity )
            if (numOfActivity===8){
              setMinutes(15);
              setCurrentActivity("Long Break");
              setSeconds(0);
              setNumOfActivity(0);
              // setCycle(cycle-0.5);
            }
            else{
              setCycle(cycle+0.5);
              setNumOfActivity(numOfActivity+1);
              let newActivity = (currentActivity === "Work Session" ? "Break Session" : "Work Session");
              setCurrentActivity(newActivity);
              newActivity === "Work Session" ? ((setMinutes(workTime))) : ((setMinutes(breakTime)));
              setSeconds(0);
            }
          }
        } else {
          setSeconds(seconds - 1);
        }
      }else{
        return;
      }
       
    }, 1000);
  }, [seconds,currentActivity,isRunning, resetClicked]);

  const handleClick = () => {
      setIsRunning(!(isRunning));
      setResetClicked(false);
    }

  // Reset function to reset clock
  const reset=()=> {
    setResetClicked(true);
    
  }
  
  const increment = (e) => {
    
    switch(e.target.className){
      case "session":
        
        setWorkTime(minutes+1)
        setMinutes(minutes+1)
        break;
      case "break":
        (setBreakTime(breakTime+1))
        break;
      default:
        break;
    }
    setSeconds(0);
  }
  
  const decrement = (e) => {
    if(workTime>1 & breakTime>1){
      switch (e.target.className){
        case "session":
          setWorkTime(minutes-1)
          setMinutes(minutes-1)
          break;
        case "break":
          (setBreakTime(breakTime-1))
          break;
        default:
          break;
      }
    }
    
    setSeconds(0);
  }

  return (
    <div className='container first'>
        <h2>Pomodoro Clock</h2>

        <div className="container container.md border shadow second">
          <h4 id="heading">{currentActivity}</h4>
          <div className="time">{doubleDigitMins}:{doubleDigitSeconds}</div>
        </div>

        {/* Controls */}
        <div className="row functions">
           <button className="functionBtn btn-small" onClick={handleClick} popover-bottom={isRunning? "Pause Timer": "Start Timer"}>
            {isRunning ? (<img src="./images/pause.png" alt="pause" className="functionImg" />) : (<img src="./images/start.png" alt="start" className="functionImg"/>)}
            
          </button>
          <button className=" btn-small functionBtn" onClick={reset} popover-bottom="Reset Timer">
            <img src="./images/reset.png" alt="reset" className="functionImg"/>
          </button>

         </div>

        <div>
          <h5 className="cycles">Pomodoro cycles completed: {cycle}</h5>
        </div>
        {/* Settings */}
        <div className="row settings">
          <div className=" col-6 ">
          
            <h4 className="settingsHeader">Session Time</h4>
            <div className='row activity' >
            <button disabled={isRunning} onClick={increment} className="session"  popover-bottom="Increase Session Time">+</button>
            <h5 className='col col-5 timeSet'>{workTime} mins</h5>
            <button  className="session" disabled={(isRunning || (workTime===1))} onClick={decrement} popover-bottom="Decrease Session Time">-</button>
            </div>
          </div>
          <div className=" col-6 ">
              
              <h4 className="settingsHeader">Break Time</h4>
              <div className='row activity'>
              <button className="break" disabled={isRunning} onClick={increment} popover-bottom="Increase Break Time">+</button>
              <h5 className='col col-4 timeSet'>{breakTime} mins</h5>
              <button className="break" disabled={isRunning|| (breakTime===1)} onClick={decrement}popover-bottom="Decrease Break Time">-</button>
              </div>
          </div>
        </div>
    </div>
  );
}

export default App;
