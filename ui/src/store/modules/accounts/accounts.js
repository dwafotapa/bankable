import 'whatwg-fetch'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { normalize } from 'normalizr'
import { fromJS, List } from 'immutable'
import { handleResponse } from 'utils/fetch'
import { getBankerId } from '../bankers/bankers'
import accountEntity from './accounts.schema'

export const FETCH_ACCOUNTS_REQUEST = 'FETCH_ACCOUNTS_REQUEST'
export const FETCH_ACCOUNTS_FAILURE = 'FETCH_ACCOUNTS_FAILURE'
export const FETCH_ACCOUNTS_SUCCESS = 'FETCH_ACCOUNTS_SUCCESS'
export const SET_ACCOUNT_TASKS = 'SET_ACCOUNT_TASKS'
export const RESET_ACCOUNTS_REQUEST = 'RESET_ACCOUNTS_REQUEST'
export const RESET_ACCOUNTS_FAILURE = 'RESET_ACCOUNTS_FAILURE'
export const RESET_ACCOUNTS_SUCCESS = 'RESET_ACCOUNTS_SUCCESS'

export const fetchAccountsRequest = () => ({
  type: FETCH_ACCOUNTS_REQUEST
})

export const fetchAccountsFailure = (error) => ({
  type: FETCH_ACCOUNTS_FAILURE,
  error
})

export const fetchAccountsSuccess = (ids, byId) => ({
  type: FETCH_ACCOUNTS_SUCCESS,
  ids,
  byId
})

export const setAccountTasks = (accountId, taskIds) => ({
  type: SET_ACCOUNT_TASKS,
  accountId,
  taskIds
})

export const resetAccountsRequest = () => ({
  type: RESET_ACCOUNTS_REQUEST
})

export const resetAccountsFailure = (error) => ({
  type: RESET_ACCOUNTS_FAILURE,
  error
})

export const resetAccountsSuccess = () => ({
  type: RESET_ACCOUNTS_SUCCESS
})



export function* fetchAccounts() {
  try {
    const bankerId = yield select(getBankerId)
    const response = yield call(fetch, `${process.env.REACT_APP_API_BASE_URL}/bankers/${bankerId}/accounts`)
    const json = yield call(handleResponse, response)
    const normalized = normalize(json.accounts, [ accountEntity ])
    yield put(fetchAccountsSuccess(normalized.result, normalized.entities.accounts))
  } catch (error) {
    yield put(fetchAccountsFailure(error))
  }
}

export function* watchFetchAccountsRequest() {
  yield takeEvery(FETCH_ACCOUNTS_REQUEST, fetchAccounts)
}

export function* resetAccounts() {
  try {
    const bankerId = yield select(getBankerId)
    const response = yield call(fetch,
      `${process.env.REACT_APP_API_BASE_URL}/bankers/${bankerId}/reset`,
      { method: 'POST' }
    )
    yield call(handleResponse, response, false)
    yield put(resetAccountsSuccess())
    yield put(fetchAccountsRequest())
  } catch (error) {
    yield put(resetAccountsFailure(error))
  }
}

export function* watchResetAccountsRequest() {
  yield takeEvery(RESET_ACCOUNTS_REQUEST, resetAccounts)
}

const initialState = fromJS({
  isFetching: true,
  error: {},
  ids: [],
  byId: {}
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCOUNTS_REQUEST:
      return state.merge({
        isFetching: true,
        error: {}
      })
    case FETCH_ACCOUNTS_FAILURE:
      return state.merge({
        isFetching: false,
        error: action.error
      })
    case FETCH_ACCOUNTS_SUCCESS:
      return state.merge({
        isFetching: false,
        ids: action.ids,
        byId: action.byId
      })
    case SET_ACCOUNT_TASKS:
      return state.merge({
        byId: state.get('byId').setIn([action.accountId, 'taskIds'], List(action.taskIds))
      })
    case RESET_ACCOUNTS_REQUEST:
      return state.merge({
        isFetching: true,
        error: {}
      })
    case RESET_ACCOUNTS_FAILURE:
      return state.merge({
        isFetching: false,
        error: action.error
      })
    case RESET_ACCOUNTS_SUCCESS:
      return state
    default:
      return state
  }
}

export default reducer