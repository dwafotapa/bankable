import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Header, Icon, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class TaskList extends Component {
  componentDidMount() {
    const { accountId } = this.props.match.params
    this.props.fetchTasksRequest(accountId)
  }

  render() {
    const { isFetching, hasFailed, account, tasks } = this.props
    if (isFetching) {
      return <Container>Loading...</Container>
    }

    if (hasFailed) {
      return <Container>Failed to fetch data. Please reload the page.</Container>
    }

    if (tasks.length === 0) {
      return <Container>No matches found.</Container>
    }

    return (
      <Container>
        <Header as="h3" block textAlign="center">{account.id} - {account.companyName}</Header>
        <Link to="/accounts">Back to Your Accounts</Link>
        <Table basic='very'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Due Date</Table.HeaderCell>
              <Table.HeaderCell>Snoozed Until</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tasks.map(task =>
              <Table.Row key={task.id}>
                <Table.Cell>{task.type}</Table.Cell>
                <Table.Cell>{task.status}</Table.Cell>
                <Table.Cell>{(task.dueDate && new Date(task.dueDate).toLocaleDateString()) || ''}</Table.Cell>
                <Table.Cell>{(task.snoozedUntil && new Date(task.snoozedUntil).toLocaleDateString()) || ''}</Table.Cell>
                <Table.Cell textAlign="right">
                  {task.status !== 'SNOOZED' && <Icon name="wait"/>}
                  {task.status !== 'CLOSED' && <Icon name="close"/>}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Container>
    )
  }
}

TaskList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  hasFailed: PropTypes.bool.isRequired,
  tasks: PropTypes.array.isRequired,
  fetchTasksRequest: PropTypes.func.isRequired
}

export default TaskList