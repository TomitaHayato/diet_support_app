import React from 'react'
import { createRoot } from 'react-dom/client'
import './builds/build.css'
import App from './pages/App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
