import React, { Component } from 'react';
import Results from '../Results/Results';
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

    // api.fetchDefinitions()
    //   .then((definitions) => {
    //     this.definitions = definitions;
    //   })
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
        <div className={"container search-container " + (this.state.query.length ? 'search-results' : '')}>
          <div className="row">
            <div className="col-md-12">
              <input type="text"
                value={this.state.query}
                placeholder="Search Definitions..."
                className="form-control"
                onChange={this.search} />
            </div>
          </div>
        </div>
        <Results results={this.state.results} />
      </div>
    )
  }
}

export default Search;
