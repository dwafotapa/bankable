import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Container, Header, List } from 'semantic-ui-react'

class AccountList extends Component {
  componentDidMount() {
    this.props.fetchAccountsRequest()
  }

  render() {
    const { isFetching, error, accounts } = this.props
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
        <List divided relaxed>
          {accounts.map(account =>
            <List.Item key={account.id}>
              <List.Content>
                <List.Header><Link to={`/accounts/${account.id}/tasks`}>{account.id}</Link></List.Header>
                <List.Description>{account.companyName}</List.Description>
              </List.Content>
            </List.Item>
          )}
        </List>
      </Container>
    )
  }
}

AccountList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  accounts: PropTypes.array.isRequired,
  fetchAccountsRequest: PropTypes.func.isRequired
}

export default AccountList