import React from 'react'
import saga from 'redux-saga'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { normalize } from 'normalizr'
import { fromJS } from 'immutable'
import uuid from 'uuid'
import { handleResponse } from 'utils/fetch'
import reducer, * as moduleObj from './accounts'
import accountEntity from './accounts.schema'
import { getBankerId } from '../bankers/bankers'

describe('accounts', () => {
  describe('fetchAccountsRequest()', () => {
    it('should create a FETCH_ACCOUNTS_REQUEST action', () => {
      const action = moduleObj.fetchAccountsRequest()

      expect(action).toEqual({ type: moduleObj.FETCH_ACCOUNTS_REQUEST })
    })
  })

  describe('fetchAccountsFailure()', () => {
    it('should create a FETCH_ACCOUNTS_FAILURE action', () => {
      const error = new Error('Dummy error')

      const action = moduleObj.fetchAccountsFailure(error)

      expect(action).toEqual({
        type: moduleObj.FETCH_ACCOUNTS_FAILURE,
        error
      })
    })
  })

  describe('fetchAccountsSuccess()', () => {  
    it('should create a FETCH_ACCOUNTS_SUCCESS action', () => {
      const ids = [ '123' ]
      const byId = {
        '123': {}
      }

      const action = moduleObj.fetchAccountsSuccess(ids, byId)

      expect(action).toEqual({
        type: moduleObj.FETCH_ACCOUNTS_SUCCESS,
        ids,
        byId
      })
    })
  })

  describe('setAccountTasks()', () => {  
    it('should create a SET_ACCOUNT_TASKS action', () => {
      const accountId = 'randomaccountId'
      const taskIds = [ 'ramdomtaskId', 'anotherone' ]

      const action = moduleObj.setAccountTasks(accountId, taskIds)

      expect(action).toEqual({
        type: moduleObj.SET_ACCOUNT_TASKS,
        accountId,
        taskIds
      })
    })
  })

  describe('resetAccountRequest()', () => {  
    it('should create a RESET_ACCOUNT_REQUEST action', () => {
      const action = moduleObj.resetAccountsRequest()

      expect(action).toEqual({ type: moduleObj.RESET_ACCOUNTS_REQUEST })
    })
  })

  describe('resetAccountFailure()', () => {  
    it('should create a RESET_ACCOUNT_FAILURE action', () => {
      const error = new Error('Dummy error')

      const action = moduleObj.resetAccountsFailure(error)

      expect(action).toEqual({
        type: moduleObj.RESET_ACCOUNTS_FAILURE,
        error
      })
    })
  })

  describe('resetAccountSuccess()', () => {  
    it('should create a RESET_ACCOUNT_SUCCESS action', () => {
      const action = moduleObj.resetAccountsSuccess()

      expect(action).toEqual({ type: moduleObj.RESET_ACCOUNTS_SUCCESS })
    })
  })

  describe('fetchAccounts()', () => {  
    it('should dispatch a FETCH_ACCOUNTS_FAILURE action if the request fails', () => {
      const generator = moduleObj.fetchAccounts()
      expect(generator.next().value).toEqual(select(getBankerId))
      
      const bankerId = uuid()
      expect(generator.next(bankerId).value).toEqual(call(fetch, `${process.env.REACT_APP_API_BASE_URL}/bankers/${bankerId}/accounts`))

      const response = { ok: false }
      expect(generator.next(response).value).toEqual(call(handleResponse, response))

      const error = new Error()
      expect(generator.throw(error).value).toEqual(put(moduleObj.fetchAccountsFailure(error)))
      
      expect(generator.next().done).toBe(true)
    })

    it('should dispatch a FETCH_ACCOUNTS_SUCCESS action if the request succeeds', () => {
      const generator = moduleObj.fetchAccounts()
      expect(generator.next().value).toEqual(select(getBankerId))
      
      const bankerId = uuid()
      expect(generator.next(bankerId).value).toEqual(call(fetch, `${process.env.REACT_APP_API_BASE_URL}/bankers/${bankerId}/accounts`))

      const response = { ok: true, json: () => {} }
      expect(generator.next(response).value).toEqual(call(handleResponse, response))

      const json = {
        accounts: [
          { company_name: 'The Random Company Name', number: 'randomaccountid' },
          { company_name: 'Another Random Company Name', number: 'anotheraccountid' }
        ]
      }
      const normalized = normalize(json.accounts, [ accountEntity ])
      expect(generator.next(json).value).toEqual(put(moduleObj.fetchAccountsSuccess(normalized.result, normalized.entities.accounts)))
      
      expect(generator.next().done).toBe(true)
    })
  })

  describe('reducer()', () => {
    const initialState = fromJS({
      isFetching: false,
      error: {},
      ids: [ '123' ],
      byId: {
        '123': {},
      }
    })

    it('should return the initial state by default', () => {
      const nextState = reducer(initialState, { type: 'DEFAULT' })

      expect(nextState).toBe(initialState)
    })

    it('should handle FETCH_ACCOUNTS_REQUEST', () => {
      const nextState = reducer(initialState, { type: moduleObj.FETCH_ACCOUNTS_REQUEST })

      expect(nextState).toEqual(fromJS({
        isFetching: true,
        error: {},
        ids: [ '123' ],
        byId: {
          '123': {},
        }
      }))
    })

    it('should handle FETCH_ACCOUNTS_FAILURE', () => {
      const action = {
        type: moduleObj.FETCH_ACCOUNTS_FAILURE,
        error: new Error('Dummy error')
      }

      const nextState = reducer(initialState, action)

      expect(nextState).toEqual(fromJS({
        isFetching: false,
        error: action.error,
        ids: [ '123' ],
        byId: {
          '123': {},
        }
      }))
    })

    it('should handle FETCH_ACCOUNTS_SUCCESS', () => {
      const action = {
        type: moduleObj.FETCH_ACCOUNTS_SUCCESS,
        ids: [ '123', '456' ],
        byId: {
          '123': {},
          '456': {}
        }
      }

      const nextState = reducer(initialState, action)

      expect(nextState).toEqual(fromJS({
        isFetching: false,
        error: {},
        ids: [ '123', '456' ],
        byId: {
          '123': {},
          '456': {}
        }
      }))
    })

    it('should handle SET_ACCOUNT_TASKS', () => {
      const action = {
        type: moduleObj.SET_ACCOUNT_TASKS,
        accountId: '123',
        taskIds: [ 'randomtaskid', 'anotherone' ],
      }

      const nextState = reducer(initialState, action)

      expect(nextState).toEqual(fromJS({
        isFetching: false,
        error: {},
        ids: [ '123' ],
        byId: {
          '123': {
            taskIds: [ 'randomtaskid', 'anotherone' ]
          }
        }
      }))
    })

    it('should handle RESET_ACCOUNTS_REQUEST', () => {
      const nextState = reducer(initialState, { type: moduleObj.RESET_ACCOUNTS_REQUEST })

      expect(nextState).toEqual(fromJS({
        isFetching: true,
        error: {},
        ids: [ '123' ],
        byId: {
          '123': {}
        }
      }))
    })

    it('should handle RESET_ACCOUNTS_FAILURE', () => {
      const action = {
        type: moduleObj.RESET_ACCOUNTS_FAILURE,
        error: new Error('Dummy error')
      }

      const nextState = reducer(initialState, action)

      expect(nextState).toEqual(fromJS({
        isFetching: false,
        error: action.error,
        ids: [ '123' ],
        byId: {
          '123': {}
        }
      }))
    })

    it('should handle RESET_ACCOUNTS_SUCCESS', () => {
      const nextState = reducer(initialState, { type: moduleObj.RESET_ACCOUNTS_SUCCESS })
      
      expect(nextState).toBe(initialState)
    })
  })
})