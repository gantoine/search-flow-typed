declare module "Result" {
  type VariantProps = {
    variant: ValidResult
  };

  type DefinitionProps = {
    result: NetResult
  };

  type PanelHeaderProps = {
    command: string
  };

  type ResultsProps = {
    results: NetResult[]
  }
}
