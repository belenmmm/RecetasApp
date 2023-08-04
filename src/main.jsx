import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './styles.css'
import { RecetasApp } from './RecetasApp'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <RecetasApp />
    </BrowserRouter>
    
  </React.StrictMode>,
)
