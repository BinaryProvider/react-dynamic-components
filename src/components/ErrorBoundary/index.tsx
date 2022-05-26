import Alert from '@mui/material/Alert'
import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | undefined
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: undefined,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Alert severity="error" sx={{ maxWidth: '80%' }}>
          <b>{this.state.error?.name}:</b> {this.state.error?.message}
        </Alert>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
