import SourceModuleToKeyMapping from '@/commons/SourceModule/SourceModuleKeyMapping'
import Store from '@/commons/mongoDb/models/StoreModel'

export const handler = async (job) => {
  const { domain, source } = job.data
  const SourceModule = SourceModuleToKeyMapping[source]

  const isUpdatedDataAvailable = await SourceModule.isUpdatedDataAvailable(
    domain
  )

  if (!isUpdatedDataAvailable) return

  const storeData = await SourceModule.fetchData(domain)
  await Store.findOneAndUpdate(
    {
      domain,
    },
    {
      lastUpdated: new Date(),
      isPopulated: true,
      dateAdded: new Date(),
      sources: [source],
      $set: {
        [`sourcesData.${source}`]: storeData,
      },
    },
    {
      new: true,
      upsert: true,
    }
  )
}

export default handler
