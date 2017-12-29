import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from 'store/configureStore'
import { BrowserRouter } from 'react-router-dom'
import App from 'components/App/App'
import registerServiceWorker from 'registerServiceWorker'
import 'semantic-ui-css/semantic.min.css'
import 'index.css'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
