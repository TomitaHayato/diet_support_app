import React from 'react'
import { createRoot } from 'react-dom/client'
import './builds/build.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="p-16">
      <App />
    </div>
  </React.StrictMode>,
)
