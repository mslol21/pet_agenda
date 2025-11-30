// app/[slug]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

export default function PetshopPublicPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [petshop, setPetshop] = useState<any>(null)
  const [servicos, setServicos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // Estados do agendamento
  const [showAgendamento, setShowAgendamento] = useState(false)
  const [selectedServico, setSelectedServico] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [clienteNome, setClienteNome] = useState('')
  const [clienteTelefone, setClienteTelefone] = useState('')

  useEffect(() => {
    loadPetshopData()
  }, [slug])

  const loadPetshopData = async () => {
    try {
      const { data: petshopData, error: petshopError } = await supabase
        .from('petshops')
        .select('*')
        .eq('slug', slug)
        .single()

      if (petshopError || !petshopData) {
        setError('Petshop não encontrado')
        setLoading(false)
        return
      }

      setPetshop(petshopData)

      const { data: servicosData, error: servicosError } = await supabase
        .from('servicos')
        .select('*')
        .eq('petshop_id', petshopData.id)
        .eq('ativo', true)
        .order('preco')

      if (!servicosError && servicosData) {
        setServicos(servicosData)
      }

      setLoading(false)
    } catch (err) {
      console.error('Erro ao carregar dados:', err)
      setError('Erro ao carregar dados do petshop')
      setLoading(false)
    }
  }

  const handleSelectServico = (servico: any) => {
    setSelectedServico(servico)
    setShowAgendamento(true)
    // Scroll suave para o formulário
    setTimeout(() => {
      document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
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

  const handleAgendar = async () => {
    if (!clienteNome || !clienteTelefone || !selectedDate || !selectedTime) {
      alert('Por favor, preencha todos os campos')
      return
    }

    try {
      // Criar data/hora completa
      const dataHora = `${selectedDate}T${selectedTime}:00`

      // Salvar no banco
      const response = await fetch('/api/agendamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          petshop_id: petshop.id,
          cliente_nome: clienteNome,
          cliente_telefone: clienteTelefone,
          servico_id: selectedServico.id,
          data_agendamento: dataHora
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao criar agendamento')
      }

      // Mensagem de sucesso detalhada
      const dataFormatada = new Date(selectedDate + 'T00:00').toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })

      alert(
        `✅ AGENDAMENTO CONFIRMADO COM SUCESSO!\n\n` +
        `📅 Serviço: ${selectedServico.nome}\n` +
        `💰 Valor: R$ ${selectedServico.preco.toFixed(2)}\n` +
        `📆 Data: ${dataFormatada}\n` +
        `🕐 Horário: ${selectedTime}\n` +
        `⏱️ Duração: ${selectedServico.duracao_minutos} minutos\n\n` +
        `👤 Cliente: ${clienteNome}\n` +
        `📱 Telefone: ${clienteTelefone}\n\n` +
        `🟡 Status: PENDENTE\n\n` +
        `Aguarde a confirmação do ${petshop.nome}.\n` +
        `Você receberá um contato em breve!`
      )

      // Limpar formulário
      setClienteNome('')
      setClienteTelefone('')
      setSelectedDate('')
      setSelectedTime('')
      setShowAgendamento(false)

      // Scroll para o topo
      window.scrollTo({ top: 0, behavior: 'smooth' })

    } catch (error: any) {
      alert('❌ Erro ao criar agendamento:\n\n' + error.message)
    }
  }

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-2xl text-black font-bold">Carregando...</p>
        </div>
      </div>
    )
  }

  if (error || !petshop) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-3xl font-bold text-black mb-4">Petshop não encontrado</h1>
          <p className="text-lg text-black font-semibold mb-6">
            O petshop que você está procurando não existe ou foi removido.
          </p>
          <Link href="/">
            <Button className="bg-teal-600 hover:bg-teal-700">Voltar para Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const horarios = petshop.configuracoes?.horario_funcionamento || {}

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="text-5xl">🐕</div>
            <div>
              <h1 className="text-4xl font-bold text-black">{petshop.nome}</h1>
              <p className="text-lg text-black font-semibold mt-1">
                📍 {petshop.cidade} • 📞 {petshop.telefone}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Serviços */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-black mb-8">Nossos Serviços</h2>
          
          {servicos.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center border-2 border-gray-200">
              <div className="text-6xl mb-4">🛠️</div>
              <p className="text-xl text-black font-bold">
                Este petshop ainda não cadastrou serviços.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicos.map((servico) => (
                <div key={servico.id} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border-2 border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-black">{servico.nome}</h3>
                    <span className="text-3xl font-bold text-teal-600">
                      R$ {servico.preco.toFixed(2)}
                    </span>
                  </div>
                  {servico.descricao && (
                    <p className="text-base text-black font-semibold mb-4">{servico.descricao}</p>
                  )}
                  <div className="flex items-center gap-2 text-base text-black font-semibold mb-4">
                    <span>⏱️</span>
                    <span>{servico.duracao_minutos} minutos</span>
                  </div>
                  <Button
                    onClick={() => handleSelectServico(servico)}
                    className="w-full bg-teal-600 hover:bg-teal-700 font-bold"
                  >
                    📅 Agendar Este Serviço
                  </Button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Formulário de Agendamento */}
        {showAgendamento && selectedServico && (
          <section id="agendamento" className="mb-12 scroll-mt-20">
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-6">📅 Agendar: {selectedServico.nome}</h2>
              
              <div className="bg-white rounded-lg p-6 text-black space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-bold mb-2">
                      Seu Nome *
                    </label>
                    <input
                      type="text"
                      value={clienteNome}
                      onChange={(e) => setClienteNome(e.target.value)}
                      placeholder="Digite seu nome"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-black font-bold text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-base font-bold mb-2">
                      Seu Telefone *
                    </label>
                    <input
                      type="tel"
                      value={clienteTelefone}
                      onChange={(e) => setClienteTelefone(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-black font-bold text-lg"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-bold mb-2">
                      📆 Escolha a Data *
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={getMinDate()}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-black font-bold text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-base font-bold mb-2">
                      🕐 Escolha o Horário *
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-black font-bold text-lg"
                    >
                      <option value="">Selecione um horário</option>
                      {generateTimeSlots().map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="bg-teal-50 border-2 border-teal-300 rounded-lg p-4">
                  <p className="text-base font-bold text-teal-900">
                    💰 Valor: R$ {selectedServico.preco.toFixed(2)} • ⏱️ Duração: {selectedServico.duracao_minutos} min
                  </p>
                </div>

                <Button
                  onClick={handleAgendar}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xl py-6"
                >
                  ✅ Confirmar Agendamento
                </Button>

                <Button
                  onClick={() => setShowAgendamento(false)}
                  variant="outline"
                  className="w-full border-2 border-gray-300 font-bold"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Horário de Funcionamento */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-black mb-8">Horário de Funcionamento</h2>
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200">
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(horarios).map(([dia, horario]: [string, any]) => (
                <div key={dia} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border-2 border-gray-300">
                  <span className="text-lg font-bold text-black capitalize">{dia}</span>
                  <span className="text-lg font-bold text-teal-600">
                    {horario.inicio} - {horario.fim}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-base text-black font-semibold">
            Powered by{' '}
            <Link href="/" className="text-teal-600 hover:text-teal-700 font-bold">
              PetAgenda Local
            </Link>
          </p>
        </footer>
      </div>
    </div>
  )
}
