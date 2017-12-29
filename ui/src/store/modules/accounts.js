import 'whatwg-fetch'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { handleErrors } from 'utils/fetch'

export const FETCH_ACCOUNTS_REQUEST = 'FETCH_ACCOUNTS_REQUEST'
export const FETCH_ACCOUNTS_FAILURE = 'FETCH_ACCOUNTS_FAILURE'
export const FETCH_ACCOUNTS_SUCCESS = 'FETCH_ACCOUNTS_SUCCESS'

export const fetchAccountsRequest = () => ({
  type: FETCH_ACCOUNTS_REQUEST
})

export const fetchAccountsFailure = (error) => ({
  type: FETCH_ACCOUNTS_FAILURE,
  error
})

export const fetchAccountsSuccess = (accounts) => ({
  type: FETCH_ACCOUNTS_SUCCESS,
  accounts
})

export function* fetchAccounts() {
  try {
    const { bankerId } = yield select()
    const response = yield call(fetch, `${process.env.REACT_APP_API_BASE_URL}/bankers/${bankerId}/accounts`)
    const json = yield call(handleErrors, response)
    console.log(json)
    yield put(fetchAccountsSuccess(json.accounts))
  } catch (error) {
    yield put(fetchAccountsFailure(error))
  }
}

export function* watchFetchAccounts() {
  yield takeEvery(FETCH_ACCOUNTS_REQUEST, fetchAccounts)
}

const initialState = {
  isFetching: false,
  hasFetchFailed: false,
  items: []
}

export default function accounts(state = initialState, action) {
  switch (action.type) {
    case FETCH_ACCOUNTS_REQUEST:
      return {
        ...state,
        isFetching: true,
        hasFetchFailed: false
      }
    case FETCH_ACCOUNTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        hasFetchFailed: true
      }
    case FETCH_ACCOUNTS_SUCCESS:
      return {
        ...state,
        isFetching: true,
        items: action.accounts        
      }
    default:
      return state
  }
}