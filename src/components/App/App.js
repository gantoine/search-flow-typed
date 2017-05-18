import React, { Component } from 'react';
import './App.css';
import Results from '../Results/Results'
import api from '../../utils/api'

class Search extends Component {
  constructor(props) {
    super();
    this.state = {
      results: [],
      query: '',
      definitions: [],
    };
    this.updateResults = this.updateResults.bind(this);
    this.search = this.search.bind(this);

    api.fetchDefinitions()
      .then((definitions) => {
        this.setState({definitions: definitions})
      })
  }
  updateResults(results) {
    this.setState({results: results});
  }
  search(event) {
    this.setState({query: event.target.value});
  }
  render() {
    return (
      <div>
        <input value={this.state.query} onChange={this.search} />
        <Results results={this.state.definitions} />
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
