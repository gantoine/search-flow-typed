var axios = require('axios');

// var id = "YOUR_CLIENT_ID";
// var sec = "YOUR_SECRET_ID";
// var params = "?client_id=" + id + "&client_secret=" + sec;

function parsePath(path) {
  const split = path.path.split('/')
  if(split.length !== 3) { return {}; }

  var definition, flow, _rest;
  [definition, flow, ..._rest] = split;
  return {
    definition: definition,
    flow: flow
  }
}

function navigateDefinition(directory) {
  return directory.data.tree.filter((definition) => {
    return definition.type === "blob";
  }).map(parsePath)
}


module.exports = {
  fetchDefinitions: () => {
    const endpoint = 'https://api.github.com/repos/flowtype/flow-typed/git/trees/master:definitions/npm?recursive=1';
    return axios.get(endpoint)
      .then(navigateDefinition);
  }
};
