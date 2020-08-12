import SourceModuleToKeyMapping from '@/commons/SourceModule/SourceModuleKeyMapping'
import { TaskQueue } from '@/commons/TaskQueue'
import TaskTypes from '@/commons/TaskTypes'

const allAvailableSources = Object.keys(SourceModuleToKeyMapping)
export const handler = (job) => {
  const { domain } = job
  allAvailableSources.forEach((source) => {
    TaskQueue.add(TaskTypes.FRESH_DATA_FETCH_FROM_SOURCE, {
      domain,
      source,
    })
  })
}

export default handler
