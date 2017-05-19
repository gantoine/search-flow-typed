import React, { Component } from 'react';
import Results from '../Results/Results';
import FontAwesome from 'react-fontawesome';
import _ from 'underscore';
import api from '../../utils/api';

import './Search.css';

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

    var filtered = [];

    if (query !== '') {
      filtered = _.filter(this.definitions, (typedef) => {
        return typedef.definition.toLowerCase().includes(query);
      })
    }

    this.setState({results: filtered});
  }
  render() {
    return (
      <div>
        <div className="search-container">
          <div className={"container " + (this.state.query.length ? 'search-results' : 'search-no-results')}>
            <div className="row">
              <div className="col-md-12 input-group input-group-lg">
                <span className="input-group-addon" id="search-addon">
                  <FontAwesome name='search' />
                </span>
                <input type="text"
                  value={this.state.query}
                  placeholder="Search Definitions..."
                  className="form-control"
                  aria-describedby="search-addon"
                  onChange={this.search} />
              </div>
            </div>
          </div>
        </div>
        <div className="results-container">
          <Results results={this.state.results} />
        </div>
      </div>
    )
  }
}

export default Search;
