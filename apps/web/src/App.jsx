import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './components/navigation/Navbar.jsx'
import { HeroSection } from './components/hero/HeroSection.jsx'
import { FeatureSection } from './components/sections/FeatureSection.jsx'
import { HowItWorks } from './components/sections/HowItWorks.jsx'
import { ProductShowcase } from './components/sections/ProductShowcase.jsx'
import { PricingSection } from './components/sections/PricingSection.jsx'
import { FinalCTA } from './components/sections/FinalCTA.jsx'
import { Footer } from './components/sections/Footer.jsx'
import { AppLayout } from './app/AppLayout.jsx'

const DashboardPage = lazy(() => import('./app/pages/DashboardPage.jsx').then((module) => ({ default: module.DashboardPage })))
const ChatPage = lazy(() => import('./app/pages/ChatPage.jsx').then((module) => ({ default: module.ChatPage })))
const DocumentsPage = lazy(() => import('./app/pages/DocumentsPage.jsx').then((module) => ({ default: module.DocumentsPage })))
const StudioPage = lazy(() => import('./app/pages/StudioPage.jsx').then((module) => ({ default: module.StudioPage })))
const ProjectsPage = lazy(() => import('./app/pages/ProjectsPage.jsx').then((module) => ({ default: module.ProjectsPage })))
const AnalyticsPage = lazy(() => import('./app/pages/AnalyticsPage.jsx').then((module) => ({ default: module.AnalyticsPage })))
const SettingsPage = lazy(() => import('./app/pages/SettingsPage.jsx').then((module) => ({ default: module.SettingsPage })))

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#05080f] text-[#f0fdfa] selection:bg-cyan-500/30 selection:text-white">
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <FeatureSection />
        <HowItWorks />
        <ProductShowcase />
        <PricingSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-[#05080f] p-8 text-sm text-[#8498b5]" role="status">Loading workspace…</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="studio" element={<StudioPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
