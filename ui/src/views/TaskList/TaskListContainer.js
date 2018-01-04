import { connect } from 'react-redux'
import { toJS } from 'utils/to-js'
import TaskList from './TaskList'
import { fetchTasksRequest, closeTaskRequest } from 'store/modules/tasks'

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isFetching: state.tasks.get('isFetching'),
  error: state.tasks.get('error'),
  account: state.accounts.getIn(['byId', ownProps.match.params.accountId]),
  tasks: state.tasks.get('ids').map(id => state.tasks.getIn(['byId', id]))
})

const mapDispatchToProps = (dispatch) => ({
  fetchTasksRequest: (accountId) => dispatch(fetchTasksRequest(accountId)),
  closeTaskRequest: (accountId, taskId) => dispatch(closeTaskRequest(accountId, taskId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(toJS(TaskList))