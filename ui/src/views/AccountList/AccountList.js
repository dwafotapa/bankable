import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Container, Header, List } from 'semantic-ui-react'

class AccountList extends Component {
  componentDidMount() {
    this.props.fetchAccountsRequest()
  }

  render() {
    const { isFetching, hasFailed, accounts } = this.props
    if (hasFailed) {
      return <Container>Failed to fetch data. Please reload the page.</Container>
    }

    if (accounts.length === 0) {
      if (isFetching) {
        return <Container>Loading...</Container>
      }

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
  hasFailed: PropTypes.bool.isRequired,
  accounts: PropTypes.array.isRequired,
  fetchAccountsRequest: PropTypes.func.isRequired
}

export default AccountList