// @flow

import React, { Component, Element } from 'react';
import Results from '../Results/Results';
import Algolia from '../Algolia/Algolia';
import FontAwesome from 'react-fontawesome';
import _ from 'underscore';
import api from '../../utils/api';

import type { State } from './Search.type'
import type { NetResult } from 'search-flow-typed';
import './Search.css';

class Search extends Component {
  search: Function;
  resultClass: Function;
  state: State;

  constructor(props: Object) {
    super(props);
    this.state = {
      results: [],
      query: '',
    }
    this.search = this.search.bind(this);
    this.resultClass = this.resultClass.bind(this);
  }
  search(event: SyntheticInputEvent) {
    let query: string = event.target.value;
    this.setState({query: query});

    if (query === '') {
      this.setState({results: []});
    } else {
      api.search(query, this.callback.bind(this));
    }
  }
  callback(results: NetResult[]) {
    this.setState({results: results});
  }
  resultClass() {
    return (this.state.query.length ? 'search-results' : 'search-no-results');
  }
  render(): Element<any> {
    return (
      <div>
        <div className="search-container">
          <div className={`container ${this.resultClass()}`}>
            <h1 className="project-name">Flow-Typed Definition Search</h1>
            <Algolia />
            <div className="row">
              <div className="col-md-12 input-group input-group-lg">
                <span className="input-group-addon" id="search-addon">
                  <FontAwesome name='search' />
                </span>
                <input type="text"
                  value={this.state.query}
                  placeholder={`Search third-party library interface definitions...`}
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
