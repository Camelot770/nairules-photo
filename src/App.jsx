import { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import WebApp from '@twa-dev/sdk'

import Navigation from './components/Navigation'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Booking from './pages/Booking'
import About from './pages/About'

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Initialize Telegram Web App
    try {
      WebApp.ready()
      WebApp.expand()
    } catch (e) {
      console.log('Not running in Telegram Web App')
    }
  }, [])

  useEffect(() => {
    // Handle Telegram Back Button
    try {
      if (location.pathname !== '/') {
        WebApp.BackButton.show()
        WebApp.BackButton.onClick(() => {
          navigate(-1)
        })
      } else {
        WebApp.BackButton.hide()
      }
    } catch (e) {
      // Not in Telegram
    }

    return () => {
      try {
        WebApp.BackButton.offClick()
      } catch (e) {
        // Not in Telegram
      }
    }
  }, [location.pathname, navigate])

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 safe-area-top">
        <div className="flex items-center justify-center h-14 bg-gradient-to-b from-black/40 to-transparent">
          <span className="text-lg font-medium tracking-wider text-white">nairules</span>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      {/* Navigation */}
      <Navigation />
    </div>
  )
}
