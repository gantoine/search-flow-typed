import axios from 'axios'
import _ from 'underscore'

function parsePath(path) {
  const flow = /\/(flow_.+)/.exec(path.path);
  const definition = /(.+v\d.+)\/flow/.exec(path.path);

  if (!(flow && definition)) {
    return {type: null};
  }

  return {
    definition: definition[1],
    flow: flow[1],
    type: path.type
  }
}

function navigateDefinition(directory) {
  return _.chain(directory.data.tree)
    .map(parsePath)
    .filter((definition) => {return definition.type === "tree";})
    .value();
}


module.exports = {
  fetchDefinitions: () => {
    const endpoint = 'https://api.github.com/repos/flowtype/flow-typed/git/trees/master:definitions/npm?recursive=1';
    return axios.get(endpoint)
      .then(navigateDefinition);
  }
};
