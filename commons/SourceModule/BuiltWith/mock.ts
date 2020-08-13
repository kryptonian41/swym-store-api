import ISourceModuleBase from '../SourceModuleBase'
import axios, { AxiosInstance } from 'axios'
import _ from 'lodash'
import { error } from '@/commons/chalks'

// NOTE: This is a mock class, should be used just for testing with mock local API servers
export class BuiltWithMock implements ISourceModuleBase {
  private axiosInstance: AxiosInstance
  private rootApiURL: string = 'http://localhost:3000/stores'
  private temporaryStoreInfo: any

  constructor() {
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
    return this.getSanitizedData()
  }

  getSanitizedData() {
    const { Result, Meta, Attributes } = this.temporaryStoreInfo[0]
    const processedTechnologies = Result.Paths[0].Technologies.reduce(
      (acc, store) => {
        const { Tag, ...rest } = store
        if (!acc[Tag]) acc[Tag] = []
        acc[Tag].push(rest)
        return acc
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
    _.unset(storeData, 'techstack.Spend')
    return storeData
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
      console.log(error('BuiltWith -> fetchData -> response'), response.Errors)
      return false
    }
    this.temporaryStoreInfo = response
    return true
  }
}

export default BuiltWithMock
