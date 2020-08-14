import React, { useRef } from 'react';
import Intro from './Intro';
import WithRef from './WithRef';
import Tracker from './Tracker';
import ToTopButton from './ToTopButton';
import { smoothScroll } from '../helpers';
import '../styles.scss';

const App = () => {
  const introRef = useRef(null);
  const trackerRef = useRef(null);
  const handleScrollDownClick = () => {
    smoothScroll(trackerRef);
  };
  const handleScrollUpClick = () => {
    smoothScroll(introRef);
  };
  return (
    <>
      <WithRef ref={introRef}>
        <Intro onClick={handleScrollDownClick} />
      </WithRef>
      <WithRef ref={trackerRef}>
        <Tracker />
      </WithRef>
      <ToTopButton onClick={handleScrollUpClick} />
    </>
  );
};

export default App;
