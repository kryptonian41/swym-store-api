import { createNewEmptyStore } from '../services/StoreService'
import { TaskQueue } from '@/commons/TaskQueue'
import TaskTypes from '@/commons/TaskTypes'

export const addNewStore = async (req, res) => {
  const { domain } = req.body
  if (!domain)
    return res.status(400).json({
      message: 'Missing required request parameteres',
    })
  await createNewEmptyStore(domain)
  TaskQueue.add(TaskTypes.ADD_NEW_STORE, { domain, source: 'builtWith' })
  res.json({ success: true })
}
