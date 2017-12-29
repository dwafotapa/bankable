import uuid from 'uuid'
import reducer, * as moduleObj from './bankerId'

describe('bankerId module', () => {
  describe('actions', () => {
    describe('setBankerId()', () => {
      it('should create a SET_BANKER_ID action', () => {
        const expectedAction = { type: moduleObj.SET_BANKER_ID }
    
        const action = moduleObj.setBankerId()
    
        expect(action.type).toEqual(expectedAction.type)
      })
    })
  })

  describe('reducer', () => {
    const initialState = uuid()

    it('should return the initial state by default', () => {
      const nextState = reducer(initialState, { type: 'DEFAULT'})

      expect(nextState).toBe(initialState)
    });

    it('should handle SET_BANKER_ID', () => {
      const action = {
        type: moduleObj.SET_BANKER_ID,
        id: uuid()
      }

      const nextState = reducer(initialState, action)

      expect(nextState).toEqual(action.id)
    })
  })
})