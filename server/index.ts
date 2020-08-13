require('dotenv').config()
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import '@/commons/mongoDb/index'
import AdminRouter from './routes/admin'
import ApiRouter from './routes/api'
import { info } from '@/commons/chalks'
import './cornJobSetupAndCleanUp'

const app = express()

// Server utility middleware config
app.use(helmet())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Router Configuration
app.use('/api', ApiRouter)
app.use('/admin', AdminRouter)

// Request Error handler
app.use((err, _req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.json({ message: err.message || 'BAD REQUEST' })
})

// Starting the Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(info(`API Server listening on localhost port: ${PORT}`))
)
