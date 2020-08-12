import SourceModuleToKeyMapping from '@/commons/SourceModule/SourceModuleKeyMapping'
import Store from '@/commons/mongoDb/models/StoreModel'
import { TaskQueue } from '@/commons/TaskQueue'
import TaskTypes from '@/commons/TaskTypes'

const allAvailableSources = Object.keys(SourceModuleToKeyMapping)

export const handler = async (job) => {
  const allStores = await Store.find({})
  allStores.forEach((store) => {
    allAvailableSources.forEach((source) => {
      TaskQueue.add(TaskTypes.UPDATE_STORE_DATA_FOR_SOURCE, {
        domain: store.domain,
        source,
      })
    })
  })
}

export default handler
