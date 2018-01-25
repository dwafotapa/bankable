import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { List } from 'semantic-ui-react'

const Account = (props) => {
  const { account } = props
  return (
    <List.Item>
      <List.Content>
        <List.Header><Link to={`/accounts/${account.id}/tasks`}>{account.id}</Link></List.Header>
        <List.Description>{account.companyName}</List.Description>
      </List.Content>
    </List.Item>
  )
}

Account.propTypes = {
  account: PropTypes.object.isRequired
}

export default Account