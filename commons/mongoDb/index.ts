import mongoose from 'mongoose'
import { success, error } from '../chalks'

// TODO: Throw error if the below mentioned env variables are not present in the process env
const { MONGODB_URI, MONGODB_USERNAME, MONGODB_PASSWORD } = process.env
const dbURL = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_URI}/stores?authSource=admin`

let dbConnection: mongoose.Connection

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
dbConnection = mongoose.connection

mongoose.connection.on('connected', () =>
  console.log(success('Database Connected'))
)
mongoose.connection.on('error', () => console.log(error('Database Connected')))

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log(
      'Mongoose default connection is disconnected due to application termination'
    )
    process.exit(0)
  })
})

export const getDbConnection = () =>
  new Promise((res, rej) => {
    if (dbConnection.readyState === 1) res(dbConnection)
    else if (dbConnection.readyState === 3) {
      dbConnection.on('connected', function () {
        res(dbConnection)
      })
      dbConnection.on('error', function (error) {
        rej(error)
      })
    } else if (dbConnection.readyState === 0)
      rej(new Error('Disconnected from DB'))
  })
