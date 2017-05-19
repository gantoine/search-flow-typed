import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PanelGroup, Panel } from 'react-bootstrap';

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

Variant.propTypes = {
  variant: PropTypes.object.isRequired
}

class Definition extends Component {
  render() {
    return (
      <div>
        {this.props.result.versions.map((variant) => {
          return (
            <Variant key={variant.version} variant={variant}/>
          )
        })}
      </div>
    )
  }
}

Definition.propTypes = {
  result: PropTypes.object.isRequired
}

class Results extends Component {
  constructor(props) {
    super();
    this.state = {
      activeKey: (props.results[0] ? props.results[0].definition : ''),
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(activeKey) {
    this.setState({activeKey});
  }
  render() {
    return (
      <div className="container">
        <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
          {this.props.results.map((result) => {
            var def = result.definition;
            return (
              <Panel key={def} header={def} eventKey={def}>
                <Definition result={result}/>
              </Panel>
            )
          })}
        </PanelGroup>
      </div>
    )
  }
}

Results.propTypes = {
  results: PropTypes.array.isRequired
}

export default Results;
