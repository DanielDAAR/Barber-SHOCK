import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para TypeScript
export type Cliente = {
  id_cliente: string
  id_usuario: string
  nombre: string
  correo?: string
  telefono?: string
  empresa?: string
  direccion?: string
  estado: 'prospecto' | 'activo' | 'inactivo'
  origen?: string
  fecha_registro: string
}

export type Tarea = {
  id_tarea: string
  id_usuario: string
  id_cliente?: string
  titulo: string
  descripcion?: string
  completada: boolean
  fecha_limite?: string
  fecha_creacion: string
}

export type Venta = {
  id_venta: string
  id_usuario: string
  id_cliente?: string
  producto_servicio: string
  monto: number
  estado: 'completado' | 'pendiente' | 'cancelado'
  fecha_venta: string
  fecha_registro: string
}

export type Nota = {
  id_nota: string
  id_cliente: string
  tipo: 'llamada' | 'correo' | 'reunion' | 'nota'
  titulo: string
  descripcion?: string
  proximo_contacto?: string
  fecha_creacion: string
}

export type Archivo = {
  id_archivo: string
  id_cliente: string
  nombre_archivo: string
  url: string
  tipo: string
  fecha_subida: string
}