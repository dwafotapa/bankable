import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import saga from 'redux-saga'
import bankerId from 'store/modules/bankerId'

const rootReducer = combineReducers({ bankerId })

const enhancer = applyMiddleware(saga)

export default function configureStore(preloadedState) {
  return createStore(rootReducer, preloadedState, enhancer)
}