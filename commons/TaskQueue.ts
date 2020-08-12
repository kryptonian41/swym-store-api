import { Queue, QueueScheduler } from 'bullmq'
export const taskQueueName = 'store-task-queue'

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
