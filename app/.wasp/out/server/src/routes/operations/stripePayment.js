import { createAction } from '../../middleware/operations.js'
import stripePayment from '../../actions/stripePayment.js'

export default createAction(stripePayment)
