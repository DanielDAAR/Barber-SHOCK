'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { 
  Users, 
  CheckSquare, 
  TrendingUp, 
  DollarSign,
  Plus,
  ArrowUpRight,
  Calendar,
  Activity
} from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  totalClientes: number
  tareasPendientes: number
  ventasMes: number
  crecimientoVentas: number
}

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalClientes: 0,
    tareasPendientes: 0,
    ventasMes: 0,
    crecimientoVentas: 0
  })
  const [loading, setLoading] = useState(true)
  const [recentActivity, setRecentActivity] = useState<any[]>([])

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    loadDashboardData()
  }, [user, router])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      const [clientesRes, tareasRes, ventasRes] = await Promise.all([
        supabase.from('clientes').select('*').eq('id_usuario', user!.id),
        supabase.from('tareas').select('*').eq('id_usuario', user!.id).eq('completada', false),
        supabase.from('ventas').select('*').eq('id_usuario', user!.id)
      ])

      // Calcular estadísticas
      const now = new Date()
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      
      const ventasMes = ventasRes.data?.filter(v => 
        new Date(v.fecha_venta) >= monthStart
      ) || []
      
      const ventasMesAnterior = ventasRes.data?.filter(v => 
        new Date(v.fecha_venta) >= lastMonthStart && new Date(v.fecha_venta) < monthStart
      ) || []

      const totalVentasMes = ventasMes.reduce((sum, v) => sum + parseFloat(v.monto || 0), 0)
      const totalVentasMesAnterior = ventasMesAnterior.reduce((sum, v) => sum + parseFloat(v.monto || 0), 0)
      
      const crecimiento = totalVentasMesAnterior > 0 
        ? ((totalVentasMes - totalVentasMesAnterior) / totalVentasMesAnterior) * 100 
        : 0

      setStats({
        totalClientes: clientesRes.data?.length || 0,
        tareasPendientes: tareasRes.data?.length || 0,
        ventasMes: totalVentasMes,
        crecimientoVentas: crecimiento
      })

      // Cargar actividad reciente (últimas 5 tareas)
      const { data: actividad } = await supabase
        .from('tareas')
        .select('*')
        .eq('id_usuario', user!.id)
        .order('fecha_creacion', { ascending: false })
        .limit(5)

      setRecentActivity(actividad || [])
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const quickActions = [
    {
      icon: Users,
      label: 'Agregar Cliente',
      description: 'Registrar nuevo cliente',
      href: '/dashboard/clientes/nuevo',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: CheckSquare,
      label: 'Nueva Tarea',
      description: 'Crear recordatorio',
      href: '/dashboard/tareas/nueva',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: TrendingUp,
      label: 'Registrar Venta',
      description: 'Agregar nueva venta',
      href: '/dashboard/ventas/nueva',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">Resumen de tu negocio</p>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-cyan-500 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-cyan-400" />
            <div className="text-right">
              <span className="text-2xl font-bold text-white block">{stats.totalClientes}</span>
              <span className="text-sm text-gray-400">Total</span>
            </div>
          </div>
          <h3 className="text-gray-400 text-sm font-medium mb-2">Clientes</h3>
          <Link 
            href="/dashboard/clientes"
            className="text-cyan-400 hover:text-cyan-300 text-sm font-medium inline-flex items-center gap-1 transition-colors"
          >
            Ver todos <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-yellow-500 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <CheckSquare className="w-8 h-8 text-yellow-400" />
            <div className="text-right">
              <span className="text-2xl font-bold text-white block">{stats.tareasPendientes}</span>
              <span className="text-sm text-gray-400">Pendientes</span>
            </div>
          </div>
          <h3 className="text-gray-400 text-sm font-medium mb-2">Tareas</h3>
          <Link 
            href="/dashboard/tareas"
            className="text-yellow-400 hover:text-yellow-300 text-sm font-medium inline-flex items-center gap-1 transition-colors"
          >
            Ver tareas <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-green-500 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-green-400" />
            <div className="text-right">
              <span className="text-2xl font-bold text-white block">${stats.ventasMes.toFixed(2)}</span>
              <span className="text-sm text-gray-400">Este mes</span>
            </div>
          </div>
          <h3 className="text-gray-400 text-sm font-medium mb-2">Ventas</h3>
          <div className="flex items-center justify-between">
            <Link 
              href="/dashboard/ventas"
              className="text-green-400 hover:text-green-300 text-sm font-medium inline-flex items-center gap-1 transition-colors"
            >
              Ver ventas <ArrowUpRight className="w-4 h-4" />
            </Link>
            {stats.crecimientoVentas !== 0 && (
              <span className={`text-xs font-medium ${stats.crecimientoVentas >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {stats.crecimientoVentas >= 0 ? '+' : ''}{stats.crecimientoVentas.toFixed(1)}%
              </span>
            )}
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-8 h-8 text-purple-400" />
            <div className="text-right">
              <span className="text-2xl font-bold text-white block">
                {Math.round((stats.totalClientes / 30) * 100)}%
              </span>
              <span className="text-sm text-gray-400">Engagement</span>
            </div>
          </div>
          <h3 className="text-gray-400 text-sm font-medium mb-2">Rendimiento</h3>
          <div className="text-purple-400 text-sm font-medium">
            Buen progreso
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Acciones rápidas</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="flex items-center gap-3 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all transform hover:scale-105 group"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium">{action.label}</h4>
                  <p className="text-gray-400 text-sm">{action.description}</p>
                </div>
                <Plus className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Actividad reciente</h3>
          <div className="space-y-4">
            {recentActivity.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No hay actividad reciente</p>
            ) : (
              recentActivity.map((actividad, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <CheckSquare className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{actividad.titulo}</p>
                    <p className="text-gray-400 text-xs">
                      {new Date(actividad.fecha_creacion).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    actividad.completada 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {actividad.completada ? 'Completada' : 'Pendiente'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}