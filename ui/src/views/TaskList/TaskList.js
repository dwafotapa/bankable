import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Header, Icon, Button, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import sortBy from 'lodash/sortBy'
import './TaskList.css'

class TaskList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      column: '',
      direction: '',
      tasks: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      column: 'dueDate',
      direction: 'ascending',
      tasks: sortBy(nextProps.tasks, ['dueDate'])
    })
  }

  componentDidMount() {
    const { accountId } = this.props.match.params
    this.props.fetchTasksRequest(accountId)
  }

  handleSortBy = fieldName => () => {
    this.setState(prevState => {
      const { column, direction, tasks } = prevState
      if (column === fieldName) {
        return {
          direction: direction === 'ascending' ? 'descending' : 'ascending',
          tasks: tasks.reverse()
        }
      } else {
        return {
          column: fieldName,
          direction: 'ascending',
          tasks: sortBy(tasks, [fieldName])
        }
      }
    })
  }

  handleCloseIconClick = (taskId) => {
    this.props.closeTaskRequest(this.props.account.id, taskId)
  }

  handleSnoozeIconClick = (taskId) => {}

  render() {
    const { column, direction, tasks } = this.state
    const { isFetching, error, account } = this.props
    if (isFetching) {
      return <Container>Loading...</Container>
    }

    if (error.message) {
      return <Container>An error has occurred: {error.message}.</Container>
    }

    if (tasks.length === 0) {
      return <Container>No matches found.</Container>
    }

    return (
      <Container>
        <Header as="h3" block textAlign="center">Account<br/><span className="header-smaller-font">{account.id} - {account.companyName}</span></Header>
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell sorted={column === 'type' ? direction : null} onClick={this.handleSortBy('type')}>Type</Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'status' ? direction : null} onClick={this.handleSortBy('status')}>Status</Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'dueDate' ? direction : null} onClick={this.handleSortBy('dueDate')}>Due Date</Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'snoozedUntil' ? direction : null} onClick={this.handleSortBy('snoozedUntil')}>Snoozed Until</Table.HeaderCell>
              <Table.HeaderCell className="table-header-cell-unsortable">Actions<br/><Icon name="wait"/>= Snooze<br/><Icon name="close"/>= Close</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tasks.map(task =>
              <Table.Row key={task.id} className={new Date(task.dueDate) < new Date() ? "table-row-urgent" : ""}>
                <Table.Cell>{task.type}</Table.Cell>
                <Table.Cell>{task.status}</Table.Cell>
                <Table.Cell>{(task.dueDate && new Date(task.dueDate).toLocaleDateString()) || ''}</Table.Cell>
                <Table.Cell>{(task.snoozedUntil && new Date(task.snoozedUntil).toLocaleDateString()) || ''}</Table.Cell>
                <Table.Cell textAlign="right">
                  {task.status !== 'CLOSED' && task.status !== 'SNOOZED' && <Icon name="wait" className="icon-action" onClick={() => this.handleSnoozeIconClick(task.id)}/>}
                  {task.status !== 'CLOSED' && <Icon name="close" className="icon-action" onClick={() => this.handleCloseIconClick(task.id)}/>}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <Button><Link to="/accounts"><Icon name="chevron left"/>Your Accounts</Link></Button>
      </Container>
    )
  }
}

TaskList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  fetchTasksRequest: PropTypes.func.isRequired,
  closeTaskRequest: PropTypes.func.isRequired
}

export default TaskList