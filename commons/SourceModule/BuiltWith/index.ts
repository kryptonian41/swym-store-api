import ISourceModuleBase from '../SourceModuleBase'
import axios, { AxiosInstance } from 'axios'

export class BuiltWith implements ISourceModuleBase {
  private apiKey: string
  private axiosInstance: AxiosInstance
  private rootApiURL: string = 'https://api.builtwith.com/free1/api.json'
  constructor() {
    if (!process.env.BUILTWITH_API_KEY)
      throw new Error(
        `No API key found for BuiltWith in the process environment. 
        Please add a the API key as "BUILTWITH_API_KEY" into the process environment`
      )
    this.apiKey = process.env.BUILTWITH_API_KEY
    this.axiosInstance = axios.create({
      baseURL: this.rootApiURL,
      params: {
        KEY: this.apiKey,
      },
    })
  }
  isUpdatedDataAvailable(domainName: string): boolean {
    throw new Error('Method not implemented.')
  }
  async fetchData(domainName: string) {
    const storeData = await this.axiosInstance
      .get('/', {
        params: {
          LOOKUP: domainName,
          ...this.axiosInstance.defaults.params,
        },
      })
      .then((res) => res.data)
    return storeData
  }
  updateData() {
    throw new Error('Method not implemented.')
  }
  sanitizeData<T>(data: T) {
    throw new Error('Method not implemented.')
  }
  isDataPresent(): boolean {
    throw new Error('Method not implemented.')
  }
}

export default BuiltWith
