import React, { useEffect, useState } from 'react';


export function ClockToggle({toggleClock}){
  return (
    <button 
        type="button"
        className="clock-toggle" 
        onClick={toggleClock}
      >
        Toggle Clock
      </button>
  )
}

function Clock(){
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const tick = () => {
      setTime(new Date());
    }

    const interval = setInterval(tick, 1000);

    return () => {
      clearInterval(interval)
    } 
  }, [])

  function formatTime(){
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    hours = (hours < 10) ? `0${hours}` : hours;
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    seconds = (seconds < 10) ? `0${seconds}` : seconds;

    const timezone = time
      .toTimeString() // Form: "14:39:07 GMT-0600 (PDT)"
      .replace(/[^A-Z]/g, "") // Strip out all but capitals
      .slice(3); // Eliminate initial GMT

    return {hours, minutes, seconds, timezone}
  }

  const [formats, setFormats] = useState(calculateFormats(new Date()))

  function calculateFormats(date){

    let time =date
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    hours = (hours < 10) ? `0${hours}` : hours;
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    seconds = (seconds < 10) ? `0${seconds}` : seconds;

    const timezone = time
      .toTimeString() // Form: "14:39:07 GMT-0600 (PDT)"
      .replace(/[^A-Z]/g, "") // Strip out all but capitals
      .slice(3); // Eliminate initial GMT

    return {hours, minutes, seconds, timezone}
  }

  useEffect(() => {
    setFormats(calculateFormats(time))
  }, [time])

  return (
    <section className="clock-section">
        <h1>Clock</h1>
        <div className='clock'>
          <p className="time">
            <span>
              Time:
            </span>
            <span>
              {`${formats.hours}:${formats.minutes}:${formats.seconds} ${formats.timezone}`}
            </span>
          </p>
          <p className="date">
            <span>
              Date: 
            </span>
            <span>
              {time.toDateString()}
            </span>
          </p>
        </div>
      </section>
  )
}

export default Clock;