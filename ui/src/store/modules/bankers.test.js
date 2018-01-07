import { fromJS } from 'immutable'
import uuid from 'uuid'
import reducer, * as moduleObj from './bankers'

describe('bankers', () => {
  describe('resetBankerId()', () => {
    it('should create a RESET_BANKER_ID action', () => {
      const expectedAction = { type: moduleObj.RESET_BANKER_ID }
  
      const action = moduleObj.resetBankerId()
  
      expect(action.type).toEqual(expectedAction.type)
    })
  })

  describe('setBankerId()', () => {
    it('should create a SET_BANKER_ID action', () => {
      const expectedAction = {
        type: moduleObj.SET_BANKER_ID,
        id: uuid()
      }
  
      const action = moduleObj.setBankerId(expectedAction.id)
  
      expect(action).toEqual(expectedAction)
    })
  })

  describe('reducer()', () => {
    const initialState = fromJS({
      bankerId: '',
      ids: []
    })

    it('should return the initial state by default', () => {
      const nextState = reducer(initialState, { type: 'DEFAULT'})

      expect(nextState).toBe(initialState)
    });

    it('should handle RESET_BANKER_ID', () => {
      const action = moduleObj.resetBankerId()
      const expectedState = initialState.merge({
        bankerId: action.id,
        ids: [ action.id ]
      })

      const nextState = reducer(initialState, action)

      expect(nextState).toEqual(expectedState)
    })

    it('should handle SET_BANKER_ID', () => {
      const id = uuid()
      const action = moduleObj.setBankerId(id)
      const expectedState = initialState.merge({ bankerId: id })

      const nextState = reducer(initialState, action)

      expect(nextState).toEqual(expectedState)
    })
  })
})