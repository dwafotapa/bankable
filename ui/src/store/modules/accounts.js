import 'whatwg-fetch'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { schema, normalize } from 'normalizr'
import { List, Map, fromJS } from 'immutable'
import { handleErrors } from 'utils/fetch'

const FETCH_ACCOUNTS_REQUEST = 'FETCH_ACCOUNTS_REQUEST'
const FETCH_ACCOUNTS_FAILURE = 'FETCH_ACCOUNTS_FAILURE'
const FETCH_ACCOUNTS_SUCCESS = 'FETCH_ACCOUNTS_SUCCESS'

export const fetchAccountsRequest = () => ({
  type: FETCH_ACCOUNTS_REQUEST
})

const fetchAccountsFailure = (error) => ({
  type: FETCH_ACCOUNTS_FAILURE,
  error
})

const fetchAccountsSuccess = (ids, byId) => ({
  type: FETCH_ACCOUNTS_SUCCESS,
  ids,
  byId
})

const accountEntity = new schema.Entity(
  'accounts',
  { accounts: {} },
  {
    idAttribute: 'number',
    processStrategy: (entity) => ({
      id: entity.number,
      companyName: entity.company_name
    })
  }
)

export function* fetchAccounts() {
  try {
    const { bankerId } = yield select()
    const response = yield call(fetch, `${process.env.REACT_APP_API_BASE_URL}/bankers/${bankerId}/accounts`)
    const json = yield call(handleErrors, response)
    const normalized = normalize(json.accounts, new schema.Array(accountEntity))
    yield put(fetchAccountsSuccess(normalized.result, normalized.entities.accounts))
  } catch (error) {
    yield put(fetchAccountsFailure(error))
  }
}

export function* watchFetchAccounts() {
  yield takeEvery(FETCH_ACCOUNTS_REQUEST, fetchAccounts)
}

const initialState = {
  isFetching: false,
  hasFailed: false,
  ids: List(),
  byId: Map()
}

export default function accounts(state = initialState, action) {
  switch (action.type) {
    case FETCH_ACCOUNTS_REQUEST:
      return {
        ...state,
        isFetching: true,
        hasFailed: false
      }
    case FETCH_ACCOUNTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        hasFailed: true
      }
    case FETCH_ACCOUNTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: List(action.ids),
        byId: fromJS(action.byId)
      }
    default:
      return state
  }
}