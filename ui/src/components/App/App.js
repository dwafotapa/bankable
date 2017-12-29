import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Nav from 'components/Nav/Nav'
import Home from 'views/Home/Home'
import AccountListContainer from 'views/AccountList/AccountListContainer'

const App = () => (
  <div>
    <Nav/>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/accounts" component={AccountListContainer}/>
    </Switch>
  </div>
)

export default App