import { useState, useEffect } from 'react';
function Clock({props}){
  const [date, setDate] = useState(new Date());
  
  function refreshClock() {
    setDate(new Date());
  }



  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);
  return (
    <div>
        {date.toLocaleTimeString()}
        {props}
    </div>
  );
}
export default Clock;