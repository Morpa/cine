import './App.scss';
import React from 'react';
import Header from './Header/Header';
import Form from './Form/Form';
import NewMovies from './NewMovies/NewMovies';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Form />
        <NewMovies />
      </div>
    );
  }
}

export default App;
