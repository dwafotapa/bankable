import * as actions from './actions'

describe('actions', () => {
  it('should create a SET_BANKER_ID action', () => {
    const expectedAction = { type: actions.SET_BANKER_ID }

    const action = actions.setBankerId()

    expect(action.type).toEqual(expectedAction.type)
  })
})