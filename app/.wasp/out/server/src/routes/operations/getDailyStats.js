import { createQuery } from '../../middleware/operations.js'
import getDailyStats from '../../queries/getDailyStats.js'

export default createQuery(getDailyStats)
