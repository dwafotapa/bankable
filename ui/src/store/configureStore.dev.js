import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import bankerId from 'store/modules/bankerId'
import accounts from 'store/modules/accounts'
import { watchFetchAccounts as rootSaga } from 'store/modules/accounts'

const rootReducer = combineReducers({
  bankerId,
  accounts
})

const sagaMiddleware = createSagaMiddleware()
const enhancer = composeWithDevTools(
  applyMiddleware(sagaMiddleware, createLogger())
)

export default function configureStore(preloadedState) {  
  const store = createStore(rootReducer, preloadedState, enhancer)
  sagaMiddleware.run(rootSaga)
  return store
}