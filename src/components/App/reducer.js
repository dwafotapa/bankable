import * as actions from './actions'

const initialState = { bankerId: '' }

const bankerId = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_BANKER_ID:
      return { bankerId: action.id }
    default:
      return state
  }
}

export default bankerId