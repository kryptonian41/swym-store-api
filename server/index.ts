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
import rateLimit from 'express-rate-limit'
import slowDown from 'express-slow-down'

const app = express()

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

// Server utility middleware config
app.use(helmet())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 100, // allow 100 requests per 15 minutes, then...
  delayMs: 500, // begin adding 500ms of delay per request above 100:
})

// Router Configuration
app.use('/api', apiRateLimiter, speedLimiter)
app.use('/api/v1', ApiRouter)
app.use('/admin', AdminRouter)

// Request Error handler
app.use((err, _req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  res.json({ message: err.message || 'BAD REQUEST' })
})

// Starting the Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(info(`API Server listening on localhost port: ${PORT}`))
)
