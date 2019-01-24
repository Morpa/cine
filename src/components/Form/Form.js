import './Form.scss';
import search from './search.svg';
import React from 'react';
import FormResults from '../../FormResult/FormResult';
import moviesApi from '../../Api/moviesApi';

class Form extends React.Component {
  state = {
    results: []
  };

  handleSubmit(e) {
    e.preventDefault();
  }

  handleKeyUp = async () => {
    document.getElementById('results').className = 'formResults';
    let term = document.getElementById('searchInput').value;

    if (term === '') {
      document.getElementById('results').className = 'noDisplay';
    }
    const key = process.env.REACT_APP_API_KEY;

    const response = await moviesApi.get(
      `search/movie?api_key=${key}&language=en-US&query=${term}&page=1&include_adult=false`
    );

    const results = response.data.results;

    this.setState({ results });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="form">
        <img src={search} alt="search icon" className="searchIcon" />
        <input
          onKeyUp={this.handleKeyUp}
          autoComplete="off"
          id="searchInput"
          className="searchBar"
          type="text"
          placeholder="Search a Movie"
          required
        />
        <FormResults results={this.state.results} />
      </form>
    );
  }
}

export default Form;
