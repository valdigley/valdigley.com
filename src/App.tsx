import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { ThemeCustomizer } from './components/ThemeCustomizer'
import { Header } from './components/Layout/Header'
import { Footer } from './components/Layout/Footer'
import { AdminLayout } from './components/admin/AdminLayout'
import { Home } from './pages/Home'
import { Portfolio } from './pages/Portfolio'
import { ProjectDetail } from './pages/ProjectDetail'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Blog } from './pages/Blog'
import { AdminLogin } from './pages/admin/Login'
import { AdminDashboard } from './pages/admin/Dashboard'
import { AdminProjects } from './pages/admin/Projects'
import { ProjectForm } from './pages/admin/ProjectForm'
import { AdminCategories } from './pages/admin/Categories'
import { AdminTestimonials } from './pages/admin/Testimonials'
import { AdminBlog } from './pages/admin/Blog'
import { BlogForm } from './pages/admin/BlogForm'
import { AdminSettings } from './pages/admin/Settings'
import { AdminThemeSettings } from './pages/admin/ThemeSettings'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="projects/new" element={<ProjectForm />} />
            <Route path="projects/:id/edit" element={<ProjectForm />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="blog/new" element={<BlogForm />} />
            <Route path="blog/:id/edit" element={<BlogForm />} />
            <Route path="theme" element={<AdminThemeSettings />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          
          {/* Public Routes */}
          <Route path="/*" element={
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/portfolio/:category" element={<Portfolio />} />
                  <Route path="/portfolio/:category/:slug" element={<ProjectDetail />} />
                  <Route path="/sobre" element={<About />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/contato" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
              <ThemeCustomizer />
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App