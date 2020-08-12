import { Queue } from 'bullmq'
export const taskQueueName = 'store-task-queue'
export const TaskQueue = new Queue(taskQueueName)
