import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Nav from 'components/Nav/Nav'
import Home from 'views/Home/Home'
import AccountListContainer from 'views/AccountList/AccountListContainer'

const App = ({ children }) => (
  <BrowserRouter>
    <div>
      <Nav/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/accounts" component={AccountListContainer}/>
      </Switch>
    </div>
  </BrowserRouter>
)

export default App