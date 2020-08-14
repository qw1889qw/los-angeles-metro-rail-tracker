import React from 'react';

const ToTopButton = props => {
  const handleClick = () => {
    props.onClick();
  };
  return <button className="to-top-button" onClick={handleClick}>go to top</button>;
};

export default ToTopButton;