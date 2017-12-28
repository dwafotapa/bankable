import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
// import rootSaga from 'components/App/sagas'
import bankerId from 'store/modules/bankerId'

const rootReducer = combineReducers({ bankerId })

const sagaMiddleware = createSagaMiddleware()
const enhancer = composeWithDevTools(
  applyMiddleware(sagaMiddleware, createLogger())
)
// sagaMiddleware.run(rootSaga)

export default function configureStore(preloadedState) {  
  return createStore(rootReducer, preloadedState, enhancer)
}