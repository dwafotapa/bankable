import React from 'react'
import configureMockStore from 'redux-mock-store'
import saga from 'redux-saga'
import reducer, * as moduleObj from './accounts'

const middlewares = [ saga ]
const mockStore = configureMockStore(middlewares)

describe('accounts module', () => {
  describe('actions', () => {
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
        const expectedAction = { type: moduleObj.FETCH_ACCOUNTS_FAILURE, error }

        const action = moduleObj.fetchAccountsFailure(error)

        expect(action).toEqual(expectedAction)
      })
    })

    describe('fetchAccountsSuccess()', () => {  
      it('should create a FETCH_ACCOUNTS_SUCCESS action', () => {
        const accounts = []
        const expectedAction = { type: moduleObj.FETCH_ACCOUNTS_SUCCESS, accounts }

        const action = moduleObj.fetchAccountsSuccess(accounts)

        expect(action).toEqual(expectedAction)
      })
    })

    describe('fetchAccounts()', () => {  
      it('should dispatch a FETCH_ACCOUNTS_REQUEST action then a FETCH_ACCOUNTS_FAILURE action if the request fails', () => {
        global.fetch = jest.fn().mockImplementation(() => {
          return new Promise((resolve, reject) => {
            reject({ ok: false })
          })
        })
        const store = mockStore()
        const expectedActions = [
          { type: moduleObj.FETCH_ACCOUNTS_REQUEST },
          { type: moduleObj.FETCH_ACCOUNTS_FAILURE, error: { ok: false } }
        ]
        
        return store.dispatch(moduleObj.fetchAccounts()).then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
      })
    })
  })

  describe('reducer', () => {
  })
})