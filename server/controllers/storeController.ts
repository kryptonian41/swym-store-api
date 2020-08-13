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
import HttpStatus from 'http-status-codes'

export const addNewStore = async (req, res, next) => {
  const { domain } = req.body
  if (!domain) {
    res.status(HttpStatus.BAD_REQUEST)
    return next(new Error('Missing required request parameteres'))
  }
  let store = await getStoreByDomain(domain)
  if (!store) {
    store = await createNewEmptyStore(domain)
    TaskQueue.add(TaskTypes.ADD_NEW_STORE, { domain })
  }
  res.json({ success: true, data: store })
}

export const getStoreInfo = async (req, res, next) => {
  const { domain, id } = req.query

  if (!domain && !id) {
    res.status(HttpStatus.BAD_REQUEST)
    return next(new Error('Invalid request parameters'))
  }

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
  if (!domains && !ids) {
    res.status(HttpStatus.BAD_REQUEST)
    return next(new Error('Cannot find domains or ids in the reqyest body'))
  }
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
  let allStores: any[] = await Store.find(
    {
      isPopulated: true,
    },
    { domain: 1, _id: 1 }
  )
  res.json(allStores)
}
