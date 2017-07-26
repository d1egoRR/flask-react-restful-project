import React from 'react';
import {HashRouter} from 'react-router-dom'

import Main from './Main';
import Menu from './Menu';

export default class Index extends React.Component {
  render() {
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
}

const mountNode = document.getElementById('app');