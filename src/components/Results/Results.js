import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Variant extends Component {
  render() {
    return (
      <li>
        {this.props.variant.version}
        <ul>
          {this.props.variant.flows.map((flow) => {
            return (
              <li key={flow}>{flow}</li>
            )
          })}
        </ul>
      </li>
    )
  }
}

class Definition extends Component {
  render() {
    return (
      <li>
        {this.props.result.definition}
        <ul>
          {this.props.result.versions.map((variant) => {
            return (
              <Variant key={variant.version} variant={variant}/>
            )
          })}
        </ul>
      </li>
    )
  }
}

Definition.propTypes = {
  result: PropTypes.object.isRequired
}

class Results extends Component {
  render() {
    return (
      <ul>
        {this.props.results.map((result) => {
          return (
            <Definition key={result.definition} result={result}/>
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
