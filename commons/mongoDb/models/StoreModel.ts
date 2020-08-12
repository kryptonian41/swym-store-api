import mongoose from 'mongoose'

export interface IStoreSchema extends mongoose.Document {
  name?: string
  domain: string
  isPopulated: boolean
  lastUpdated: Date
  dateAdded: Date
  sources?: string[]
  sourcesData?: {}
}

const StoreSchema = new mongoose.Schema<IStoreSchema>({
  name: { type: String },
  domain: { type: String, required: true },
  isPopulated: { type: Boolean, required: false },
  lastUpdated: { type: Date, required: false },
  dateAdded: { type: Date, required: false },
  sources: { type: Array },
  sourcesData: { type: Object },
})

var Store = mongoose.model<IStoreSchema>('Store', StoreSchema)
export default Store
