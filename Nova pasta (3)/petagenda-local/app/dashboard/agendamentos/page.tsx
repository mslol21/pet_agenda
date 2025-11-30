// app/dashboard/agendamentos/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AgendamentosPage() {
  const [user, setUser] = useState<any>(null)
  const [agendamentos, setAgendamentos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filtroStatus, setFiltroStatus] = useState('todos')

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      loadAgendamentos(parsedUser.petshop.id)
    }
  }, [filtroStatus])

  const loadAgendamentos = async (petshopId: string) => {
    try {
      setLoading(true)
      const url = `/api/agendamentos?petshop_id=${petshopId}&status=${filtroStatus}`
      const response = await fetch(url)
      const data = await response.json()

      if (data.success) {
        setAgendamentos(data.agendamentos)
      }
    } catch (err) {
      console.error('Erro ao carregar agendamentos:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/agendamentos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })

      const data = await response.json()

      if (data.success) {
        // Abrir WhatsApp se houver informações
        if (data.whatsapp) {
          const telefone = data.whatsapp.telefone.replace(/\D/g, '')
          const mensagem = encodeURIComponent(data.whatsapp.mensagem)
          const whatsappUrl = `https://wa.me/55${telefone}?text=${mensagem}`
          
          // Abrir WhatsApp em nova aba
          window.open(whatsappUrl, '_blank')
        }

        // Recarregar agendamentos
        if (user) {
          loadAgendamentos(user.petshop.id)
        }
        
        const statusTexto = status === 'confirmado' ? 'confirmado' : 'cancelado'
        alert(
          `✅ Agendamento ${statusTexto} com sucesso!\n\n` +
          `📱 WhatsApp aberto para notificar o cliente.`
        )
      } else {
        throw new Error(data.error)
      }
    } catch (err: any) {
      alert('❌ Erro: ' + err.message)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'bg-yellow-100 border-yellow-300 text-yellow-900'
      case 'confirmado':
        return 'bg-green-100 border-green-300 text-green-900'
      case 'cancelado':
        return 'bg-red-100 border-red-300 text-red-900'
      default:
        return 'bg-gray-100 border-gray-300 text-gray-900'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pendente':
        return '🟡 Pendente'
      case 'confirmado':
        return '🟢 Confirmado'
      case 'cancelado':
        return '🔴 Cancelado'
      default:
        return status
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
            <h1 className="text-3xl font-bold text-black">Agendamentos</h1>
            <p className="text-lg text-black font-semibold mt-2">Gerencie todos os agendamentos</p>
          </div>
          <Link href="/dashboard/agendamentos/novo">
            <Button className="bg-teal-600 hover:bg-teal-700 font-bold">
              + Novo Agendamento
            </Button>
          </Link>
        </div>

        {/* Filtros */}
        <div className="mb-6 flex gap-3">
          <Button
            onClick={() => setFiltroStatus('todos')}
            variant={filtroStatus === 'todos' ? 'default' : 'outline'}
            className={filtroStatus === 'todos' ? 'bg-teal-600 hover:bg-teal-700' : 'border-2'}
          >
            Todos ({agendamentos.length})
          </Button>
          <Button
            onClick={() => setFiltroStatus('pendente')}
            variant={filtroStatus === 'pendente' ? 'default' : 'outline'}
            className={filtroStatus === 'pendente' ? 'bg-yellow-600 hover:bg-yellow-700' : 'border-2'}
          >
            🟡 Pendentes
          </Button>
          <Button
            onClick={() => setFiltroStatus('confirmado')}
            variant={filtroStatus === 'confirmado' ? 'default' : 'outline'}
            className={filtroStatus === 'confirmado' ? 'bg-green-600 hover:bg-green-700' : 'border-2'}
          >
            🟢 Confirmados
          </Button>
          <Button
            onClick={() => setFiltroStatus('cancelado')}
            variant={filtroStatus === 'cancelado' ? 'default' : 'outline'}
            className={filtroStatus === 'cancelado' ? 'bg-red-600 hover:bg-red-700' : 'border-2'}
          >
            🔴 Cancelados
          </Button>
        </div>

        {/* Lista de Agendamentos */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-xl text-black font-bold">Carregando agendamentos...</p>
          </div>
        ) : agendamentos.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center border-2 border-gray-200">
            <div className="text-6xl mb-4">📅</div>
            <h2 className="text-2xl font-bold text-black mb-2">Nenhum agendamento encontrado</h2>
            <p className="text-lg text-black font-semibold mb-6">
              {filtroStatus === 'todos' 
                ? 'Comece criando um novo agendamento'
                : `Não há agendamentos com status "${filtroStatus}"`
              }
            </p>
            <Link href="/dashboard/agendamentos/novo">
              <Button className="bg-teal-600 hover:bg-teal-700 font-bold">
                + Criar Primeiro Agendamento
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {agendamentos.map((agendamento) => (
              <div
                key={agendamento.id}
                className={`rounded-xl shadow-lg p-6 border-2 ${getStatusColor(agendamento.status)}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold">{agendamento.cliente?.nome}</h3>
                      <span className="px-3 py-1 rounded-full text-sm font-bold bg-white">
                        {getStatusBadge(agendamento.status)}
                      </span>
                    </div>
                    <p className="text-base font-semibold">📞 {agendamento.cliente?.telefone}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">{agendamento.servico?.nome}</p>
                    <p className="text-2xl font-bold text-teal-600">
                      R$ {agendamento.servico?.preco.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-base font-bold">
                    <span>📆</span>
                    <span>{new Date(agendamento.data_agendamento).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-base font-bold">
                    <span>🕐</span>
                    <span>{new Date(agendamento.data_agendamento).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-base font-bold">
                    <span>⏱️</span>
                    <span>{agendamento.servico?.duracao_minutos} minutos</span>
                  </div>
                </div>

                {agendamento.status === 'pendente' && (
                  <div className="flex gap-3 mt-4 pt-4 border-t-2">
                    <Button
                      onClick={() => handleUpdateStatus(agendamento.id, 'confirmado')}
                      className="flex-1 bg-green-600 hover:bg-green-700 font-bold"
                    >
                      ✓ Confirmar
                    </Button>
                    <Button
                      onClick={() => handleUpdateStatus(agendamento.id, 'cancelado')}
                      className="flex-1 bg-red-600 hover:bg-red-700 font-bold"
                    >
                      ✕ Cancelar
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
