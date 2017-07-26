import React from 'react';
import {HashRouter} from 'react-router-dom'
import Main from './Main';
import Menu from './Menu';

function Index() {
  return(
    <HashRouter>
      <div>
        <Menu />
        <hr/>
        <Main />
      </div>
    </HashRouter>
  );
}

export default Index;