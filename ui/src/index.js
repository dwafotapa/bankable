import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import throttle from 'lodash/throttle'
import uuid from 'uuid'
import { loadState, saveState } from 'utils/localStorage'
import configureStore from 'store/configureStore'
import { setBankerId } from 'store/modules/bankerId'
import App from 'components/App/App'
import registerServiceWorker from 'registerServiceWorker'
import 'semantic-ui-css/semantic.min.css'
import 'index.css'

const persistedState = loadState()
const store = configureStore(persistedState)
store.subscribe(throttle(() => {
  saveState(store.getState())
}, 1000))
if (!store.getState().bankerId) {
  store.dispatch(setBankerId(uuid()))
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
