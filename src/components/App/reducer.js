import uuid from 'uuid'
import * as actions from './actions'

const initialState = uuid()

const bankerId = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_BANKER_ID:
      return action.id
    default:
      return state
  }
}

export default bankerId