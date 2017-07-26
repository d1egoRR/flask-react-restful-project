import React from 'react';
import {Route} from 'react-router-dom';

import About from './About';
import Contact from './Contact';
import Home from './Home';
import PostDetail from './PostDetail';

export default class Main extends React.Component {
  render() {
    return(
      <main>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/post/:id" component={PostDetail} />
      </main>
    );
  }
}