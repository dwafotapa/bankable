import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Container, Grid, Header, List, Segment } from 'semantic-ui-react'
import Account from './Account'

class AccountList extends Component {
  componentDidMount() {
    this.props.fetchAccountsRequest()
  }

  handleResetButtonClick = () => {
    this.props.resetAccountsRequest()
  }

  render() {
    const { isFetching, error, accounts, resetAccountsRequest } = this.props
    if (isFetching) {
      return <Container>Loading...</Container>
    }

    if (error.message) {
      return <Container>An error has occurred: {error.message}.</Container>
    }

    if (accounts.length === 0) {
      return <Container>No accounts found.</Container>
    }

    return (
      <Container>
        <Header as="h3" block textAlign="center">Your Accounts</Header>
        <Segment>
          <List divided relaxed>
            {accounts.map(account => <Account key={account.id} account={account}/>)}
          </List>
        </Segment>
        <Grid>
          <Grid.Column textAlign="center">
            <Button onClick={resetAccountsRequest} primary>Reset Your Accounts</Button>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

AccountList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  accounts: PropTypes.array.isRequired,
  fetchAccountsRequest: PropTypes.func.isRequired,
  resetAccountsRequest: PropTypes.func.isRequired
}

export default AccountList