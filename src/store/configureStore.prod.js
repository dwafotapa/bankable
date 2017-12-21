import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import saga from 'redux-saga';

const rootReducer = combineReducers({});

const enhancer = applyMiddleware(saga);

export default function configureStore(preloadedState) {
  return createStore(rootReducer, preloadedState, enhancer);
}