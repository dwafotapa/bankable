import uuid from 'uuid'
import * as actions from './actions'
import reducer from './reducer'

describe('actions', () => {
  const initialState = uuid()

  it('should return the initial state by default', () => {
    const nextState = reducer(initialState, { type: 'DEFAULT'})

    expect(nextState).toBe(initialState)
  });

  it('should handle SET_BANKER_ID', () => {
    const action = {
      type: actions.SET_BANKER_ID,
      id: uuid()
    }

    const nextState = reducer(initialState, action)

    expect(nextState).toEqual(action.id)
  })
})