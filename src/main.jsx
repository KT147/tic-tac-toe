import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ScoreContextProvider } from './pages/ScoreContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScoreContextProvider>
        <App />
      </ScoreContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
