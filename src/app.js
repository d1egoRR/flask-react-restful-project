import React from 'react';
import {render} from 'react-dom';
import {HashRouter} from 'react-router-dom'

import App from './components/index';

const mountNode = document.getElementById('app');

render(
  <HashRouter>
    <App />
  </HashRouter>,
  mountNode);