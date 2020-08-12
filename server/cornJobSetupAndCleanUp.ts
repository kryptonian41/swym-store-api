import { TaskQueue } from '@/commons/TaskQueue'
import TaskTypes from '@/commons/TaskTypes'
import { warning, info } from '@/commons/chalks'
import mongoose from 'mongoose'

const repeatConfig = {
  every: 100000,
}

TaskQueue.add(
  TaskTypes.GET_STORES_TO_UPDATE,
  {},
  {
    repeat: repeatConfig,
  }
)

process.on('SIGTERM', async function () {
  console.log('\n')
  console.log(
    warning(`Removing repeatable task ${TaskTypes.GET_STORES_TO_UPDATE}`)
  )
  try {
    await TaskQueue.removeRepeatable(
      TaskTypes.GET_STORES_TO_UPDATE,
      repeatConfig
    )

    const remainingRepeatableJobs = await TaskQueue.getRepeatableJobs()
    console.log(info('Remaining Cron Jobs:'), remainingRepeatableJobs)
    await mongoose.connection.close()
    console.log(
      'Mongoose default connection is disconnected due to application termination'
    )
    process.exit(0)
  } catch (error) {
    console.log('error', error)
  }
})

process.on('SIGINT', async function () {
  console.log('\n')
  console.log(
    warning(`Removing repeatable task ${TaskTypes.GET_STORES_TO_UPDATE}`)
  )
  try {
    await TaskQueue.removeRepeatable(
      TaskTypes.GET_STORES_TO_UPDATE,
      repeatConfig
    )

    const remainingRepeatableJobs = await TaskQueue.getRepeatableJobs()
    console.log(info('Remaining Cron Jobs:'), remainingRepeatableJobs)
    await mongoose.connection.close()
    console.log(
      'Mongoose default connection is disconnected due to application termination'
    )
    process.exit(0)
  } catch (error) {
    console.log('error', error)
  }
})
