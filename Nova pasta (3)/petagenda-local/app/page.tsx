// app/page.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Navbar */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐕</span>
              <span className="text-xl font-bold text-teal-600">PetAgenda Local</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/cadastro">
                <Button>Cadastrar Grátis</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-black mb-6">
            Seu petshop organizado,<br />
            <span className="text-teal-600">seus clientes felizes</span>
          </h1>
          <p className="text-2xl text-black font-semibold mb-8 max-w-2xl mx-auto">
            Sistema de agendamento online feito especialmente para petshops e clínicas veterinárias de regiões populares.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/cadastro">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                Começar Grátis
              </Button>
            </Link>
            <Link href="#como-funciona">
              <Button size="lg" variant="outline">
                Ver Demo
              </Button>
            </Link>
          </div>
          <p className="text-base text-black font-bold mt-4">
            ✓ Grátis até 30 agendamentos/mês  ✓ Sem cartão de crédito  ✓ Cancele quando quiser
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">Como Funciona</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-2xl font-bold mb-2 text-black">1. Cadastre seu petshop</h3>
            <p className="text-lg text-black font-semibold">Configure seus serviços e horários em 2 minutos</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-2xl font-bold mb-2 text-black">2. Compartilhe o link</h3>
            <p className="text-lg text-black font-semibold">Seus clientes agendam pelo celular 24/7</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-2xl font-bold mb-2 text-black">3. Receba confirmações</h3>
            <p className="text-lg text-black font-semibold">Lembretes automáticos no WhatsApp</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">Planos Acessíveis</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Free */}
          <div className="border rounded-xl p-8 bg-white">
            <h3 className="text-2xl font-bold mb-2 text-black">Free</h3>
            <p className="text-4xl font-bold mb-4 text-black">R$ 0<span className="text-lg text-black font-semibold">/mês</span></p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-black font-semibold text-base">
                <span className="text-teal-600">✓</span> Até 30 agendamentos/mês
              </li>
              <li className="flex items-center gap-2 text-black font-semibold text-base">
                <span className="text-teal-600">✓</span> 1 usuário
              </li>
              <li className="flex items-center gap-2 text-black font-semibold text-base">
                <span className="text-teal-600">✓</span> Agenda básica
              </li>
            </ul>
            <Link href="/cadastro">
              <Button className="w-full" variant="outline">Começar Grátis</Button>
            </Link>
          </div>

          {/* Básico */}
          <div className="border-2 border-teal-600 rounded-xl p-8 bg-white relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-4 py-1 rounded-full text-sm">
              Mais Popular
            </div>
            <h3 className="text-2xl font-bold mb-2 text-black">Básico</h3>
            <p className="text-4xl font-bold mb-4 text-black">R$ 49,90<span className="text-lg text-black font-semibold">/mês</span></p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-black font-semibold text-base">
                <span className="text-teal-600">✓</span> Agendamentos ilimitados
              </li>
              <li className="flex items-center gap-2 text-black font-semibold text-base">
                <span className="text-teal-600">✓</span> 2 usuários
              </li>
              <li className="flex items-center gap-2 text-black font-semibold text-base">
                <span className="text-teal-600">✓</span> Lembretes WhatsApp
              </li>
              <li className="flex items-center gap-2 text-black font-semibold text-base">
                <span className="text-teal-600">✓</span> Relatórios
              </li>
            </ul>
            <Link href="/cadastro">
              <Button className="w-full bg-teal-600 hover:bg-teal-700">Começar Agora</Button>
            </Link>
          </div>

          {/* Premium */}
          <div className="border rounded-xl p-8 bg-white">
            <h3 className="text-2xl font-bold mb-2 text-black">Premium</h3>
            <p className="text-4xl font-bold mb-4 text-black">R$ 99,90<span className="text-lg text-black font-semibold">/mês</span></p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-black font-semibold text-base">
                <span className="text-teal-600">✓</span> Tudo do Básico +
              </li>
              <li className="flex items-center gap-2 text-black font-semibold text-base">
                <span className="text-teal-600">✓</span> Usuários ilimitados
              </li>
              <li className="flex items-center gap-2 text-black font-semibold text-base">
                <span className="text-teal-600">✓</span> PIX integrado
              </li>
              <li className="flex items-center gap-2 text-black font-semibold text-base">
                <span className="text-teal-600">✓</span> Fidelidade
              </li>
            </ul>
            <Link href="/cadastro">
              <Button className="w-full" variant="outline">Começar Agora</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-black">
          <p className="font-semibold">© 2024 PetAgenda Local. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
