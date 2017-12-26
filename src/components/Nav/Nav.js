import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'

class Nav extends Component {
  render() {
    const { pathname } = window.location
    return (
      <Menu color="blue" inverted>
        <Menu.Item
          active={pathname === '/'}
          as={Link}
          to="/"
        >
          Home
        </Menu.Item>
        <Menu.Item
          active={pathname === '/accounts'}
          as={Link}
          to="/accounts"
        >
          Accounts
        </Menu.Item>
      </Menu>
    )
  }
}

export default Nav