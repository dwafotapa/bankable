import React from 'react'
import { connect } from 'react-redux'
import { Container, Header } from 'semantic-ui-react'

const Home = (props) => (
  <Container>
    <Header as="h3" block textAlign="center">Welcome to bankable.</Header>
    <p>You are logged in as <strong>{props.bankerId}</strong></p>
  </Container>
)

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  bankerId: state.bankerId
})

export default connect(mapStateToProps)(Home)