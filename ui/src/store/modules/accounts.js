import 'whatwg-fetch'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { schema, normalize } from 'normalizr'
import { fromJS } from 'immutable'
import { handleErrors } from 'utils/fetch'

const FETCH_ACCOUNTS_REQUEST = 'FETCH_ACCOUNTS_REQUEST'
const FETCH_ACCOUNTS_FAILURE = 'FETCH_ACCOUNTS_FAILURE'
const FETCH_ACCOUNTS_SUCCESS = 'FETCH_ACCOUNTS_SUCCESS'
const SET_ACCOUNT_TASKS = 'SET_ACCOUNT_TASKS'

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

export const setAccountTasks = (accountId, taskIds) => ({
  type: SET_ACCOUNT_TASKS,
  accountId,
  taskIds
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

const initialState = fromJS({
  isFetching: false,
  hasFailed: false,
  ids: [],
  byId: {}
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCOUNTS_REQUEST:
      return state.merge({
        isFetching: true,
        hasFailed: false
      })
    case FETCH_ACCOUNTS_FAILURE:
      return state.merge({
        isFetching: false,
        hasFailed: true
      })
    case FETCH_ACCOUNTS_SUCCESS:
      return state.merge({
        isFetching: false,
        ids: action.ids,
        byId: action.byId
      })
    case SET_ACCOUNT_TASKS:
      return state.merge({
        byId: state.get('byId').setIn([action.accountId, 'taskIds'], action.taskIds)
      })
    default:
      return state
  }
}

export default reducer