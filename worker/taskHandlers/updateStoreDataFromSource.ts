import SourceModuleToKeyMapping from '@/commons/SourceModule/SourceModuleKeyMapping'
import Store from '@/commons/mongoDb/models/StoreModel'
import _ from 'lodash'

export const handler = async (job) => {
  const { domain, source } = job.data
  const SourceModule = SourceModuleToKeyMapping[source]

  const isUpdatedDataAvailable = await SourceModule.isUpdatedDataAvailable(
    domain
  )

  if (!isUpdatedDataAvailable) return

  const storeDataFromSource = await SourceModule.fetchData(domain)
  await Store.findOneAndUpdate(
    {
      domain,
    },
    {
      lastUpdated: new Date(),
      isPopulated: true,
      $addToSet: {
        sources: source,
      },
      $set: {
        [`sourcesData.${source}`]: storeDataFromSource,
      },
    }
  )
}

export default handler
