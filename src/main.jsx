import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route, useLocation } from 'react-router'
import LandingPage from './pages/LandingPage.jsx'
import YearPage from './pages/YearPage.jsx'
import './index.css'


function RoutesContainer() {
  const location = useLocation()

  useEffect(() => {
    let url = window.location.href.split('#')[0]
    if (url.endsWith('/')) {
      url = url.slice(0, -1)
    }
    gtag("event", "page_view", {
      page_location: url + location.pathname
    })
  }, [location])

  return (
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
  )
}

function App() {
  return (
    <HashRouter>
      <RoutesContainer />
    </HashRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)
