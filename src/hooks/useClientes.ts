import { useState, useEffect } from 'react'
import { supabase, Cliente } from '@/lib/supabase'
import { useAuth } from './useAuth'

export function useClientes() {
  const { user } = useAuth()
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      loadClientes()
    }
  }, [user])

  const loadClientes = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .eq('id_usuario', user!.id)
        .order('fecha_registro', { ascending: false })

      if (error) throw error
      setClientes(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar clientes')
    } finally {
      setLoading(false)
    }
  }

  const createCliente = async (clienteData: Omit<Cliente, 'id_cliente' | 'id_usuario' | 'fecha_registro'>) => {
    try {
      const { data, error } = await supabase
        .from('clientes')
        .insert([{ ...clienteData, id_usuario: user!.id }])
        .select()
        .single()

      if (error) throw error
      setClientes(prev => [data, ...prev])
      return { data, error: null }
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Error al crear cliente'
      return { data: null, error }
    }
  }

  const updateCliente = async (id: string, updates: Partial<Cliente>) => {
    try {
      const { data, error } = await supabase
        .from('clientes')
        .update(updates)
        .eq('id_cliente', id)
        .select()
        .single()

      if (error) throw error
      setClientes(prev => prev.map(c => c.id_cliente === id ? data : c))
      return { data, error: null }
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Error al actualizar cliente'
      return { data: null, error }
    }
  }

  const deleteCliente = async (id: string) => {
    try {
      const { error } = await supabase
        .from('clientes')
        .delete()
        .eq('id_cliente', id)

      if (error) throw error
      setClientes(prev => prev.filter(c => c.id_cliente !== id))
      return { error: null }
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Error al eliminar cliente'
      return { error }
    }
  }

  return {
    clientes,
    loading,
    error,
    createCliente,
    updateCliente,
    deleteCliente,
    refetch: loadClientes,
  }
}