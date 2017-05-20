declare module "search-flow-typed" {
  declare type ValidResult = {|
    type: string,
    definition: string,
    flow: string,
    version: string,
  |};

  declare type InvalidResult  = {| type: null |};

  declare type Result = ValidResult | InvalidResult;

  declare type Path = {
    path: string,
    type: string
  };

  declare type RawResult = {
    data: {tree: Path}
  };

  declare type NetResult = {
    definition: string,
    versions: ValidResult[]
  };

  declare module.exports: any;
}
