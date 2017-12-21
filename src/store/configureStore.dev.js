import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import saga from 'redux-saga';

const rootReducer = combineReducers({});

const enhancer = composeWithDevTools(
  applyMiddleware(saga, createLogger())
);

export default function configureStore(preloadedState) {  
  return createStore(rootReducer, preloadedState, enhancer);
}