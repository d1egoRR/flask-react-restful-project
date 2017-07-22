import React from 'react';
import {BrowserRouter} from 'react-router-dom'

import Menu from './Menu';
import Main from './Main';

export default class Index extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <div>
          <Menu />
          <hr/>
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

const mountNode = document.getElementById('app');