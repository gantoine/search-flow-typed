// @flow

import React, { Component, Element } from 'react';
import Results from '../Results/Results';
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
      definitions: [],
    }
    this.search = this.search.bind(this);
    this.resultClass = this.resultClass.bind(this);

    api.fetchDefinitions()
      .then((definitions: NetResult[]) => {
        this.setState({definitions: definitions});
      })
  }
  search(event: SyntheticInputEvent) {
    let query = event.target.value;
    let filtered: NetResult[] = [];

    if (query !== '') {
      filtered = _.filter(this.state.definitions, (typedef: NetResult) => {
        return typedef.definition.toLowerCase().includes(query);
      })
    }

    this.setState({
      query: query,
      results: _.first(filtered, 20)
    });
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
            <div className="row">
              <div className="col-md-12 input-group input-group-lg">
                <span className="input-group-addon" id="search-addon">
                  <FontAwesome name='search' />
                </span>
                <input type="text"
                  value={this.state.query}
                  placeholder={`Search ${this.state.definitions.length} third-party library interface definitions...`}
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
