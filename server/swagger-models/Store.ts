/**
 * @swagger
 *  components:
 *    schemas:
 *      Store:
 *        type: object
 *        required:
 *          - name
 *          - email
 *        properties:
 *          domain:
 *            type: string
 *          isPopulated:
 *            type: boolean
 *            description: Indicator for whether the data about this store is available or not
 *          lastUpdated:
 *            type: date
 *          dateAdded:
 *            type: date
 *          sources:
 *            type: string[]
 *            description: Array the source names from which the store data was aggregated from
 *          sourcesData:
 *            type: Object
 *            description: Object containing data from all the sources mentioned in sources array
 *        example:
 *           sources: [builtWith]
 *           _id: 5f3538f48898ff18b532285a
 *           domain: flipkart.com
 *           dateAdded: 2020-08-13T12:58:28.644Z
 *           isPopulated: true
 *           lastUpdated: 2020-08-13T15:36:40.054Z
 *           __v: 0
 *           sourcesData: {
 *             builtWith: {
 *               techstack: {
 *                 technologies: {
 *                   analytics: [
 *                     {
 *                       Categories: [
 *                         Advertiser Tracking
 *                       ],
 *                       IsPremium: no,
 *                       Name: Google Analytics with Ad Tracking,
 *                       Description:
 *              Google Analytics collects the information it normally does as well as the DoubleClick cookie when that cookie is present in relation to display  advertising  tracking.,
 *                       Link: https://support.google.com/analytics/answer/2444872,
 *                       FirstDetected: 1387494000000,
 *                       LastDetected: 1551308400000
 *                     }
 *                ]}}}
 *                }
 */
