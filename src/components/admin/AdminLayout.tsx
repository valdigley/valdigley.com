import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  Image,
  LayoutDashboard, 
  FolderOpen, 
  MessageSquare, 
  FileText, 
  Settings,
  Menu,
  X,
  LogOut,
  User,
  Home
} from 'lucide-react'
import { supabase } from '../../lib/supabase'

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [logoUrl, setLogoUrl] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        navigate('/admin/login')
      } else {
        setUser(user)
      }
    }

    checkAuth()

    // Em uma implementação real, você buscaria a logo das configurações
    // fetchLogo()
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/admin/login')
      } else if (session?.user) {
        setUser(session.user)
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Contatos', href: '/admin/contacts', icon: MessageSquare },
    { name: 'Projetos', href: '/admin/projects', icon: Image },
    { name: 'Categorias', href: '/admin/categories', icon: FolderOpen },
    { name: 'Depoimentos', href: '/admin/testimonials', icon: User },
    { name: 'Blog', href: '/admin/blog', icon: FileText },
    { name: 'Tema', href: '/admin/theme', icon: Settings },
    { name: 'Configurações', href: '/admin/settings', icon: Settings },
  ]

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/')
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <Link to="/admin/dashboard" className="flex items-center space-x-2">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt="Admin" 
                className="h-8 w-auto max-w-[150px] object-contain"
              />
            ) : (
              <>
                <Image className="h-8 w-8 text-amber-600" />
                <span className="text-xl font-bold text-gray-900">Admin</span>
              </>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-amber-100 text-amber-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* User info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.email || 'Admin'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Sair
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 text-sm"
            >
              <Home className="h-4 w-4 mr-1" />
              Ver Site
            </Link>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}