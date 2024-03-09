import { createAction } from '../../middleware/operations.js'
import generateGptResponse from '../../actions/generateGptResponse.js'

export default createAction(generateGptResponse)
