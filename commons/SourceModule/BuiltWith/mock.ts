import ISourceModuleBase from '../SourceModuleBase'
import axios, { AxiosInstance } from 'axios'
import _ from 'lodash'

export class BuiltWithMock implements ISourceModuleBase {
  private axiosInstance: AxiosInstance
  private rootApiURL: string = 'http://localhost:3000/stores'
  private temporaryResponse: any
  constructor() {
    if (!process.env.BUILTWITH_API_KEY)
      throw new Error(
        `No API key found for BuiltWith in the process environment. 
        Please add a the API key as "BUILTWITH_API_KEY" into the process environment`
      )
    this.axiosInstance = axios.create({
      baseURL: this.rootApiURL,
    })
  }
  isUpdatedDataAvailable(domain: string): boolean {
    const isDataAvailable = this.isDataPresent(domain)
    if (!isDataAvailable) return false
    return true
  }

  async fetchData(domain: string) {
    const isDataPresent = await this.isDataPresent(domain)
    if (!isDataPresent) {
      return null
    }
    const { Result, Meta, Attributes } = this.temporaryResponse[0]
    const storeData = _.set<any>({}, 'techstack', Result)
    _.set(storeData, 'techstack.technologies', Result.Paths[0].Technologies)
    _.unset(storeData, 'techstack.Paths')
    _.set(storeData, 'metaData', Meta)
    _.set(storeData, 'attributes', Attributes)
    return storeData
  }

  updateData() {
    throw new Error('Method not implemented.')
  }
  sanitizeData<T>(data: T) {
    throw new Error('Method not implemented.')
  }
  async isDataPresent(domain): Promise<boolean> {
    const response = await this.axiosInstance
      .get('/', {
        params: {
          Lookup: domain,
        },
      })
      .then((res) => res.data)
    if (response?.Errors?.length > 0) {
      console.log('BuiltWith -> fetchData -> response', response.Errors)
      return false
    }
    this.temporaryResponse = response
    return true
  }
}

export default BuiltWithMock
