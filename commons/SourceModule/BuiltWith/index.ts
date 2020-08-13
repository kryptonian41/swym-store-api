import ISourceModuleBase from '../SourceModuleBase'
import axios, { AxiosInstance } from 'axios'
import _ from 'lodash'
import { error } from '@/commons/chalks'

export class BuiltWith implements ISourceModuleBase {
  private apiKey: string
  private axiosInstance: AxiosInstance
  private rootApiURL: string = 'https://api.builtwith.com/v15/api.json'
  private temporaryStoreInfo: any
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
    return this.getSanitizedData()
  }

  getSanitizedData() {
    const { Result, Meta, Attributes } = this.temporaryStoreInfo.Results[0]
    const processedTechnologies = Result.Paths[0].Technologies.reduce(
      (technologies, store) => {
        const { Tag, ...rest } = store
        if (!technologies[Tag]) technologies[Tag] = []
        technologies[Tag].push(rest)
        return technologies
      },
      {}
    )
    const storeData = _.set<any>({}, 'techstack', Result)
    _.set(storeData, 'techstack.technologies', processedTechnologies)
    _.set(storeData, 'techstack.annualSpend', Result.Spend)
    _.set(storeData, 'metaData', Meta)
    _.set(storeData, 'attributes', Attributes)
    _.unset(storeData, 'techstack.Paths')
    _.unset(storeData, 'techstack.IsDB')
    _.unset(storeData, 'techstack.spend')
    return storeData
  }

  async isDataPresent(domain): Promise<boolean> {
    const response = await this.axiosInstance
      .get('/', {
        params: {
          LOOKUP: domain,
          ...this.axiosInstance.defaults.params,
        },
      })
      .then((res) => res.data)
    if (response?.Errors?.length > 0) {
      console.log(error('BuiltWith -> fetchData -> response'), response.Errors)
      return false
    }
    this.temporaryStoreInfo = response
    return true
  }
}

export default BuiltWith
