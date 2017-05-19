import React, { Component } from 'react';
import Search from '../Search/Search';
import FontAwesome from 'react-fontawesome';

import './App.css';

class Navbar extends Component {
  render() {
    return (
      <div className="container">
        <a className="navbar-brand ftds-brand" href="/">
          FTDS
        </a>
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <a href="https://github.com/flowtype/flow-typed" target="_blank">
              Flow Typed
            </a>
          </li>
        </ul>
        <ul className="nav navbar-nav pull-right">
          <li className="nav-item pull-right">
            <a href="https://github.com/GAntoine/search-flow-typed" target="_blank">
              <FontAwesome name='github' />
            </a>
          </li>
        </ul>
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
        <nav className="navbar navbar-full navbar-fixed-top">
          <Navbar />
        </nav>
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
