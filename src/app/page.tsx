'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { 
  Users, 
  CheckSquare, 
  TrendingUp, 
  FileText, 
  MessageSquare, 
  BarChart3,
  ArrowRight,
  Shield,
  Zap,
  Smartphone
} from 'lucide-react'

export default function LandingPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Si el usuario ya está autenticado, redirigir al dashboard
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    )
  }

  const features = [
    {
      icon: Users,
      title: 'Gestión de Clientes',
      description: 'Organiza y da seguimiento a todos tus clientes en un solo lugar'
    },
    {
      icon: CheckSquare,
      title: 'Tareas y Recordatorios',
      description: 'Nunca olvides un seguimiento importante con nuestro sistema de tareas'
    },
    {
      icon: TrendingUp,
      title: 'Control de Ventas',
      description: 'Registra y analiza tus ventas para tomar mejores decisiones'
    },
    {
      icon: MessageSquare,
      title: 'Notas e Interacciones',
      description: 'Documenta cada interacción con tus clientes'
    },
    {
      icon: FileText,
      title: 'Archivos y Documentos',
      description: 'Almacena documentos importantes asociados a cada cliente'
    },
    {
      icon: BarChart3,
      title: 'Reportes y Métricas',
      description: 'Visualiza el rendimiento de tu negocio con reportes claros'
    }
  ]

  const stats = [
    { label: 'Clientes Gestionados', value: '500+' },
    { label: 'Tareas Completadas', value: '10K+' },
    { label: 'Ventas Registradas', value: '2M+' },
    { label: 'Usuarios Satisfechos', value: '95%' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Eclipse</h1>
                <p className="text-xs text-gray-400">CRM Lite</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.push('/login')}
                className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                Iniciar sesión
              </button>
              <button 
                onClick={() => router.push('/register')}
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105"
              >
                Crear cuenta
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              Gestiona tu negocio
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                de forma simple
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              CRM profesional diseñado para pequeños negocios. Gestiona clientes, tareas, ventas y más en una sola plataforma intuitiva y poderosa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => router.push('/register')}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg font-medium rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/25"
              >
                Comenzar gratis
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
              <button 
                onClick={() => router.push('/login')}
                className="px-8 py-4 border border-gray-600 text-gray-300 text-lg font-medium rounded-lg hover:border-gray-500 hover:text-white transition-all"
              >
                Demo interactiva
              </button>
            </div>
          </div>
        </div>

        {/* Background Grid */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -inset-[10px] opacity-50 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-3xl"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:16px_16px]"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-gray-700 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Todo lo que necesitas en un solo lugar
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Características diseñadas para simplificar la gestión de tu negocio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-cyan-500 transition-all duration-300 hover:transform hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            ¿Listo para transformar tu negocio?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Únete a miles de negocios que ya usan Eclipse CRM para simplificar su gestión diaria.
          </p>
          <button 
            onClick={() => router.push('/register')}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg font-medium rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/25"
          >
            Comenzar gratis hoy
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Eclipse CRM</h3>
                <p className="text-sm text-gray-400">Simplifica tu gestión</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-cyan-400 transition-colors">Privacidad</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Términos</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Soporte</a>
              <a href="https://github.com" className="hover:text-cyan-400 transition-colors">GitHub</a>
            </div>
            
            <p className="text-gray-400 text-sm">
              © 2025 Eclipse CRM. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}