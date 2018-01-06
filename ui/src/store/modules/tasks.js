import 'whatwg-fetch'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { schema, normalize } from 'normalizr'
import { fromJS } from 'immutable'
import { handleResponse } from 'utils/fetch'
import { getBankerId } from './bankers'
import { setAccountTasks } from './accounts'

export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST'
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE'
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS'
export const FETCH_TASK_REQUEST = 'FETCH_TASK_REQUEST'
export const FETCH_TASK_FAILURE = 'FETCH_TASK_FAILURE'
export const FETCH_TASK_SUCCESS = 'FETCH_TASK_SUCCESS'
export const CLOSE_TASK_REQUEST = 'CLOSE_TASK_REQUEST'
export const CLOSE_TASK_FAILURE = 'CLOSE_TASK_FAILURE'
export const CLOSE_TASK_SUCCESS = 'CLOSE_TASK_SUCCESS'
export const SNOOZE_TASK_REQUEST = 'SNOOZE_TASK_REQUEST'
export const SNOOZE_TASK_FAILURE = 'SNOOZE_TASK_FAILURE'
export const SNOOZE_TASK_SUCCESS = 'SNOOZE_TASK_SUCCESS'

export const fetchTasksRequest = (accountId) => ({
  type: FETCH_TASKS_REQUEST,
  accountId
})

export const fetchTasksFailure = (error) => ({
  type: FETCH_TASKS_FAILURE,
  error
})

export const fetchTasksSuccess = (ids, byId) => ({
  type: FETCH_TASKS_SUCCESS,
  ids,
  byId
})

export const fetchTaskRequest = (accountId, taskId) => ({
  type: FETCH_TASK_REQUEST,
  accountId,
  taskId
})

export const fetchTaskFailure = (error) => ({
  type: FETCH_TASK_FAILURE,
  error
})

export const fetchTaskSuccess = (task) => ({
  type: FETCH_TASK_SUCCESS,
  task
})

export const closeTaskRequest = (accountId, taskId) => ({
  type: CLOSE_TASK_REQUEST,
  accountId,
  taskId
})

export const closeTaskFailure = (error) => ({
  type: CLOSE_TASK_FAILURE,
  error
})

export const closeTaskSuccess = () => ({
  type: CLOSE_TASK_SUCCESS
})

export const snoozeTaskRequest = (accountId, taskId) => ({
  type: SNOOZE_TASK_REQUEST,
  accountId,
  taskId
})

export const snoozeTaskFailure = (error) => ({
  type: SNOOZE_TASK_FAILURE,
  error
})

export const snoozeTaskSuccess = () => ({
  type: SNOOZE_TASK_SUCCESS
})

const taskEntity = new schema.Entity(
  'tasks',
  {},
  {
    processStrategy: (entity) => ({
      id: entity.id,
      description: entity.description,
      dueDate: entity.due_date,
      snoozedUntil: entity.snoozed_until || null,
      status: entity.status,
      type: entity.type
    })
  }
)

export function* fetchTasks({ accountId }) {
  try {
    const bankerId = yield select(getBankerId)
    const response = yield call(fetch, `${process.env.REACT_APP_API_BASE_URL}/bankers/${bankerId}/accounts/${accountId}/tasks`)
    const json = yield call(handleResponse, response)
    const normalized = normalize(json.tasks, new schema.Array(taskEntity))
    yield put(fetchTasksSuccess(normalized.result, normalized.entities.tasks))
    yield put(setAccountTasks(accountId, normalized.result))
  } catch (error) {
    yield put(fetchTasksFailure(error))
  }
}

export function* watchFetchTasksRequest() {
  yield takeEvery(FETCH_TASKS_REQUEST, fetchTasks)
}

export function* fetchTask({ accountId, taskId }) {
  try {
    const bankerId = yield select(getBankerId)
    const response = yield call(fetch, `${process.env.REACT_APP_API_BASE_URL}/bankers/${bankerId}/accounts/${accountId}/tasks/${taskId}`)
    const task = yield call(handleResponse, response)
    const normalized = normalize(task, taskEntity)
    yield put(fetchTaskSuccess(normalized.entities.tasks[normalized.result]))
  } catch (error) {
    yield put(fetchTaskFailure(error))
  }
}

export function* watchFetchTaskRequest() {
  yield takeEvery(FETCH_TASK_REQUEST, fetchTask)
}

export function* closeTask({ accountId, taskId }) {
  try {
    const bankerId = yield select(getBankerId)
    const response = yield call(fetch,
      `${process.env.REACT_APP_API_BASE_URL}/bankers/${bankerId}/accounts/${accountId}/tasks/${taskId}/close`,
      { method: 'POST' }
    )
    yield call(handleResponse, response, false)
    yield put(closeTaskSuccess())
    yield put(fetchTaskRequest(accountId, taskId))
  } catch (error) {
    yield put(closeTaskFailure(error))
  }
}

export function* watchCloseTaskRequest() {
  yield takeEvery(CLOSE_TASK_REQUEST, closeTask)
}

export function* snoozeTask({ accountId, taskId }) {
  try {
    const bankerId = yield select(getBankerId)
    const response = yield call(fetch,
      `${process.env.REACT_APP_API_BASE_URL}/bankers/${bankerId}/accounts/${accountId}/tasks/${taskId}/snooze`,
      {
        method: 'POST',
        body: JSON.stringify({ snoozedUntil: (Date.now() + 7 * 24 * 3600 * 1000).toString() }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    yield call(handleResponse, response, false)
    yield put(snoozeTaskSuccess())
    yield put(fetchTaskRequest(accountId, taskId))
  } catch (error) {
    yield put(snoozeTaskFailure(error))
  }
}

export function* watchSnoozeTaskRequest() {
  yield takeEvery(SNOOZE_TASK_REQUEST, snoozeTask)
}

const initialState = fromJS({
  isFetching: true,
  error: {},
  ids: [],
  byId: {}
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
      return state.merge({
        isFetching: true,
        error: {}
      })
    case FETCH_TASKS_FAILURE:
      return state.merge({
        isFetching: false,
        error: action.error
      })
    case FETCH_TASKS_SUCCESS:
      return state.merge({
        isFetching: false,
        ids: action.ids,
        byId: action.byId
      })
    case FETCH_TASK_REQUEST:
      return state.merge({ error: {} })
    case FETCH_TASK_FAILURE:
      return state.merge({ error: action.error })
    case FETCH_TASK_SUCCESS:
      return state.merge({ byId: state.get('byId').set(action.task.id, action.task) })
    case CLOSE_TASK_REQUEST:
      return state.merge({ error: {} })
    case CLOSE_TASK_FAILURE:
      return state.merge({ error: action.error })
    case CLOSE_TASK_SUCCESS:
      return state
    case SNOOZE_TASK_REQUEST:
      return state.merge({ error: {} })
    case SNOOZE_TASK_FAILURE:
      return state.merge({ error: action.error })
    case SNOOZE_TASK_SUCCESS:
      return state
    default:
      return state
  }
}

export default reducer