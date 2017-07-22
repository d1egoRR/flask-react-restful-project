import React from 'react';
import {Nav, NavItem, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default class Menu extends React.Component {
  render() {
    return(
      <header>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>Acerca de</Link></li>
            <li><Link to='/contact'>Contacto</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}