import React from 'react'
import { connect } from 'react-redux'
import { Button, Container, Grid, Header, Segment } from 'semantic-ui-react'
import { resetBankerId } from 'store/modules/bankers'

const Home = (props) => (
  <Container>
    <Header as="h3" block textAlign="center">Home</Header>
    <Segment>
      <p>You are logged in as <strong>{props.bankerId}</strong></p>
    </Segment>
    <Grid>
      <Grid.Column textAlign="right">
        <Button onClick={props.resetBankerId} primary>Reset Your ID</Button>
      </Grid.Column>
    </Grid>
  </Container>
)

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  bankerId: state.bankers.get('bankerId')
})

const mapDispatchToProps = (dispatch) => ({
  resetBankerId: () => dispatch(resetBankerId())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)