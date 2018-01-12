import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Confirm, Container, Grid, Header, Icon, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import sortBy from 'lodash/sortBy'
import './TaskList.css'

const isTaskUrgent = (task) => {
  if (task.status === 'CLOSED') {
    return false
  }

  const now = new Date(), dueDate = new Date(task.dueDate), snoozedUntilDate = new Date(task.snoozedUntil)
  return now > dueDate && (!task.snoozedUntil || now > snoozedUntilDate)
}

class TaskList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSnoozeModalOpen: false,
      selectedTaskId: '',
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
    this.props.fetchTasksRequest(this.props.match.params.accountId)
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

  handleCloseIconClick = (selectedTaskId) => {
    this.props.closeTaskRequest(this.props.account.id, selectedTaskId)
    this.setState({ selectedTaskId })
  }

  handleSnoozeIconClick = (selectedTaskId) => {
    this.setState({
      isSnoozeModalOpen: true,
      selectedTaskId
    })
  }

  handleSnoozeModalCancel = () => {
    this.setState({
      isSnoozeModalOpen: false,
    })
  }

  handleSnoozeModalConfirm = () => {
    this.props.snoozeTaskRequest(this.props.account.id, this.state.selectedTaskId)
    this.setState({
      isSnoozeModalOpen: false,
    })
  }

  render() {
    const { isSnoozeModalOpen, selectedTaskId, column, direction, tasks } = this.state
    const { isFetching, error, account } = this.props
    if (isFetching) {
      return <Container>Loading...</Container>
    }

    if (error.message) {
      return <Container>An error has occurred: {error.message}.</Container>
    }

    if (tasks.length === 0) {
      return <Container>No tasks found.</Container>
    }

    return (
      <Container>
        <Header as="h3" block textAlign="center">Account<br/><span className="header-smaller-font">{account.id} - {account.companyName}</span></Header>
        <Grid>
          <Grid.Column>
            <Link to="/accounts" className="ui primary button"><Icon name="chevron left"/>Your Accounts</Link>
          </Grid.Column>
        </Grid>
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell sorted={column === 'type' ? direction : null} onClick={this.handleSortBy('type')}>Type</Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'status' ? direction : null} onClick={this.handleSortBy('status')}>Status</Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'dueDate' ? direction : null} onClick={this.handleSortBy('dueDate')} textAlign="right">Due Date</Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'snoozedUntil' ? direction : null} onClick={this.handleSortBy('snoozedUntil')} textAlign="right">Snoozed Until</Table.HeaderCell>
              <Table.HeaderCell className="table-header-cell-unsortable" textAlign="right">Actions<br/><Icon name="wait"/>= Snooze<br/><Icon name="close"/>= Close</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tasks.map(task =>
              <Table.Row
                key={task.id}
                active={task.id === selectedTaskId}
                warning={isTaskUrgent(task)}
              >
                <Table.Cell>{task.type}</Table.Cell>
                <Table.Cell>{task.status}</Table.Cell>
                <Table.Cell textAlign="right">
                  {isTaskUrgent(task) && <Icon name="attention"/>}
                  {task.dueDate && new Date(task.dueDate).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell textAlign="right">{task.snoozedUntil && new Date(task.snoozedUntil).toLocaleDateString()}</Table.Cell>
                <Table.Cell textAlign="right">
                  {task.status !== 'CLOSED' && <Icon name="wait" className="icon-action" onClick={() => this.handleSnoozeIconClick(task.id)}/>}
                  {task.status !== 'CLOSED' && <Icon name="close" className="icon-action" onClick={() => this.handleCloseIconClick(task.id)}/>}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <Confirm
          open={isSnoozeModalOpen}
          content="Snooze for a week?"
          onCancel={this.handleSnoozeModalCancel}
          onConfirm={this.handleSnoozeModalConfirm}
        />
      </Container>
    )
  }
}

TaskList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  fetchTasksRequest: PropTypes.func.isRequired,
  closeTaskRequest: PropTypes.func.isRequired,
  snoozeTaskRequest: PropTypes.func.isRequired
}

export default TaskList