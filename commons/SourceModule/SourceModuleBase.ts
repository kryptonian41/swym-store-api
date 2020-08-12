export interface ISourceModuleBase {
  fetchData(domainName: string)
  isUpdatedDataAvailable(domainName: string): boolean
  updateData(domainName: string)
  sanitizeData<T>(data: T)
  isDataPresent(domainName: string): boolean
}

export default ISourceModuleBase
