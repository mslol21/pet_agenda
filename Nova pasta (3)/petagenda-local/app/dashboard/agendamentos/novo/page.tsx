// app/dashboard/agendamentos/novo/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

export default function NovoAgendamentoPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [servicos, setServicos] = useState<any[]>([])
  const [clientes, setClientes] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    cliente_id: '',
    cliente_nome: '',
    cliente_telefone: '',
    servico_id: '',
    data: '',
    hora: ''
  })

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      loadData(parsedUser.petshop.id)
    }
  }, [])

  const loadData = async (petshopId: string) => {
    try {
      // Carregar serviços
      const { data: servicosData } = await supabase
        .from('servicos')
        .select('*')
        .eq('petshop_id', petshopId)
        .eq('ativo', true)
        .order('nome')

      if (servicosData) {
        setServicos(servicosData)
      }

      // Carregar clientes
      const { data: clientesData } = await supabase
        .from('usuarios')
        .select('*')
        .eq('petshop_id', petshopId)
        .eq('role', 'cliente')
        .order('nome')

      if (clientesData) {
        setClientes(clientesData)
      }
    } catch (err) {
      console.error('Erro ao carregar dados:', err)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Se selecionou um cliente existente, preencher dados
    if (name === 'cliente_id' && value) {
      const cliente = clientes.find(c => c.id === value)
      if (cliente) {
        setFormData(prev => ({
          ...prev,
          cliente_nome: cliente.nome,
          cliente_telefone: cliente.telefone
        }))
      }
    }

    // Se limpou o cliente, limpar campos
    if (name === 'cliente_id' && !value) {
      setFormData(prev => ({
        ...prev,
        cliente_nome: '',
        cliente_telefone: ''
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (!user) {
        throw new Error('Usuário não autenticado')
      }

      if (!formData.cliente_nome || !formData.cliente_telefone) {
        throw new Error('Preencha os dados do cliente')
      }

      const dataHora = `${formData.data}T${formData.hora}:00`

      const response = await fetch('/api/agendamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          petshop_id: user.petshop.id,
          cliente_nome: formData.cliente_nome,
          cliente_telefone: formData.cliente_telefone,
          servico_id: formData.servico_id,
          data_agendamento: dataHora
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar agendamento')
      }

      alert('✅ Agendamento criado com sucesso!')
      router.push('/dashboard/agendamentos')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 8; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        slots.push(time)
      }
    }
    return slots
  }

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
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
            <Link href="/dashboard/agendamentos">
              <Button variant="ghost">← Voltar</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">Novo Agendamento</h1>
          <p className="text-lg text-black font-semibold mt-2">Agende um novo serviço para um cliente</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg font-semibold">
                {error}
              </div>
            )}

            {/* Cliente */}
            <div>
              <label className="block text-base font-bold text-black mb-2">
                Cliente Existente (opcional)
              </label>
              <select
                name="cliente_id"
                value={formData.cliente_id}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-black font-bold text-lg"
              >
                <option value="">Novo cliente ou selecione...</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nome} - {cliente.telefone}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-bold text-black mb-2">
                  Nome do Cliente *
                </label>
                <input
                  type="text"
                  name="cliente_nome"
                  value={formData.cliente_nome}
                  onChange={handleChange}
                  placeholder="Digite o nome"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-black font-bold text-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-bold text-black mb-2">
                  Telefone *
                </label>
                <input
                  type="tel"
                  name="cliente_telefone"
                  value={formData.cliente_telefone}
                  onChange={handleChange}
                  placeholder="(11) 99999-9999"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-black font-bold text-lg"
                  required
                />
              </div>
            </div>

            {/* Serviço */}
            <div>
              <label className="block text-base font-bold text-black mb-2">
                Serviço *
              </label>
              <select
                name="servico_id"
                value={formData.servico_id}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-black font-bold text-lg"
                required
              >
                <option value="">Selecione um serviço...</option>
                {servicos.map((servico) => (
                  <option key={servico.id} value={servico.id}>
                    {servico.nome} - R$ {servico.preco.toFixed(2)} ({servico.duracao_minutos} min)
                  </option>
                ))}
              </select>
            </div>

            {/* Data e Hora */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-bold text-black mb-2">
                  📆 Data *
                </label>
                <input
                  type="date"
                  name="data"
                  value={formData.data}
                  onChange={handleChange}
                  min={getMinDate()}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-black font-bold text-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-bold text-black mb-2">
                  🕐 Horário *
                </label>
                <select
                  name="hora"
                  value={formData.hora}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-black font-bold text-lg"
                  required
                >
                  <option value="">Selecione...</option>
                  {generateTimeSlots().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-teal-600 hover:bg-teal-700 font-bold text-lg py-6"
                disabled={loading}
              >
                {loading ? 'Salvando...' : '✓ Criar Agendamento'}
              </Button>
              <Link href="/dashboard/agendamentos" className="flex-1">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-2 border-gray-300 font-bold text-lg py-6"
                >
                  Cancelar
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
