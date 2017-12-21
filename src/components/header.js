import React from 'react';
import './../include/bootstrap';
import './../App.css';
import Image from './../duck.png';

const Header = () => {
  return (
    <header className="page-header text-center text-white bg-dark">
      <a>
        <img
          src={Image}
          className="float-left mt-3 ml-2"
          alt="duck"
          height="35"
          width="35"
        />
      </a>
      <h1 className="App-title pt-2 mr-3">Bird Watch</h1>
      <p className="App-intro pb-2 mr-3">Add and View Bird Sightings</p>
    </header>
  );
};

export default Header;
