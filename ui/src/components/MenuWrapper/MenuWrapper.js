import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

class MenuWrapper extends Component {
  render() {
    const { pathname } = window.location
    return (
      <Menu pointing secondary size="massive">
        <Menu.Item
          active={pathname === '/'}
          as={Link}
          to="/"
        >
          Home
        </Menu.Item>
        <Menu.Item
          active={pathname.startsWith('/accounts')}
          as={Link}
          to="/accounts"
        >
          Accounts
        </Menu.Item>
      </Menu>
    )
  }
}

export default MenuWrapper