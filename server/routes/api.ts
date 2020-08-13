import express from 'express'
import {
  getStoreInfo,
  getListOfAvailableStores,
  getStoresInfo,
} from '../controllers/storeController'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import path from 'path'

const router = express.Router()

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Sherlock for the Web',
      version: '1.0.0-beta',
      description:
        'An API to dig out information about any website be it their tech-stack, traffic, rankings etc.',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
      contact: {
        name: 'Swym',
        url: 'https://swym.it',
        email: 'Info@swym.it',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
      },
    ],
  },
  apis: [
    path.resolve('./server/swagger-models/Store.ts'),
    path.resolve('./server/routes/api.ts'),
  ],
}
const specs = swaggerJsDoc(options)
router.use('/docs', swaggerUi.serve)
router.get(
  '/docs',
  swaggerUi.setup(specs, {
    explorer: true,
  })
)

/**
 * @swagger
 * tags:
 *   name: Stores
 */

/**
 * @swagger
 * path:
 *  /list-stores/:
 *    get:
 *      summary: Get the list of populated stores
 *      tags: [Stores]
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: number
 *          description: Page number ( defaults to 1)
 *        - in: query
 *          name: pageSize
 *          schema:
 *            type: number
 *          description: Number of results to be returned in one page ( defaults to 10)
 *      responses:
 *        "200":
 *          description: The list of stores
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Store'
 */
router.get('/list-stores', getListOfAvailableStores)

/**
 * @swagger
 * path:
 *  /store-info/:
 *    get:
 *      summary: Get the data of a store
 *      tags: [Stores]
 *      parameters:
 *        - in: query
 *          name: domain
 *          schema:
 *            type: string
 *          description: Domain of the store
 *        - in: query
 *          name: id
 *          schema:
 *            type: string
 *          description: Id of the store
 *      responses:
 *        "200":
 *          description: Data for a Store
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Store'
 */
router.get('/store-info', getStoreInfo)

/**
 * @swagger
 * path:
 *  /stores-info/:
 *    post:
 *      summary: Get the data of many stores at once
 *      tags: [Stores]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Store'
 *            examples:
 *              Domains:
 *                value:
 *                  domains: ["naya.ai", "flipkart.com"]
 *              Ids:
 *                value:
 *                  ids: ["store_id-1", "another-store-id"]
 *      responses:
 *        "200":
 *          description: Data for a Store
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Store'
 */
router.post('/stores-info', getStoresInfo)

export default router
