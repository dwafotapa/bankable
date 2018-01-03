export const SET_BANKER_ID = 'SET_BANKER_ID'

export const setBankerId = (id) => ({
  type: SET_BANKER_ID,
  id
})

const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BANKER_ID:
      return action.id
    default:
      return state
  }
}

export default reducer