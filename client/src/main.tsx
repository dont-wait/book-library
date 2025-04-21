import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  //Chay nhieu lan de phat hien ra loi
  <StrictMode> 
    <App />
  </StrictMode>,
)
