import { createNewEmptyStore } from '../services/StoreService'
import { TaskQueue } from '@/commons/TaskQueue'
import TaskTypes from '@/commons/TaskTypes'
import Store from '@/commons/mongoDb/models/StoreModel'

export const addNewStore = async (req, res) => {
  const { domain } = req.body
  if (!domain)
    return res.status(400).json({
      message: 'Missing required request parameteres',
    })
  await createNewEmptyStore(domain)
  let store = await Store.findOne({ domain })
  if (!store)
    store = await Store.create({
      domain,
      dateAdded: new Date(),
      isPopulated: false,
      lastUpdated: new Date(),
    })
  if (!store.isPopulated)
    TaskQueue.add(TaskTypes.ADD_NEW_STORE, { domain, source: 'builtWith' })
  res.json({ success: true, data: store })
}
