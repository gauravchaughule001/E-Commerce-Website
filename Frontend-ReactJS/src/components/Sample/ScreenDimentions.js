import { useRef } from 'react';

export default function ScreenDimentions({data}) {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  return (
    <div>
      {/* <h2>Width: {windowSize.current[0]}</h2>

      <h2>Height: {windowSize.current[1]}</h2> */}

      <h2>{data}</h2>

      {/* <h2>End</h2> */}
    </div>
  );
}