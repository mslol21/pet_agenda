// app/dashboard/servicos/novo/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

export default function NovoServicoPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    duracao_minutos: '60'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const userData = localStorage.getItem('user')
      if (!userData) {
        throw new Error('Usuário não autenticado')
      }

      const user = JSON.parse(userData)
      const petshopId = user.petshop.id

      const { data, error: insertError } = await supabase
        .from('servicos')
        .insert({
          petshop_id: petshopId,
          nome: formData.nome,
          descricao: formData.descricao || null,
          preco: parseFloat(formData.preco),
          duracao_minutos: parseInt(formData.duracao_minutos),
          ativo: true
        })
        .select()
        .single()

      if (insertError) {
        throw new Error(insertError.message)
      }

      // Redirecionar para lista de serviços
      router.push('/dashboard/servicos')
    } catch (err: any) {
      setError(err.message)
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
            <Link href="/dashboard/servicos">
              <Button variant="ghost">← Voltar</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">Novo Serviço</h1>
          <p className="text-lg text-black font-semibold mt-2">Cadastre um novo serviço oferecido</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg font-semibold">
                {error}
              </div>
            )}

            <div>
              <label className="block text-base font-bold text-black mb-2">
                Nome do Serviço *
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Ex: Banho e Tosa"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-black font-bold text-lg"
                required
              />
            </div>

            <div>
              <label className="block text-base font-bold text-black mb-2">
                Descrição (opcional)
              </label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                placeholder="Descreva o serviço..."
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-black font-semibold text-base"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-bold text-black mb-2">
                  Preço (R$) *
                </label>
                <input
                  type="number"
                  name="preco"
                  value={formData.preco}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-black font-bold text-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-bold text-black mb-2">
                  Duração (minutos) *
                </label>
                <select
                  name="duracao_minutos"
                  value={formData.duracao_minutos}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-black font-bold text-lg"
                  required
                >
                  <option value="30">30 minutos</option>
                  <option value="60">60 minutos</option>
                  <option value="90">90 minutos</option>
                  <option value="120">120 minutos</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                className="flex-1 bg-teal-600 hover:bg-teal-700 font-bold text-lg py-6"
                disabled={loading}
              >
                {loading ? 'Salvando...' : '✓ Salvar Serviço'}
              </Button>
              <Link href="/dashboard/servicos" className="flex-1">
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
