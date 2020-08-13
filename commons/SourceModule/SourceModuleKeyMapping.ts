import BuiltWith from './BuiltWith'
import BUildWithMock, { BuiltWithMock } from './BuiltWith/mock'
import { ISourceModuleBase } from './SourceModuleBase'

interface ModuleKeyMapping {
  [sourceName: string]: ISourceModuleBase
}
export const SourceModuleToKeyMapping: ModuleKeyMapping = {
  builtWith: new BuiltWithMock(),
}

export default SourceModuleToKeyMapping
