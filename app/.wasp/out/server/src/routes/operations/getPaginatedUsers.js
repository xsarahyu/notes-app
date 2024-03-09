import { createQuery } from '../../middleware/operations.js'
import getPaginatedUsers from '../../queries/getPaginatedUsers.js'

export default createQuery(getPaginatedUsers)
