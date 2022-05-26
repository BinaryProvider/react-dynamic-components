import { Box } from '@mui/material'
import React from 'react'
import { ComponentProperties } from '../ComponentProperties'

export const LeftPanel: React.FC = () => {
  return (
    <Box
      p={3}
      width={1}
      sx={{
        boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px',
        zIndex: 1000,
      }}
    >
      <ComponentProperties />
    </Box>
  )
}
