import React from 'react';
import {Link} from 'react-router-dom';
import {Nav, NavItem, Navbar} from 'react-bootstrap';

export default class Menu extends React.Component {
  render() {
    return(
      <header>
        <Navbar inverse fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Home</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Brand>
              <Link to="/about">About</Link>
            </Navbar.Brand>
            <Navbar.Brand>
              <Link to="/contact">Contact</Link>
            </Navbar.Brand>
            <Nav pullRight>
              <Navbar.Brand>
                <Link to="/admin">Admin</Link>
              </Navbar.Brand>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}