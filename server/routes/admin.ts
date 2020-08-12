import express from 'express'
import { addNewStore } from '../controllers/storeController'

const router = express.Router()

router.post('/new-store', addNewStore)

export default router
