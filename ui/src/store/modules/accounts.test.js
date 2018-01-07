import React from 'react'
import configureMockStore from 'redux-mock-store'
import saga from 'redux-saga'
import reducer, * as moduleObj from './accounts'

const middlewares = [ saga ]
const mockStore = configureMockStore(middlewares)

describe('accounts', () => {
  describe('fetchAccountsRequest()', () => {
    it('should create a FETCH_ACCOUNTS_REQUEST action', () => {
      const expectedAction = { type: moduleObj.FETCH_ACCOUNTS_REQUEST }

      const action = moduleObj.fetchAccountsRequest()

      expect(action).toEqual(expectedAction)
    })
  })

  describe('fetchAccountsFailure()', () => {
    it('should create a FETCH_ACCOUNTS_FAILURE action', () => {
      const error = new Error('Dummy error')
      const expectedAction = {
        type: moduleObj.FETCH_ACCOUNTS_FAILURE,
        error
      }

      const action = moduleObj.fetchAccountsFailure(error)

      expect(action).toEqual(expectedAction)
    })
  })

  describe('fetchAccountsSuccess()', () => {  
    it('should create a FETCH_ACCOUNTS_SUCCESS action', () => {
      const ids = []
      const byId = {}
      const expectedAction = {
        type: moduleObj.FETCH_ACCOUNTS_SUCCESS,
        ids,
        byId
      }

      const action = moduleObj.fetchAccountsSuccess(ids, byId)

      expect(action).toEqual(expectedAction)
    })
  })

  describe('setAccountTasks()', () => {  
    it('should create a SET_ACCOUNT_TASKS action', () => {
      const accountId = 'randomaccountId'
      const taskIds = [ 'ramdomtaskId', 'anotherone' ]
      const expectedAction = {
        type: moduleObj.SET_ACCOUNT_TASKS,
        accountId,
        taskIds
      }

      const action = moduleObj.setAccountTasks(accountId, taskIds)

      expect(action).toEqual(expectedAction)
    })
  })

  describe('resetAccountRequest()', () => {  
    it('should create a RESET_ACCOUNT_REQUEST action', () => {
      const expectedAction = { type: moduleObj.RESET_ACCOUNTS_REQUEST }

      const action = moduleObj.resetAccountsRequest()

      expect(action).toEqual(expectedAction)
    })
  })

  // describe('fetchAccounts()', () => {  
  //   it('should dispatch a FETCH_ACCOUNTS_REQUEST action then a FETCH_ACCOUNTS_FAILURE action if the request fails', () => {
  //     global.fetch = jest.fn().mockImplementation(() => {
  //       return new Promise((resolve, reject) => {
  //         reject({ ok: false })
  //       })
  //     })
  //     const store = mockStore()
  //     const expectedActions = [
  //       { type: moduleObj.FETCH_ACCOUNTS_REQUEST },
  //       { type: moduleObj.FETCH_ACCOUNTS_FAILURE, error: { ok: false } }
  //     ]
      
  //     return store.dispatch(moduleObj.fetchAccounts()).then(() => {
  //       expect(store.getActions()).toEqual(expectedActions)
  //     })
  //   })
  // })

  // describe('reducer', () => {
  // })
})