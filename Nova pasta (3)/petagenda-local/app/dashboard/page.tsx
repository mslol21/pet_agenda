// app/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se usuário está logado
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }

    setUser(JSON.parse(userData))
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🐕</div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐕</span>
              <span className="text-xl font-bold text-teal-600">PetAgenda</span>
              <span className="text-sm text-gray-500 ml-2">
                {user?.petshop?.nome}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Olá, {user?.nome}
              </span>
              <Button variant="ghost" onClick={handleLogout}>
                Sair
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">Dashboard</h1>
          <p className="text-black mt-2 font-semibold">Bem-vindo ao seu painel de controle</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-100 font-medium">Hoje</p>
                <p className="text-4xl font-bold mt-2">0</p>
                <p className="text-sm text-blue-100 mt-1">agendamentos</p>
              </div>
              <div className="text-5xl opacity-80">📅</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-100 font-medium">Esta Semana</p>
                <p className="text-4xl font-bold mt-2">0</p>
                <p className="text-sm text-purple-100 mt-1">agendamentos</p>
              </div>
              <div className="text-5xl opacity-80">📊</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-100 font-medium">Este Mês</p>
                <p className="text-4xl font-bold mt-2">0</p>
                <p className="text-sm text-green-100 mt-1">agendamentos</p>
              </div>
              <div className="text-5xl opacity-80">💰</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-black mb-6">Ações Rápidas</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/dashboard/agendamentos">
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-6 text-base">
                📅 Ver Agendamentos
              </Button>
            </Link>
            <Link href="/dashboard/clientes">
              <Button variant="outline" className="w-full border-2 border-black hover:border-teal-600 hover:bg-teal-50 font-semibold py-6 text-base text-black">
                Ver Clientes
              </Button>
            </Link>
            <Link href="/dashboard/servicos">
              <Button variant="outline" className="w-full border-2 border-gray-300 hover:border-teal-600 hover:bg-teal-50 font-semibold py-6 text-base text-gray-900">
                Gerenciar Serviços
              </Button>
            </Link>
            <Link href="/dashboard/configuracoes">
              <Button variant="outline" className="w-full border-2 border-gray-300 hover:border-teal-600 hover:bg-teal-50 font-semibold py-6 text-base text-gray-900">
                Configurações
              </Button>
            </Link>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-300 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-teal-900 mb-6">🎉 Próximos Passos</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <span className="text-2xl font-bold text-teal-600 bg-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <p className="font-bold text-lg text-teal-900">Configure seus serviços</p>
                <p className="text-base text-teal-800 mt-1">Adicione banho, tosa e outros serviços que você oferece</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-2xl font-bold text-teal-600 bg-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <p className="font-bold text-lg text-teal-900">Defina seus horários</p>
                <p className="text-base text-teal-800 mt-1">Configure os dias e horários de funcionamento</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-2xl font-bold text-teal-600 bg-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <p className="font-bold text-lg text-teal-900">Compartilhe seu link</p>
                <p className="text-base text-teal-800 mt-1">
                  Seu link:{' '}
                  <Link 
                    href={`/${user?.petshop?.slug}`}
                    target="_blank"
                    className="font-mono bg-white px-3 py-2 rounded border-2 border-teal-300 text-teal-900 font-bold hover:bg-teal-50 hover:border-teal-500 transition-colors inline-block"
                  >
                    petagenda.app/{user?.petshop?.slug}
                  </Link>
                </p>
                <p className="text-sm text-teal-800 mt-2">
                  👆 Clique para ver como seus clientes veem sua página
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
