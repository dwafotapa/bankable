import { combineReducers } from 'redux'
import { all, fork } from 'redux-saga/effects'
import bankers, { RESET_BANKER_ID, SET_BANKER_ID } from './bankers/bankers'
import accounts, { watchFetchAccountsRequest, watchResetAccountsRequest } from './accounts/accounts'
import tasks, { watchFetchTasksRequest, watchFetchTaskRequest, watchCloseTaskRequest, watchSnoozeTaskRequest } from './tasks/tasks'

export function* rootSaga() {
  yield all([
    fork(watchFetchAccountsRequest),
    fork(watchResetAccountsRequest),
    fork(watchFetchTasksRequest),
    fork(watchFetchTaskRequest),
    fork(watchCloseTaskRequest),
    fork(watchSnoozeTaskRequest)
  ])
}

const appReducer = combineReducers({
  bankers,
  accounts,
  tasks
})

const rootReducer = (state, action) => {
  if (action.type === RESET_BANKER_ID || action.type === SET_BANKER_ID) {
    state.accounts = undefined
    state.tasks = undefined
  }
  return appReducer(state, action)
}

export default rootReducer