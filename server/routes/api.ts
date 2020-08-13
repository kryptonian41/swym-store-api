import express from 'express'
import {
  getStoreInfo,
  getListOfAvailableStores,
  getStoresInfo,
} from '../controllers/storeController'

const router = express.Router()

router.get('/list-stores', getListOfAvailableStores)
router.get('/store-info', getStoreInfo)
router.post('/stores', getStoresInfo)

export default router
