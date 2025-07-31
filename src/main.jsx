import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router'
import LandingPage from './pages/LandingPage.jsx'
import YearPage from './pages/YearPage.jsx'
import './index.css'

var oldURL = window.location.href;

function checkURLchange(){
    if(window.location.href !== oldURL){
        alert(`url changed! current URL: ${window.location.href} old URL: ${oldURL}`);
        oldURL = window.location.href;
        gtag("event", "page_view", {
          page_path: window.location.pathname + window.location.search + window.location.hash,
          page_search: location.search,
          page_hash: location.hash
        })
    }
}

window.addEventListener('click', checkURLchange);
// setInterval(checkURLchange, 3000);

function App() {
  return (
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
}

createRoot(document.getElementById('root')).render(<App />)
