import 'whatwg-fetch'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { schema, normalize } from 'normalizr'
import { fromJS } from 'immutable'
import { handleErrors } from 'utils/fetch'
import { setAccountTasks } from './accounts'

const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST'
const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE'
const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS'

export const fetchTasksRequest = (accountId) => ({
  type: FETCH_TASKS_REQUEST,
  accountId
})

const fetchTasksFailure = (error) => ({
  type: FETCH_TASKS_FAILURE,
  error
})

const fetchTasksSuccess = (ids, byId) => ({
  type: FETCH_TASKS_SUCCESS,
  ids,
  byId
})

const taskEntity = new schema.Entity(
  'tasks',
  { tasks: {} },
  {
    processStrategy: (entity) => ({
      id: entity.id,
      description: entity.description,
      dueDate: entity.due_date,
      snoozedUntil: entity.snoozed_until,
      status: entity.status,
      type: entity.type
    })
  }
)

export function* fetchTasks({ accountId }) {
  try {
    const { bankerId } = yield select()
    const response = yield call(fetch, `${process.env.REACT_APP_API_BASE_URL}/bankers/${bankerId}/accounts/${accountId}/tasks`)
    const json = yield call(handleErrors, response)
    const normalized = normalize(json.tasks, new schema.Array(taskEntity))
    yield put(fetchTasksSuccess(normalized.result, normalized.entities.tasks))
    yield put(setAccountTasks(accountId, normalized.result))
  } catch (error) {
    yield put(fetchTasksFailure(error))
  }
}

export function* watchFetchTasks() {
  yield takeEvery(FETCH_TASKS_REQUEST, fetchTasks)
}

const initialState = fromJS({
  isFetching: false,
  hasFailed: false,
  ids: [],
  byId: {}
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
      return state.merge({
        isFetching: true,
        hasFailed: false
      })
    case FETCH_TASKS_FAILURE:
      return state.merge({
        isFetching: false,
        hasFailed: true
      })
    case FETCH_TASKS_SUCCESS:
      return state.merge({
        isFetching: false,
        ids: action.ids,
        byId: action.byId
      })
    default:
      return state
  }
}

export default reducer