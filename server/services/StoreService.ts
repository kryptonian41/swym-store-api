import Store from '@/commons/mongoDb/models/StoreModel'

export const createNewEmptyStore = async (domain: string) =>
  await Store.create({
    domain,
    dateAdded: new Date(),
    isPopulated: false,
    lastUpdated: new Date(),
  })

export const getStoreByDomain = async (domain: string) =>
  await Store.findOne({ domain })
