import { Queue, QueueScheduler } from 'bullmq'
export const taskQueueName = 'store-task-queue'

// Do not remove taskQueueScheduler even though it appears that it is unused, it is essential to schedule the cron tasks
const taskQueueScheduler = new QueueScheduler(taskQueueName)
export const TaskQueue = new Queue(taskQueueName)

// NOTE: Code snippet below is to remove all configured repeatable tasks in case of any mis-configurations
// ;(async () => {
//   const jbos = await TaskQueue.getRepeatableJobs()
//   jbos.forEach((job) => {
//     TaskQueue.removeRepeatableByKey(job.key)
//   })
//   console.log('jobs', jbos)
// })()
