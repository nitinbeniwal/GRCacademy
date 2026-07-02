import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}
interface State {
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // In a real deployment this would report to an error service.
    console.error('Uncaught error:', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="grid min-h-screen place-items-center bg-cbg p-6">
          <div className="card max-w-md p-8 text-center">
            <div className="text-5xl">⚠️</div>
            <h1 className="mt-4 text-xl font-bold">Something went wrong</h1>
            <p className="mt-2 text-sm text-cslate">
              An unexpected error occurred. Reloading usually fixes it — your progress is saved.
            </p>
            <button className="btn-primary mt-6" onClick={() => window.location.assign('/')}>
              Reload app
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
