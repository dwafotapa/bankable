import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootReducer, { rootSaga } from 'store/modules'

const sagaMiddleware = createSagaMiddleware()
const enhancer = composeWithDevTools(
  applyMiddleware(sagaMiddleware, createLogger())
)

export default function configureStore(preloadedState) {
  const store = createStore(rootReducer, preloadedState, enhancer)
  sagaMiddleware.run(rootSaga)
  return store
}