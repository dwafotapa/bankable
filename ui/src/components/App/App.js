import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import PrivateRoute from 'components/PrivateRoute/PrivateRoute'
import MenuWrapper from 'components/MenuWrapper/MenuWrapper'
import MainWrapper from 'components/MainWrapper/MainWrapper'
import Home from 'views/Home/Home'
import AccountListContainer from 'views/AccountList/AccountListContainer'
import TaskListContainer from 'views/TaskList/TaskListContainer'

const App = () => (
  <Grid>
    <Grid.Column>
      <MenuWrapper/>
      <MainWrapper>
        <Switch>
          <PrivateRoute path="/accounts/:accountId/tasks" component={TaskListContainer}/>
          <PrivateRoute path="/accounts" component={AccountListContainer}/>
          <Route exact path="/" component={Home}/>
        </Switch>
      </MainWrapper>
    </Grid.Column>
  </Grid>
)

export default App