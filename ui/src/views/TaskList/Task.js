import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Table } from 'semantic-ui-react'

const isTaskUrgent = (task) => {
  if (task.status === 'CLOSED') {
    return false
  }

  const now = new Date(), dueDate = new Date(task.dueDate), snoozedUntilDate = new Date(task.snoozedUntil)
  return now > dueDate && (!task.snoozedUntil || now > snoozedUntilDate)
}

const Task = (props) => {
  const {
    task,
    selectedTaskId,
    handleSnoozeIconClick,
    handleCloseIconClick
  } = props
  return (
    <Table.Row
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
        {task.status !== 'CLOSED' && <Icon name="wait" className="icon-action" onClick={() => handleSnoozeIconClick(task.id)}/>}
        {task.status !== 'CLOSED' && <Icon name="close" className="icon-action" onClick={() => handleCloseIconClick(task.id)}/>}
      </Table.Cell>
    </Table.Row>
  )
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  handleSnoozeIconClick: PropTypes.func.isRequired,
  handleCloseIconClick: PropTypes.func.isRequired
}

export default Task