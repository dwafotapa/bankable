import { fromJS } from 'immutable'
import uuid from 'uuid'

export const RESET_BANKER_ID = 'RESET_BANKER_ID'
export const SET_BANKER_ID = 'SET_BANKER_ID'

export const resetBankerId = () => ({
  type: RESET_BANKER_ID,
  id: uuid()
})

export const setBankerId = (id) => ({
  type: SET_BANKER_ID,
  id
})

export const getBankerId = (state) => state.bankers.get('bankerId')
export const getBankerIds = (state) => state.bankers.get('ids')

const initialState = fromJS({
  bankerId: '',
  ids: []
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_BANKER_ID:
      return state.merge({
        bankerId: action.id,
        ids: state.get('ids').unshift(action.id)
      })
    case SET_BANKER_ID:
      return state.merge({
        bankerId: action.id
      })
    default:
      return state
  }
}

export default reducer