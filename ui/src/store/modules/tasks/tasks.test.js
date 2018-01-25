import React from 'react'
import saga from 'redux-saga'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { normalize } from 'normalizr'
import { fromJS } from 'immutable'
import uuid from 'uuid'
import { handleResponse } from 'utils/fetch'
import reducer, * as moduleObj from './tasks'
import taskEntity from './tasks.schema'
import { getBankerId } from '../bankers/bankers'
import { setAccountTasks } from '../accounts/accounts'

describe('accounts', () => {
  describe('fetchTasksRequest()', () => {
    it('should create a FETCH_TASKS_REQUEST action', () => {
      const action = moduleObj.fetchTasksRequest()

      expect(action).toEqual({ type: moduleObj.FETCH_TASKS_REQUEST })
    })
  })

  describe('fetchTasksFailure()', () => {
    it('should create a FETCH_TASKS_FAILURE action', () => {
      const error = new Error('Dummy error')      

      const action = moduleObj.fetchTasksFailure(error)

      expect(action).toEqual({
        type: moduleObj.FETCH_TASKS_FAILURE,
        error
      })
    })
  })

  describe('fetchTasksSuccess()', () => {
    it('should create a FETCH_TASKS_SUCCESS action', () => {
      const ids = [ '123' ]
      const byId = {
        '123': {}
      }

      const action = moduleObj.fetchTasksSuccess(ids, byId)

      expect(action).toEqual({
        type: moduleObj.FETCH_TASKS_SUCCESS,
        ids,
        byId
      })
    })
  })

  describe('fetchTaskRequest()', () => {
    it('should create a FETCH_TASK_REQUEST action', () => {
      const action = moduleObj.fetchTaskRequest()

      expect(action).toEqual({ type: moduleObj.FETCH_TASK_REQUEST })
    })
  })

  describe('fetchTaskFailure()', () => {
    it('should create a FETCH_TASK_FAILURE action', () => {
      const error = new Error('Dummy error')      

      const action = moduleObj.fetchTaskFailure(error)

      expect(action).toEqual({
        type: moduleObj.FETCH_TASK_FAILURE,
        error
      })
    })
  })

  describe('fetchTaskSuccess()', () => {
    it('should create a FETCH_TASK_SUCCESS action', () => {
      const task = {
        id: '123456789',
        description: "blah blah",
        due_date: 0,
        snoozed_until: 0,
        status: 'OPEN',
        type: 'OVERDRAFT_APPROVAL'
      }

      const action = moduleObj.fetchTaskSuccess(task)

      expect(action).toEqual({
        type: moduleObj.FETCH_TASK_SUCCESS,
        task
      })
    })
  })

  describe('closeTaskRequest()', () => {
    it('should create a CLOSE_TASK_REQUEST action', () => {
      const accountId = 'randomaccountid'
      const taskId = '123'

      const action = moduleObj.closeTaskRequest(accountId, taskId)

      expect(action).toEqual({
        type: moduleObj.CLOSE_TASK_REQUEST,
        accountId,
        taskId
      })
    })
  })

  describe('closeTaskFailure()', () => {
    it('should create a CLOSE_TASK_FAILURE action', () => {
      const error = new Error('Dummy error')      

      const action = moduleObj.closeTaskFailure(error)

      expect(action).toEqual({
        type: moduleObj.CLOSE_TASK_FAILURE,
        error
      })
    })
  })

  describe('closeTaskSuccess()', () => {
    it('should create a CLOSE_TASK_SUCCESS action', () => {
      const action = moduleObj.closeTaskSuccess()

      expect(action).toEqual({ type: moduleObj.CLOSE_TASK_SUCCESS })
    })
  })

  describe('snoozeTaskRequest()', () => {
    it('should create a SNOOZE_TASK_REQUEST action', () => {
      const accountId = 'randomaccountid'
      const taskId = '123'

      const action = moduleObj.snoozeTaskRequest(accountId, taskId)

      expect(action).toEqual({
        type: moduleObj.SNOOZE_TASK_REQUEST,
        accountId,
        taskId
      })
    })
  })

  describe('snoozeTaskFailure()', () => {
    it('should create a SNOOZE_TASK_FAILURE action', () => {
      const error = new Error('Dummy error')      

      const action = moduleObj.snoozeTaskFailure(error)

      expect(action).toEqual({
        type: moduleObj.SNOOZE_TASK_FAILURE,
        error
      })
    })
  })

  describe('snoozeTaskSuccess()', () => {
    it('should create a SNOOZE_TASK_SUCCESS action', () => {
      const action = moduleObj.snoozeTaskSuccess()

      expect(action).toEqual({ type: moduleObj.SNOOZE_TASK_SUCCESS })
    })
  })

  describe('fetchTasks()', () => {  
    it('should dispatch a FETCH_TASKS_FAILURE action if the request fails', () => {
      const accountId = '123'
      const generator = moduleObj.fetchTasks({ accountId })
      expect(generator.next().value).toEqual(select(getBankerId))
      
      const bankerId = uuid()
      expect(generator.next(bankerId).value).toEqual(call(fetch, `${process.env.REACT_APP_API_BASE_URL}/bankers/${bankerId}/accounts/${accountId}/tasks`))

      const response = { ok: false }
      expect(generator.next(response).value).toEqual(call(handleResponse, response))

      const error = new Error()
      expect(generator.throw(error).value).toEqual(put(moduleObj.fetchTasksFailure(error)))
      
      expect(generator.next().done).toBe(true)
    })

    it('should dispatch a FETCH_TASKS_SUCCESS action if the request succeeds', () => {
      const accountId = '123'
      const generator = moduleObj.fetchTasks({ accountId })
      expect(generator.next().value).toEqual(select(getBankerId))
      
      const bankerId = uuid()
      expect(generator.next(bankerId).value).toEqual(call(fetch, `${process.env.REACT_APP_API_BASE_URL}/bankers/${bankerId}/accounts/${accountId}/tasks`))

      const response = { ok: true, json: () => {} }
      expect(generator.next(response).value).toEqual(call(handleResponse, response))

      const json = {
        tasks: [
          { id: 'task 1', description: 'hello' },
          { id: 'task 2', description: 'hello again' }
        ]
      }
      const normalized = normalize(json.tasks, [ taskEntity ])
      expect(generator.next(json).value).toEqual(put(moduleObj.fetchTasksSuccess(normalized.result, normalized.entities.tasks)))

      expect(generator.next().value).toEqual(put(setAccountTasks(accountId, normalized.result)))

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

    it('should handle FETCH_TASKS_REQUEST', () => {
      const action = {
        type: moduleObj.FETCH_TASKS_REQUEST,
        accountId: 'randomaccountid'
      }

      const nextState = reducer(initialState, action)

      expect(nextState).toEqual(fromJS({
        isFetching: true,
        error: {},
        ids: [ '123' ],
        byId: {
          '123': {},
        }
      }))
    })

    it('should handle FETCH_TASKS_FAILURE', () => {
      const action = {
        type: moduleObj.FETCH_TASKS_FAILURE,
        error: new Error('dummy error')
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

    it('should handle FETCH_TASKS_SUCCESS', () => {
      const ids = [ '456', '789' ]
      const byId = {
        '456': {},
        '789': {}
      }
      const action = {
        type: moduleObj.FETCH_TASKS_SUCCESS,
        ids,
        byId
      }

      const nextState = reducer(initialState, action)

      expect(nextState).toEqual(fromJS({
        isFetching: false,
        error: {},
        ids: [ '456', '789' ],
        byId: {
          '456': {},
          '789': {}
        }
      }))
    })

    it('should handle FETCH_TASK_REQUEST', () => {
      const action = {
        type: moduleObj.FETCH_TASK_REQUEST,
        accountId: 'randomaccountid',
        taskId: 'randomtaskid'
      }

      const nextState = reducer(initialState, action)

      expect(nextState).toEqual(initialState)
    })

    it('should handle FETCH_TASK_FAILURE', () => {
      const action = {
        type: moduleObj.FETCH_TASK_FAILURE,
        error: new Error('dummy error')
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

    it('should handle FETCH_TASK_SUCCESS', () => {
      const task = {
        id: '123',
        description: 'blah blah'
      }
      const action = {
        type: moduleObj.FETCH_TASK_SUCCESS,
        task
      }

      const nextState = reducer(initialState, action)

      expect(nextState).toEqual(fromJS({
        isFetching: false,
        error: {},
        ids: [ '123' ],
        byId: {
          '123': {
            id: '123',
            description: 'blah blah'
          }
        }
      }))
    })

    it('should handle CLOSE_TASK_REQUEST', () => {
      const action = {
        type: moduleObj.CLOSE_TASK_REQUEST,
        accountId: 'randomaccountid',
        taskId: 'randomtaskid'
      }

      const nextState = reducer(initialState, action)

      expect(nextState).toBe(initialState)
    })

    it('should handle CLOSE_TASK_FAILURE', () => {
      const action = {
        type: moduleObj.CLOSE_TASK_FAILURE,
        error: new Error('dummy error')
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

    it('should handle CLOSE_TASK_SUCCESS', () => {
      const nextState = reducer(initialState, { type: moduleObj.CLOSE_TASK_SUCCESS })

      expect(nextState).toBe(initialState)
    })

    it('should handle SNOOZE_TASK_REQUEST', () => {
      const action = {
        type: moduleObj.SNOOZE_TASK_REQUEST,
        accountId: 'randomaccountid',
        taskId: 'randomtaskid'
      }

      const nextState = reducer(initialState, action)

      expect(nextState).toBe(initialState)
    })

    it('should handle SNOOZE_TASK_FAILURE', () => {
      const action = {
        type: moduleObj.SNOOZE_TASK_FAILURE,
        error: new Error('dummy error')
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

    it('should handle SNOOZE_TASK_SUCCESS', () => {
      const nextState = reducer(initialState, { type: moduleObj.SNOOZE_TASK_SUCCESS })

      expect(nextState).toBe(initialState)
    })
  })
})