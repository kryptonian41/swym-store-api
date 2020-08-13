import Store from '@/commons/mongoDb/models/StoreModel'

export const createNewEmptyStore = async (domain: string) =>
  await Store.create({
    domain,
    dateAdded: new Date(),
    isPopulated: false,
    lastUpdated: new Date(),
  })

export const getStoreById = async (id: string) => await Store.findById(id)

export const getStoreByDomain = async (domain: string) =>
  await Store.findOne({ domain })

export const getStoresByIds = async (ids: string[]) =>
  await Store.find({
    _id: { $in: ids },
  })

export const getStoresByDomains = async (domains: string[]) =>
  await Store.find({
    domain: { $in: domains },
  })
