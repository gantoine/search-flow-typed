// @flow

import React, { Component, Element } from 'react';
import { PanelGroup, Panel, Well, OverlayTrigger, Tooltip, Table } from 'react-bootstrap';
import Clipboard from 'clipboard';
import FontAwesome from 'react-fontawesome';

import type { ValidResult, NetResult } from 'search-flow-typed';
import type { VariantProps, DefinitionProps, PanelHeaderProps, ResultsProps } from './Results.type'
import './Results.css';

class Variant extends Component {
  toRepo: Function;
  installCommand: Function;
  props: VariantProps;
  clipboard: Clipboard;

  constructor(props: Object) {
    super(props);
    this.clipboard = new Clipboard('.definiton-variant');
    this.installCommand = this.installCommand.bind(this);
    this.toRepo = this.toRepo.bind(this);
  }
  componentWillUnmount() {
    this.clipboard.destroy();
  }
  toRepo(variant: ValidResult): string {
    let github: string = 'https://github.com/flowtype/flow-typed/tree/master/definitions/npm';
    return `${github}/${variant.definition}_v${variant.version}/${variant.flow}`;
  }
  installCommand(variant): string {
    return `flow-typed install ${variant.definition}@${variant.version}`;
  }
  render(): Element<any> {
    return (
      <OverlayTrigger placement="bottom" overlay={
          <Tooltip id={`tooltip-${this.props.variant.version}-${this.props.variant.flow}`}>
            Click to Copy Install Command!
          </Tooltip>
        }>
        <tr className="definiton-variant" data-clipboard-text={
            this.installCommand(this.props.variant)
          }>
          <td>{this.props.variant.version}</td>
          <td>{this.props.variant.flow}</td>
          <td>
            <a href={this.toRepo(this.props.variant)} target="_blank" className="hyperlink">
              <FontAwesome name='external-link' />
            </a>
          </td>
        </tr>
      </OverlayTrigger>
    )
  }
}

class Definition extends Component {
  props: DefinitionProps;
  render(): Element<any> {
    return (
      <div>
        <Table responsive>
          <tbody>
            {this.props.result.versions.map((variant: ValidResult) => {
              return (
                <Variant key={`${variant.version}-${variant.flow}`} variant={variant}/>
              )
            })}
          </tbody>
        </Table>
      </div>
    )
  }
}

class PanelHeader extends Component {
  clipboard: Clipboard;
  props: PanelHeaderProps;
  constructor(props: Object): void {
    super(props);
    this.clipboard = new Clipboard('.well');
  }
  componentWillUnmount(): void {
    this.clipboard.destroy();
  }
  render(): Element<any> {
    return (
      <div className="panel-title">
        <div className="panel-result-title">{this.props.command}</div>
        <OverlayTrigger placement="bottom" overlay={
            <Tooltip id={`tooltip-${this.props.command}`}>Click to Copy!</Tooltip>
          }>
          <Well data-clipboard-text={"flow-typed install " + this.props.command}>
            flow-typed install {this.props.command}
          </Well>
        </OverlayTrigger>
      </div>
    )
  }
}

class Results extends Component {
  props: ResultsProps;
  render(): Element<any> {
    return (
      <div className="container">
        <PanelGroup>
          {this.props.results.map((result: NetResult) => {
            let def: string = result.definition;
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

export default Results;
