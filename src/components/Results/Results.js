import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PanelGroup, Panel, Well, OverlayTrigger, Tooltip, Table } from 'react-bootstrap';
import Clipboard from 'clipboard';
import FontAwesome from 'react-fontawesome';

import './Results.css'

class Variant extends Component {
  toRepo(variant) {
    let github = 'https://github.com/flowtype/flow-typed/tree/master/definitions/npm';
    return `${github}/${variant.definition}_v${variant.version}/${variant.flow}`;
  }
  render() {
    return (
      <tr>
        <td>{this.props.variant.version}</td>
        <td>{this.props.variant.flow}</td>
        <td>
          <a href={this.toRepo(this.props.variant)} target="_blank" className="hyperlink">
            <FontAwesome name='external-link' />
          </a>
        </td>
      </tr>
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
        <Table responsive>
          <tbody>
            {this.props.result.versions.map((variant) => {
              return (
                <Variant key={variant.version + variant.flow} variant={variant}/>
              )
            })}
          </tbody>
        </Table>
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
        <div className="panel-result-title">{this.props.command}</div>
        <OverlayTrigger placement="bottom" overlay={
            <Tooltip id={"tooltip-" + this.props.command}>Click to Copy!</Tooltip>
          }>
          <Well data-clipboard-text={"flow-typed install " + this.props.command}>
            flow-typed install {this.props.command}
          </Well>
        </OverlayTrigger>
      </div>
    )
  }
}

PanelHeader.propTypes = {
  command: PropTypes.string.isRequired
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
                  header={<PanelHeader command={def} />}>
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
