import { fromJS } from 'immutable'
import uuid from 'uuid'
import reducer, * as moduleObj from './bankers'

describe('bankers', () => {
  describe('resetBankerId()', () => {
    it('should create a RESET_BANKER_ID action', () => {
      const action = moduleObj.resetBankerId()
  
      expect(action.type).toEqual(moduleObj.RESET_BANKER_ID)
    })
  })

  describe('setBankerId()', () => {
    it('should create a SET_BANKER_ID action', () => {
      const id = uuid()

      const action = moduleObj.setBankerId(id)
  
      expect(action).toEqual({
        type: moduleObj.SET_BANKER_ID,
        id
      })
    })
  })

  describe('reducer()', () => {
    const initialBankerId = uuid()
    const initialState = fromJS({
      bankerId: initialBankerId,
      ids: [ initialBankerId ]
    })

    it('should return the initial state by default', () => {
      const nextState = reducer(initialState, { type: 'DEFAULT' })

      expect(nextState).toBe(initialState)
    });

    it('should handle RESET_BANKER_ID', () => {
      let action = moduleObj.resetBankerId()

      let nextState = reducer(initialState, action)

      expect(nextState).toEqual(fromJS({
        bankerId: action.id,
        ids: [ action.id, initialBankerId ]
      }))
    })

    it('should handle SET_BANKER_ID', () => {
      const id = uuid()
      const action = moduleObj.setBankerId(id)

      const nextState = reducer(initialState, action)

      expect(nextState.get('bankerId')).toEqual(id)
    })
  })
})