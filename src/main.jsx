import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router'
import LandingPage from './pages/LandingPage.jsx'
import YearPage from './pages/YearPage.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Routes>
      <Route index path="/" element={
        <StrictMode>
          <LandingPage />
        </StrictMode>
      } />
      <Route path="year">
        <Route path=":year" element={
          <StrictMode>
            <YearPage />
          </StrictMode>
        } />
      </Route>
    </Routes>
  </HashRouter>
)
