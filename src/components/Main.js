import React from 'react';
import {Route} from 'react-router-dom';
import About from './About';
import Contact from './Contact';
import Home from './Home';
import PostDetail from './PostDetail';

function Main() {
  return(
    <main>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/contact" component={Contact}/>
      <Route path="/post/:id" component={PostDetail} />
      <Route path="/posts/page/:page" component={Home} />
    </main>
  );
}

export default Main;