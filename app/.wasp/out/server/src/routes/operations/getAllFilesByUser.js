import { createQuery } from '../../middleware/operations.js'
import getAllFilesByUser from '../../queries/getAllFilesByUser.js'

export default createQuery(getAllFilesByUser)
