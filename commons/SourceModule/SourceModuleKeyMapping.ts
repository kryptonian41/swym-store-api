import BuiltWith from './BuiltWith'
import { ISourceModuleBase } from './SourceModuleBase'

interface ModuleKeyMapping {
  [sourceName: string]: ISourceModuleBase
}
export const SourceModuleToKeyMapping: ModuleKeyMapping = {
  builtWith: new BuiltWith(),
}

export default SourceModuleToKeyMapping
