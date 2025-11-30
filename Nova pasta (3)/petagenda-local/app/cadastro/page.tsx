// app/cadastro/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function CadastroPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nome_petshop: '',
    slug: '',
    cidade: '',
    telefone: '',
    email: '',
    senha: '',
    nome_admin: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Auto-gerar slug a partir do nome do petshop
    if (name === 'nome_petshop') {
      const slug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
      setFormData(prev => ({ ...prev, slug }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao cadastrar')
      }

      // Redirecionar para login
      router.push('/login?success=true')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-12 px-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <span className="text-3xl">🐕</span>
            <span className="text-2xl font-bold text-teal-600">PetAgenda Local</span>
          </Link>
          <h1 className="text-3xl font-bold text-black mt-4">Cadastrar Petshop</h1>
          <p className="text-black font-semibold mt-2 text-lg">Comece grátis em 2 minutos</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-bold text-black mb-2">
                  Nome do Petshop *
                </label>
                <input
                  type="text"
                  name="nome_petshop"
                  value={formData.nome_petshop}
                  onChange={handleChange}
                  placeholder="Ex: Amigo Fiel Pet Shop"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-black font-bold text-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-bold text-black mb-2">
                  URL Personalizada *
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-black">petagenda.app/</span>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="amigofiel"
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-black font-bold text-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-base font-bold text-black mb-2">
                  Cidade *
                </label>
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  placeholder="Ex: Guaianases"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-black font-bold text-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-bold text-black mb-2">
                  Telefone *
                </label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(11) 99999-9999"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-black font-bold text-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-bold text-black mb-2">
                  Email (opcional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="contato@petshop.com"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-black font-bold text-lg"
                />
              </div>

              <div>
                <label className="block text-base font-bold text-black mb-2">
                  Seu Nome *
                </label>
                <input
                  type="text"
                  name="nome_admin"
                  value={formData.nome_admin}
                  onChange={handleChange}
                  placeholder="Ex: Carlos Silva"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-black font-bold text-lg"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-base font-bold text-black mb-2">
                  Senha *
                </label>
                <input
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-black font-bold text-lg"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700"
              disabled={loading}
            >
              {loading ? 'Cadastrando...' : 'Cadastrar Grátis'}
            </Button>

            <p className="text-sm text-black font-semibold text-center">
              Ao cadastrar, você concorda com nossos Termos de Uso e Política de Privacidade
            </p>
          </form>

          <div className="mt-6 text-center">
            <p className="text-base text-black font-semibold">
              Já tem uma conta?{' '}
              <Link href="/login" className="text-teal-600 hover:text-teal-700 font-bold">
                Fazer login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
