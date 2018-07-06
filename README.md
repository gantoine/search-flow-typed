[![travis build](https://img.shields.io/travis/GAntoine/search-flow-typed.svg?style=flat-square)](https://travis-ci.org/GAntoine/search-flow-typed)
[![MIT License](https://img.shields.io/npm/l/retro-game-names.svg?style=flat-square)](http://opensource.org/licenses/MIT)

Flow-Typed Definition Search is an online tool for finding third-party library
interface definitions, located in the [flow-typed](https://github.com/flow-typed/flow-typed)
repository. FTDS will fetch the latest definitions at each page refresh.

## Installing

Clone the project, and run `npm install` or `yarn install`. It uses
[react-scripts](https://github.com/facebookincubator/create-react-app) for
all the common `npm` commands.

## Deploys

Travis takes care of deploying master to production on every build.
[Surge](https://surge.sh/) takes care of hosting the app.

## Contributing

If you're interesting in contibuting, fork the repo, make your changes and open a
pull request. Please consider adding/improving tests along the way, but I won't
twist your arm. PRs with failing builds will be rejected, all will ones will failing
flow type checking.
