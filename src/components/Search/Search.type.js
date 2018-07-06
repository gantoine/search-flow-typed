declare module "Search" {
  type State = {
    results: NetResult[],
    query: string,
  };
}
