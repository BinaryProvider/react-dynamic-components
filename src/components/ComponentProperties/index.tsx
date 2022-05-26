import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'
import { useEditorContext } from '../../hooks/useEditorContext'
import CodeMirror from '@uiw/react-codemirror'
import { json } from '@codemirror/lang-json'

export const ComponentProperties: React.FC = () => {
  const { component, setComponent } = useEditorContext()

  const { packageIdentifier, componentName, namedExport, ...props } =
    component ?? {}

  const handlePackageUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setComponent((component) => ({
      ...component,
      packageIdentifier: event.target.value,
    }))
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComponent((component) => ({
      ...component,
      componentName: event.target.value,
    }))
  }

  const handleDefaultExportChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setComponent((component) => ({
      ...component,
      namedExport: event.target.checked,
    }))
  }

  const handlePropsChange = (value: string) => {
    try {
      const props = JSON.parse(value ?? '{}')
      setComponent((component) => ({
        ...props,
        packageIdentifier: component.packageIdentifier,
        componentName: component.componentName,
        namedExport: component.namedExport,
      }))
    } catch {}
  }

  return (
    <Box display="flex" flexDirection="column" gap="20px">
      <TextField
        label="Package"
        size="small"
        fullWidth
        value={packageIdentifier}
        onChange={handlePackageUrlChange}
      />
      <Box display="flex" gap="10px">
        <Box
          minWidth="150px"
          display="flex"
          alignItems="flex-end"
          justifyContent="flex-end"
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={namedExport}
                size="small"
                onChange={handleDefaultExportChange}
              />
            }
            label="Named export"
          />
        </Box>
        <TextField
          label="Component name"
          size="small"
          fullWidth
          value={componentName}
          disabled={!namedExport}
          onChange={handleNameChange}
        />
      </Box>
      <Box>
        <Typography variant="body2" mb={0.5}>
          Props:
        </Typography>
        <CodeMirror
          value={JSON.stringify(props, null, 2)}
          height="100%"
          extensions={[json()]}
          onChange={handlePropsChange}
        />
      </Box>
    </Box>
  )
}
