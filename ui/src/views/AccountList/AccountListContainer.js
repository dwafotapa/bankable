import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Table } from 'semantic-ui-react'
import { fetchAccountsRequest } from 'store/modules/accounts';

class AccountListContainer extends Component {
  componentDidMount() {
    this.props.fetchAccountsRequest()
  }

  render() {
    // const accounts = props.accounts.map(account => <Table.Cell>{account.name}</Table.Cell>)
    return (
      <Container>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Accounts</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchAccountsRequest: () => {
    dispatch(fetchAccountsRequest());
  }
});

export default connect(null, mapDispatchToProps)(AccountListContainer)