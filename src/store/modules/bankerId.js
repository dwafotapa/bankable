import uuid from 'uuid'

export const SET_BANKER_ID = 'SET_BANKER_ID'

export const setBankerId = () => ({
  type: SET_BANKER_ID,
  id: uuid()
})

const initialState = uuid()

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_BANKER_ID:
      return action.id
    default:
      return state
  }
}