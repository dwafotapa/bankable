import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer, { rootSaga } from 'store/modules'

const sagaMiddleware = createSagaMiddleware()
const enhancer = applyMiddleware(sagaMiddleware)

export default function configureStore(preloadedState) {
  const store = createStore(rootReducer, preloadedState, enhancer)
  sagaMiddleware.run(rootSaga)  
  return store
}