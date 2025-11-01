import { Inter } from 'next/font/google'
import { AuthProvider } from '@/hooks/useAuth'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Eclipse CRM - Gestiona tu negocio de forma simple',
  description: 'CRM profesional diseñado para pequeños negocios',
  manifest: '/manifest.json',
  themeColor: '#111827',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}