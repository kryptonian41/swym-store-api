import {
  createNewEmptyStore,
  getStoreByDomain,
  getStoreById,
  getStoresByIds,
  getStoresByDomains,
} from '../services/StoreService'
import { TaskQueue } from '@/commons/TaskQueue'
import TaskTypes from '@/commons/TaskTypes'
import Store, { IStoreSchema } from '@/commons/mongoDb/models/StoreModel'

export const addNewStore = async (req, res, next) => {
  const { domain } = req.body
  if (!domain) return next(new Error('Missing required request parameteres'))
  let store = await getStoreByDomain(domain)
  if (!store) {
    store = await createNewEmptyStore(domain)
    TaskQueue.add(TaskTypes.ADD_NEW_STORE, { domain })
  }
  res.json({ success: true, data: store })
}

export const getStoreInfo = async (req, res, next) => {
  const { domain, id } = req.query

  if (!domain && !id) return next(new Error('Invalid request parameters'))

  let StoreInfo
  if (domain) {
    StoreInfo = await getStoreByDomain(domain)
  }
  if (id) {
    StoreInfo = await getStoreById(id)
  }
  if (!StoreInfo) return res.json({ message: 'Store not found' })
  res.json(StoreInfo)
}

export const getStoresInfo = async (req, res, next) => {
  const { domains, ids } = req.body
  if (!domains && !ids)
    return next(new Error('Cannot find domains or ids in the reqyest body'))
  if (ids) {
    const stores = await getStoresByIds(ids)
    res.json(stores)
    return
  }
  if (domains) {
    const stores = await getStoresByDomains(domains)
    res.json(stores)
    return
  }
}

export const getListOfAvailableStores = async (req, res) => {
  let allStores: any[] = await Store.find({})
  // Use mongoDB source to fetch only the required values from the database
  allStores = allStores.map((store: IStoreSchema) => ({
    id: store.id,
    domain: store.domain,
  }))
  res.json(allStores)
}
