// @flow

import axios from 'axios'
import _ from 'underscore'
import algoliasearch from 'algoliasearch';

import type {Path, Result, NetResult, ValidResult} from 'search-flow-typed'

const client = algoliasearch("IJU4P8BKDG", "4ea5b10fc24b8e8c9ef8db338e25653a");
const index = client.initIndex('flowtyped_definitions');

function algoliaSearch(params, cb): null {
  index.search(params, (err, content) => {
    if (err) {
      console.error(err);
      return;
    }

    cb(content.hits);
  })
};

module.exports = {
  search: (query, cb) => {
    let params = {
      query: query,
      hitsPerPage: 20,
    };
    algoliaSearch(params, cb);
  }
};
