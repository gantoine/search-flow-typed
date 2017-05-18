import React, { Component } from 'react';
import _ from 'underscore';

import './App.css';
import Results from '../Results/Results'
import api from '../../utils/api'

class Search extends Component {
  constructor(props) {
    super();
    this.definitions = [];
    this.state = {
      results: [],
      query: '',
    };
    this.search = this.search.bind(this);

    api.fetchDefinitions()
      .then((definitions) => {
        this.definitions = definitions;
      })
  }
  search(event) {
    var query = event.target.value;
    this.setState({query: query});

    var filtered = _.filter(this.definitions, (typedef) => {
      return typedef.definition.toLowerCase().includes(query);
    })

    this.setState({results: filtered});
  }
  render() {
    return (
      <div>
        <input value={this.state.query} onChange={this.search} />
        <Results results={this.state.results} />
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h2>Flow Typed Package Search</h2>
        </div>
        <div className="app-intro">
          <Search />
        </div>
      </div>
    );
  }
}

export default App;
