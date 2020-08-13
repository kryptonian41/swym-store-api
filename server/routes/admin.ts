import express from 'express'
import { addNewStore } from '../controllers/storeController'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import path from 'path'

const router = express.Router()

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Sherlock for the Web - Admin API',
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
        url: 'http://localhost:5000/admin/v1',
      },
    ],
  },
  apis: [
    path.resolve('./server/swagger-models/Store.ts'),
    path.resolve('./server/routes/admin.ts'),
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
 *   name: Manage Stores
 */

/**
 * @swagger
 * path:
 *  /new-store/:
 *    post:
 *      summary: Get the data of many stores at once
 *      tags: [Manage Stores]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Store'
 *            example:
 *              domain: flipkart.com
 *      responses:
 *        "200":
 *          description: Data for a Store
 *          content:
 *            application/json:
 *              examples:
 *                For a new store:
 *                  value:
 *                    success: true
 *                    data: {
 *                      sources: [],
 *                      _id: 5f356ca67c19027571f4be7a,
 *                      domain: amazon.com,
 *                      dateAdded: 2020-08-13T16:39:02.704Z,
 *                      isPopulated: false,
 *                      lastUpdated: 2020-08-13T16:39:02.704Z,
 *                      __v: 0
 *                    }
 */

router.post('/new-store', addNewStore)

export default router
