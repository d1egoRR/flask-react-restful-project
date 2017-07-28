import React from 'react';
import {HashRouter} from 'react-router-dom'
import Main from './Main';
import Menu from './Menu';
import Footer from './Footer';

function Index() {
  return(
    <HashRouter>
      <div>
        <Menu />
        <hr/>
        <Main />
        <hr/>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default Index;