import React from 'react';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';

import Home from './Home';
import About from './About';
import Contact from './Contact';

export default class Main extends React.Component {
  render() {
    return(
      <main>
        <Router history={browserHistory}>
          <Route path='/' component={Home}>
            <Route path='/about' component={About}/>
            <Route path='/contact' component={Contact}/>
          </Route>
        </Router>
      </main>
    );
  }
}