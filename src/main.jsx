import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorkerRegistration from './serviceWorkerRegistration.js'
import { ReducerProvider } from './contexts/reducer.contexts/ReducerContext'
import { RefProvider } from './contexts/ref.context/RefContext.jsx'
import { FunctionProvider } from './contexts/function.contexts/FunctionContext'
import App from './App'
import { Analytics } from "@vercel/analytics/react"
import './styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ReducerProvider>
        <FunctionProvider>
          <RefProvider>
            <App />
            <Analytics />
          </RefProvider>
        </FunctionProvider>
      </ReducerProvider>
    </BrowserRouter>
  </StrictMode>
)

serviceWorkerRegistration.register()
