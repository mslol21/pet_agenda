// app/dashboard/configuracoes/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ConfiguracoesPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center gap-2">
              <span className="text-2xl">🐕</span>
              <span className="text-xl font-bold text-teal-600">PetAgenda</span>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost">← Voltar</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">Configurações</h1>
          <p className="text-lg text-black mt-2 font-bold">Gerencie as configurações do seu petshop</p>
        </div>

        <div className="space-y-6">
          {/* Informações do Petshop */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-black mb-6">Informações do Petshop</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-base font-bold text-black mb-3">
                  Nome do Petshop
                </label>
                <input
                  type="text"
                  value={user?.petshop?.nome || ''}
                  className="w-full px-4 py-3 border-2 border-black rounded-lg text-black font-bold text-base bg-gray-50"
                  disabled
                />
              </div>
              <div>
                <label className="block text-base font-bold text-black mb-3">
                  Slug (URL)
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-black">petagenda.app/</span>
                  <input
                    type="text"
                    value={user?.petshop?.slug || ''}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 font-medium text-base bg-gray-50"
                    disabled
                  />
                </div>
              </div>
              <div>
                <label className="block text-base font-bold text-black mb-3">
                  Cidade
                </label>
                <input
                  type="text"
                  value={user?.petshop?.cidade || ''}
                  className="w-full px-4 py-3 border-2 border-black rounded-lg text-black font-bold text-base bg-gray-50"
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Plano Atual */}
          <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">Plano Atual</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold capitalize mb-2">
                  {user?.petshop?.plano_atual || 'Free'}
                </p>
                <p className="text-lg text-teal-100">
                  Até 30 agendamentos por mês
                </p>
              </div>
              <Button className="bg-white text-teal-600 hover:bg-teal-50 font-bold text-base px-6 py-3">
                Fazer Upgrade
              </Button>
            </div>
          </div>

          {/* Horário de Funcionamento */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-black mb-6">Horário de Funcionamento</h2>
            <div className="bg-gray-100 rounded-lg p-6 border-2 border-gray-300">
              <p className="text-base font-bold text-black mb-3">Segunda a Sexta: 08:00 - 18:00</p>
              <p className="text-base font-bold text-black">Sábado: 08:00 - 14:00</p>
            </div>
            <Button variant="outline" className="mt-6 border-2 border-gray-300 font-semibold text-base py-3">
              Editar Horários
            </Button>
          </div>

          {/* Integrações */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-black mb-6">Integrações</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-6 border-2 border-gray-300 rounded-lg hover:border-teal-500 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">💬</span>
                  <div>
                    <p className="font-bold text-lg text-black">WhatsApp</p>
                    <p className="text-base text-black font-semibold">Lembretes automáticos</p>
                  </div>
                </div>
                <Button variant="outline" className="border-2 border-gray-300 font-semibold text-base">Configurar</Button>
              </div>
              <div className="flex items-center justify-between p-6 border-2 border-gray-300 rounded-lg hover:border-teal-500 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">💳</span>
                  <div>
                    <p className="font-bold text-lg text-black">PIX</p>
                    <p className="text-base text-black font-semibold">Pagamentos online</p>
                  </div>
                </div>
                <Button variant="outline" className="border-2 border-gray-300 font-semibold text-base">Configurar</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
