import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { getBankerId } from 'store/modules/bankers/bankers';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    rest.bankerId ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{ pathname: '/' }}/>
    )
  )}/>
)

const mapStateToProps = (state) => ({
  bankerId: getBankerId(state)
})

export default connect(mapStateToProps)(PrivateRoute)