import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AppAuthProvider } from './components/auth/AuthProvider.jsx'
import { Toaster } from './components/ui/toaster.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppAuthProvider>
      <App />
      <Toaster />
    </AppAuthProvider>
  </StrictMode>,
)
