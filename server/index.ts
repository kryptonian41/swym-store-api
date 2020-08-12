require('dotenv').config()
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import '@/commons/mongoDb/index'
import AdminRouter from './routes/admin'
import ApiRouter from './routes/api'
import { info } from '@/commons/chalks'

const app = express()

// Server utility middleware config
app.use(helmet())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Router Configuration
app.use('/api', ApiRouter)
app.use('/admin', AdminRouter)

// Starting the Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(info(`API Server listening on localhost port: ${PORT}`))
)
