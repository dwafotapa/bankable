import React from 'react'
import { Container, Table } from 'semantic-ui-react'

const AccountListContainer = (props) => {
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

export default AccountListContainer