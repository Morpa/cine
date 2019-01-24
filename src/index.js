import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './components/App';
import Movie from './components/Movie/Movie';
import * as serviceWorker from './serviceWorker';
require('dotenv').config();

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path={'/movie/:id'} exact component={Movie} />
      <Route path={'/'} exact component={App} />
    </Switch>
  </BrowserRouter>,

  document.getElementById('root')
);

serviceWorker.register();
