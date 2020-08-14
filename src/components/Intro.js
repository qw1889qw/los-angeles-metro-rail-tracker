import React from 'react';

const Intro = props => {
  const handleClick = () => {
    props.onClick();
  };
  return (
    <div className="intro">
      <h1>LA Metro Rail tracker</h1>
      <p>
        credit to{' '}
        <a href="https://github.com/datadesk/lametro-maps" rel="external">
          https://github.com/datadesk/lametro-maps
        </a>{' '}
        for most of the GeoJSON & OSM for the rest
      </p>
      <p>
        <a
          href="https://github.com/qw1889qw/los-angeles-metro-rail-tracker"
          rel="external"
        >
          link to GitHub repository for this app
        </a>
      </p>
      <p>
        updates every 10 seconds; 1-minute delay on locations so don't expect
        extremely accurate results
      </p>
      <button className="scroll-button" onClick={handleClick}>
        scroll to map
      </button>
    </div>
  );
};

export default Intro;
