import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const MenuWrapper = () => (
  <Menu pointing secondary size="massive">
    <Menu.Item
      as={NavLink}
      to="/"
      exact
    >
      Home
    </Menu.Item>
    <Menu.Item
      as={NavLink}
      to="/accounts"
      exact
    >
      Accounts
    </Menu.Item>
  </Menu>
)

export default MenuWrapper