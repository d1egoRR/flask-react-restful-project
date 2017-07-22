import React from 'react';

import Menu from './Menu';
import Main from './Main';

export default class Index extends React.Component {
  render() {
    return(
      <div>
        <Menu />
        <Main />
      </div>
    );
  }
}