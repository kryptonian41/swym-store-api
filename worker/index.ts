import '@/commons/mongoDb'
import { taskQueueName } from '@/commons/TaskQueue'
import TaskTypes from '@/commons/TaskTypes'
import { Worker } from 'bullmq'
import dotenv from 'dotenv'
import FreshDatafetchFromSourceHandler from './taskHandlers/freshStoreDataFetchFromSource'
import GetStoreToUpdateHandler from './taskHandlers/getStoreToUpdate'
import UpdateStoreDataFromSourceHandler from './taskHandlers/updateStoreDataFromSource'

// Loading secrets into the process environment
dotenv.config()

const worker = new Worker(taskQueueName, async (job) => {
  const { name: jobName } = job
  switch (jobName) {
    case TaskTypes.ADD_NEW_STORE:
    case TaskTypes.FRESH_DATA_FETCH_FROM_SOURCE: {
      await FreshDatafetchFromSourceHandler(job)
      break
    }
    case TaskTypes.GET_STORES_TO_UPDATE: {
      await GetStoreToUpdateHandler(job)
      break
    }
    case TaskTypes.UPDATE_STORE_DATA_FOR_SOURCE: {
      await UpdateStoreDataFromSourceHandler(job)
      break
    }

    default:
      break
  }
})
