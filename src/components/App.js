import React, { useRef } from 'react';
import Intro from './Intro';
import WithRef from './WithRef';
import Tracker from './Tracker';
import '../styles.scss';

const App = () => {
  const trackerRef = useRef(null);
  const handleClick = () => {
    trackerRef.current.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return (
    <>
      <Intro onClick={handleClick} />
      <WithRef ref={trackerRef}>
        <Tracker />
      </WithRef>
    </>
  );
};

export default App;
