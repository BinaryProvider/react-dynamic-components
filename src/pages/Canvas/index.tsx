import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DynamicComponent } from '../../components/DynamicComponent'
import { IDynamicComponent } from '../../hooks/useEditorContext'

export const Canvas: React.FC = () => {
  const [component, setComponent] = useState<IDynamicComponent>()

  const handleMessage = (event: MessageEvent) => {
    const { message, value } = event.data

    switch (message) {
      case 'component':
        setComponent(value)
        break
      default:
        break
    }
  }

  useEffect(() => {
    window.addEventListener('message', handleMessage, false)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <Box height={1} display="flex" alignItems="center" justifyContent="center">
      <DynamicComponent {...component} />
    </Box>
  )
}
