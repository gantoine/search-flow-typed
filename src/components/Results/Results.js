import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Result extends Component {
  render() {
    return (
      <li key={this.props.result.definition}>
        {this.props.result.definition}
      </li>
    )
  }
}

Result.propTypes = {
  result: PropTypes.object.isRequired
}

class Results extends Component {
  render() {
    return (
      <ul>
        {this.props.results.map((result) => {
          return (
            <Result result={result}/>
          )
        })}
      </ul>
    )
  }
}

Results.propTypes = {
  results: PropTypes.array.isRequired
}

export default Results;
