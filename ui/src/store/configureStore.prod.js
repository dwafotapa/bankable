import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import bankerId from 'store/modules/bankerId'
import accounts from 'store/modules/accounts'
import { watchFetchAccounts as rootSaga } from 'store/modules/accounts'

const rootReducer = combineReducers({
  bankerId,
  accounts
})

const sagaMiddleware = createSagaMiddleware()
const enhancer = applyMiddleware(sagaMiddleware)

export default function configureStore(preloadedState) {
  const store = createStore(rootReducer, preloadedState, enhancer)
  sagaMiddleware.run(rootSaga)  
  return store
}