import { combineReducers } from 'redux'
import { all, fork } from 'redux-saga/effects'
import bankerId from './bankerId'
import accounts, { watchFetchAccounts } from './accounts'
import tasks, { watchFetchTasks } from './tasks'

export function* rootSaga() {
  yield all([
    fork(watchFetchAccounts),
    fork(watchFetchTasks)
  ])
}

const rootReducer = combineReducers({
  bankerId,
  accounts,
  tasks
})

export default rootReducer