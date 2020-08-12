import { TaskQueue } from '@/commons/TaskQueue'
import TaskTypes from '@/commons/TaskTypes'
import { warning, info } from '@/commons/chalks'

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

process.on('SIGINT', async function () {
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
  } catch (error) {
    console.log('error', error)
  }

  process.exit(0)
})
