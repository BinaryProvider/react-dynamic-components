import { Grid } from '@mui/material'
import React from 'react'
import { LeftPanel } from '../../components/LeftPanel'

export const Editor: React.FC = () => {
  return (
    <Grid container height={1}>
      <Grid item xs={3} display="flex">
        <LeftPanel />
      </Grid>
      <Grid item xs={9} display="flex">
        <iframe
          id="Canvas"
          title="Canvas"
          width="100%"
          height="100%"
          scrolling="no"
          style={{ border: 0 }}
          src="../Canvas"
        />
      </Grid>
    </Grid>
  )
}
