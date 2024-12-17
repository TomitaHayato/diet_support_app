import React from 'react'
import { createRoot } from 'react-dom/client'
import './builds/build.css'
import App from './pages/App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import Workout from './pages/Workout.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<App />} />
        <Route path="/workout/:id" element={<Workout />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
