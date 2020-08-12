import express from 'express'
import Store from '@/commons/mongoDb/models/StoreModel'
const router = express.Router()

router.get('/list-stores', (req, res) => {})
router.get('/store-info', async (req, res) => {
  const { domain } = req.query
  console.log('domain', domain)
  const storeData = await Store.findOne({
    domain: domain as string,
  })
  res.json(storeData)
})
router.post('/stores', (req, res) => {})

export default router
