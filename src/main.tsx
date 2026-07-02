import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './auth'
import { SupabaseProvider } from './lib/SupabaseProvider'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <SupabaseProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SupabaseProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
)
