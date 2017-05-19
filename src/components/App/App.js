import React, { Component } from 'react';
import Search from '../Search/Search';
import FontAwesome from 'react-fontawesome';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

import './App.css';

class Navigation extends Component {
  render() {
    return (
      <div className="container">
        <Navbar fixedTop={true}>
          <Navbar.Header>
            <Navbar.Brand className="ftds-brand">
              <a className="ftds-brand" href="/">FTDS</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} target="_blank"
                  href="https://github.com/flowtype/flow-typed">
                Flow Typed
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} target="_blank"
                  href="https://github.com/GAntoine/search-flow-typed">
                Github
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

class Footer extends Component {
  render() {
    return (
      <div className="container">
        <div className="pull-left">
          © 2017 Georges-Antoine Assi. Built with
          <FontAwesome name='heart' />
          and React, for the&nbsp;
          <a href="https://github.com/flowtype/flow-typed"
            className="hyperlink" target="_blank">Flow Typed</a>
          &nbsp;project.
        </div>
        <div className="pull-right">
          <a href="https://github.com/GAntoine" target="_blank">
            <FontAwesome className="hyperlink" name='github' />
          </a>
          <a href="https://stackoverflow.com/users/1179430" target="_blank">
            <FontAwesome className="hyperlink" name='stack-overflow' />
          </a>
        </div>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="app">
        <Navigation />
        <div className="content">
          <Search />
        </div>
        <footer className="footer">
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
