import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { LazyMotion , domAnimation } from 'framer-motion'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LazyMotion features={domAnimation}>
    <App className="app" />
    </LazyMotion>
  </StrictMode>,
)
