import { createQuery } from '../../middleware/operations.js'
import getAllTasksByUser from '../../queries/getAllTasksByUser.js'

export default createQuery(getAllTasksByUser)
