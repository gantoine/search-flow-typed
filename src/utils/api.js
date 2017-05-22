// @flow

import axios from 'axios'
import _ from 'underscore'
import type {Path, Result, NetResult, ValidResult} from 'search-flow-typed'

function parsePath(path: Path): Result {
  const flow: any = /\/(flow_.+)/.exec(path.path);
  const definition: any = /(.+v\d.+)\/flow/.exec(path.path);

  if (!(flow && definition)) {
    return {type: null};
  }

  let typedef: string, version: string;
  [typedef, version] = definition[1].split('_v');

  return {
    definition: typedef,
    version: version,
    flow: flow[1],
    type: path.type,
  }
};

function navigateDefinition(directory): NetResult[] {
  return _.chain(directory.data.tree)
    .map(parsePath)
    .filter((typedef: Result): boolean => {return typedef.type === "tree";})
    .groupBy('definition')
    .map((typedef: ValidResult[]): NetResult => {
      return {
        definition: typedef[0].definition,
        versions: typedef
      }
    })
    .value();
};

module.exports = {
  fetchDefinitions: () => {
    const endpoint: string = 'https://api.github.com/repos/flowtype/flow-typed/git/trees/master:definitions/npm?recursive=1';
    return axios.get(endpoint)
      .then(navigateDefinition);
  }
};
