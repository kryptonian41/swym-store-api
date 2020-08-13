export interface ISourceModuleBase {
  fetchData(domainName: string)
  isUpdatedDataAvailable(domainName: string): boolean
  getSanitizedData()
  isDataPresent(domainName: string): boolean | Promise<boolean>
}

export default ISourceModuleBase
