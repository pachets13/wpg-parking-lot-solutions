import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import ConcreteAsphalt from './pages/ConcreteAsphalt'
import SnowIce from './pages/SnowIce'
import DesignBuild from './pages/DesignBuild'
import About from './pages/About'
import Contact from './pages/Contact'
import { initScrollAnimations } from './utils/scrollAnimations'

// Scrolls to top and initialises scroll animations on every route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    // Small delay lets React finish rendering the new page before observing
    const timer = setTimeout(initScrollAnimations, 50)
    return () => clearTimeout(timer)
  }, [pathname])
  return null
}

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/services/concrete-asphalt" element={<Layout><ConcreteAsphalt /></Layout>} />
        <Route path="/services/snow-ice" element={<Layout><SnowIce /></Layout>} />
        <Route path="/services/design-build" element={<Layout><DesignBuild /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
      </Routes>
    </HashRouter>
  )
}
