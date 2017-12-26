import uuid from 'uuid'
import * as actions from './actions'
import reducer from './reducer'

describe('actions', () => {
  it('should return the initial state by default', () => {
    const initialState = {}

    const nextState = reducer(initialState, { type: 'DEFAULT'})

    expect(nextState).toBe(initialState)
  });

  it('should handle SET_BANKER_ID', () => {
    const action = {
      type: actions.SET_BANKER_ID,
      id: uuid()
    }

    const nextState = reducer({}, action)

    expect(nextState.bankerId).toEqual(action.id)
  })
})