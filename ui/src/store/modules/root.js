import { combineReducers } from 'redux'
import { all, fork } from 'redux-saga/effects'
import bankerId from './bankerId'
import accounts, { watchFetchAccountsRequest } from './accounts'
import tasks, { watchFetchTasksRequest, watchFetchTaskRequest, watchCloseTaskRequest } from './tasks'

export function* rootSaga() {
  yield all([
    fork(watchFetchAccountsRequest),
    fork(watchFetchTasksRequest),
    fork(watchFetchTaskRequest),
    fork(watchCloseTaskRequest)
  ])
}

const rootReducer = combineReducers({
  bankerId,
  accounts,
  tasks
})

export default rootReducer