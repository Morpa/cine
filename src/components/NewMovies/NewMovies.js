import './NewMovies.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import moviesApi from '../../Api/moviesApi';

class NewMovies extends React.Component {
  state = {
    movies: []
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const key = process.env.REACT_APP_API_KEY;

    let todayDate = new Date();
    let today =
      todayDate.getFullYear() +
      '-' +
      (todayDate.getMonth() + 1) +
      '-' +
      todayDate.getDate();
    let oneMonthAgo =
      (todayDate.getMonth() === 0
        ? todayDate.getFullYear() - 1
        : todayDate.getFullYear()) +
      '-' +
      (todayDate.getMonth() === 0
        ? todayDate.getMonth() + 12
        : todayDate.getMonth()) +
      '-' +
      todayDate.getDate();

    const response = await moviesApi.get(
      `discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${oneMonthAgo}&primary_release_date.lte=${today}`
    );
    const movies = response.data.results;
    this.setState({ movies });
  };

  render() {
    return (
      <section>
        <h2>New releases</h2>
        <div className="newMovies">
          {this.state.movies.map((movie, index) => {
            return (
              <Link
                to={`/movie/${this.state.movies[index].id}`}
                key={index}
                className="movieLink"
              >
                <img
                  src={
                    this.state.movies[index].poster_path === null
                      ? 'http://via.placeholder.com/300x450'
                      : `https://image.tmdb.org/t/p/w300/${
                          this.state.movies[index].poster_path
                        }`
                  }
                  alt={`${this.state.movies.title} poster`}
                  className="imgResponsive"
                />

                <div className="movieInfo">
                  <h3>{this.state.movies[index].title}</h3>
                  <p>{this.state.movies[index].release_date}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    );
  }
}

export default NewMovies;
