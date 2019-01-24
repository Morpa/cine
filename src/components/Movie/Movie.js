import './Movie.scss';
import React from 'react';
import Header from '../Header/Header';
import Form from '../Form/Form';
import Cast from '../Cast/Cast';
import moviesApi from '../../Api/moviesApi';

class Movie extends React.Component {
  state = {
    movie: {
      genres: [],
      credits: {
        cast: [],
        crew: []
      }
    }
  };

  getData = async () => {
    const key = process.env.REACT_APP_API_KEY;
    const id = window.location.pathname.substring(7);

    const response = await moviesApi.get(
      `/movie/${id}?api_key=${key}&language=en-US&append_to_response=credits`
    );
    const movie = response.data;

    this.setState({ movie });
  };

  componentDidMount() {
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.movie !== this.state.movie) {
      this.getData();
    }
  }

  render() {
    return (
      <div className="container">
        <Header />
        <Form id="form" />

        <div className="moviePage">
          <div className="poster">
            <img
              src={
                this.state.movie.poster_path === null
                  ? 'http://via.placeholder.com/300x450'
                  : `https://image.tmdb.org/t/p/w300${
                      this.state.movie.poster_path
                    }`
              }
              alt={`${this.state.movie.title} poster`}
              className="posterImg"
            />
          </div>

          <section className="movieDetails">
            <h2 className="sectionTitle">{this.state.movie.title}</h2>
            <ul className="detailsList">
              <li>
                <span className="bold">Release date:</span>{' '}
                {this.state.movie.release_date}
              </li>
              <li>
                <span className="bold">Rating:</span>{' '}
                {this.state.movie.vote_average}
              </li>
              <li>
                <span className="bold">Vote count:</span>{' '}
                {this.state.movie.vote_count}
              </li>
              <li>
                <span className="bold">Genres: </span>{' '}
                {this.state.movie.genres.map((element, index) => {
                  if (index < this.state.movie.genres.length - 1) {
                    return this.state.movie.genres[index].name + ', ';
                  } else {
                    return this.state.movie.genres[index].name;
                  }
                })}
              </li>
            </ul>

            <p>{this.state.movie.overview}</p>
          </section>
        </div>

        <Cast cast={this.state.movie.credits.cast} />
      </div>
    );
  }
}

export default Movie;
