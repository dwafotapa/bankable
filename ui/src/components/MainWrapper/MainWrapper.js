import React from 'react'
import { Grid } from 'semantic-ui-react'

const MainWrapper = ({ children }) => (
  <Grid>
    <Grid.Column>
      {children}
    </Grid.Column>
  </Grid>
)

export default MainWrapper