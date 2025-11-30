// app/dashboard/servicos/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

export default function ServicosPage() {
  const [user, setUser] = useState<any>(null)
  const [servicos, setServicos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      loadServicos(parsedUser.petshop.id)
    }
  }, [])

  const loadServicos = async (petshopId: string) => {
    try {
      const { data, error } = await supabase
        .from('servicos')
        .select('*')
        .eq('petshop_id', petshopId)
        .eq('ativo', true)
        .order('nome')

      if (!error && data) {
        setServicos(data)
      }
    } catch (err) {
      console.error('Erro ao carregar serviços:', err)
    } finally {
      setLoading(false)
    }
  }

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-black">Serviços</h1>
            <p className="text-black mt-2 font-semibold">Gerencie os serviços oferecidos</p>
          </div>
          <Link href="/dashboard/servicos/novo">
            <Button className="bg-teal-600 hover:bg-teal-700 font-bold">
              + Novo Serviço
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-black font-semibold">Carregando serviços...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicos.map((servico) => (
              <div key={servico.id} className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-black">{servico.nome}</h3>
                  <span className="text-2xl font-bold text-teal-600">
                    R$ {servico.preco.toFixed(2)}
                  </span>
                </div>
                {servico.descricao && (
                  <p className="text-gray-600 text-sm mb-4">{servico.descricao}</p>
                )}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>⏱️ {servico.duracao_minutos} min</span>
                </div>
                <div className="mt-4 pt-4 border-t flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Editar
                  </Button>
                  <Button variant="ghost" className="text-red-600 hover:text-red-700">
                    Excluir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
