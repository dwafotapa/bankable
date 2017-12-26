import uuid from 'uuid'

export const SET_BANKER_ID = 'SET_BANKER_ID'

export const setBankerId = () => ({
  type: SET_BANKER_ID,
  id: uuid()
})