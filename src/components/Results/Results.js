import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PanelGroup, Panel, Well, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Clipboard from 'clipboard';

import './Results.css'

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

class PanelHeader extends Component {
  constructor(props) {
    super();
    this.clipboard = new Clipboard('.well');
  }
  componentWillUnmount() {
    this.clipboard.destroy();
  }
  render() {
    return (
      <div className="panel-title">
        <div className="panel-result-title">{this.props.definition}</div>
        <OverlayTrigger placement="bottom" overlay={
            <Tooltip id={"tooltip-" + this.props.definition}>Click to Copy!</Tooltip>
          }>
          <Well data-clipboard-text={"flow-typed install" + this.props.definition}>
            flow-typed install {this.props.definition}
          </Well>
        </OverlayTrigger>
      </div>
    )
  }
}

PanelHeader.propTypes = {
  definition: PropTypes.string.isRequired
}

class Results extends Component {
  render() {
    return (
      <div className="container">
        <PanelGroup>
          {this.props.results.map((result) => {
            var def = result.definition;
            return (
              <Panel key={def} eventKey={def}
                  header={<PanelHeader definition={def} />}>
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
