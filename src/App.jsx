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

// Scrolls to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
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
