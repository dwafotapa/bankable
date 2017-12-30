import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Table } from 'semantic-ui-react'

class AccountList extends Component {
  componentDidMount() {
    this.props.fetchAccountsRequest()
  }

  render() {
    const { isFetching, hasFailed, accounts } = this.props
    console.log(accounts)
    if (hasFailed) {
      return <div>Failed to fetch data. Please reload the page.</div>
    }

    if (accounts.length === 0) {
      if (isFetching) {
        return <div>Loading...</div>
      }

      return <div>No accounts found.</div>
    }

    return (
      <Container>
        <Table selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Account Number</Table.HeaderCell>
              <Table.HeaderCell>Company Name</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {accounts.map(account =>
              <Table.Row key={account.id} onClick={null}>
                <Table.Cell>{account.id}</Table.Cell>
                <Table.Cell>{account.companyName}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
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