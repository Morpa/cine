import './Header.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';

class Header extends React.Component {
  render() {
    return (
      <header>
        <Link to={'/'}>
          <h1>
            <img src={logo} alt="Cine Logo" />
            Cine
          </h1>
        </Link>
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          The Movie Database
        </a>
      </header>
    );
  }
}

export default Header;
