import React, { useState } from 'react'

export default function Home({ darkMode, setDarkMode, currentTheme, setCurrentTheme, themes }) {
  const [showColorMenu, setShowColorMenu] = useState(false)

  return (
    <main className="text-gray-800 dark:text-gray-100 font-sans">
      <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm transition-colors duration-300 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-700 dark:text-primary-400 transition-colors duration-300">PetCare</h1>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-6">
              <a href="#servicos" className="hover:text-primary-700 dark:hover:text-primary-400 transition-colors">Serviços</a>
              <a href="#galeria" className="hover:text-primary-700 dark:hover:text-primary-400 transition-colors">Galeria</a>
              <a href="#localizacao" className="hover:text-primary-700 dark:hover:text-primary-400 transition-colors">Localização</a>
              <a href="#contato" className="hover:text-primary-700 dark:hover:text-primary-400 transition-colors">Contato</a>
            </nav>
            
            {/* Color Picker */}
            <div className="relative">
              <button 
                onClick={() => setShowColorMenu(!showColorMenu)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 text-gray-700 dark:text-gray-200"
                aria-label="Mudar cor do tema"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                </svg>
              </button>
              
              {showColorMenu && (
                <div className="absolute right-0 mt-2 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-xl grid grid-cols-5 gap-2 z-50 border border-gray-100 dark:border-gray-700 w-48">
                  {themes.map((t) => (
                    <button
                      key={t.name}
                      onClick={() => { setCurrentTheme(t.name); setShowColorMenu(false); }}
                      className={`w-6 h-6 rounded-full ${t.color} ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ${currentTheme === t.name ? 'ring-gray-400 dark:ring-gray-400' : 'ring-transparent'} hover:scale-110 transition-transform`}
                      title={`Tema ${t.name}`}
                      aria-label={`Selecionar tema ${t.name}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
              aria-label="Alternar tema"
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Cuidamos do seu pet com carinho</h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">Banho, tosa, hidratação e cuidados especiais. Ambiente limpo, equipe experiente e fotos do antes/depois.</p>

          <ul className="mt-6 space-y-2 text-gray-800 dark:text-gray-200">
            <li>• Banho simples — 40 min</li>
            <li>• Tosa higiênica — 30 min</li>
            <li>• Pacotes mensais com desconto</li>
          </ul>

          <div className="mt-6 flex gap-3">
            <a href="https://wa.me/55119XXXXXXXX?text=Ol%C3%A1%2C+gostaria+de+agendar+um+servi%C3%A7o" target="_blank" rel="noreferrer" className="px-5 py-3 rounded-lg bg-primary-700 text-white font-semibold hover:bg-primary-800 transition">Agendar no WhatsApp</a>
            <a href="#servicos" className="px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition">Ver serviços</a>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden shadow-lg">
          <img src="/hero-pet.png" alt="pet feliz" className="w-full h-72 object-cover"/>
        </div>
      </section>

      <section id="servicos" className="max-w-5xl mx-auto px-6 py-8">
        <h3 className="text-xl font-bold mb-4 dark:text-white">Serviços</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition"> <strong className="dark:text-white">Banho simples</strong><p className="text-sm text-gray-600 dark:text-gray-400">R$ 60 — 40 min</p></div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition"> <strong className="dark:text-white">Tosa completa</strong><p className="text-sm text-gray-600 dark:text-gray-400">R$ 120 — 1h</p></div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition"> <strong className="dark:text-white">Hidratação</strong><p className="text-sm text-gray-600 dark:text-gray-400">R$ 80 — 50 min</p></div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition"> <strong className="dark:text-white">Vacinação</strong><p className="text-sm text-gray-600 dark:text-gray-400">Agendamento e lembretes</p></div>
        </div>
      </section>

      <section id="galeria" className="max-w-5xl mx-auto px-6 py-8">
        <h3 className="text-xl font-bold mb-4 dark:text-white">Antes e depois</h3>
        <div className="grid grid-cols-2 gap-3">
          <img src="/gallery1.png" className="w-full h-64 object-contain bg-gray-100 dark:bg-gray-800 rounded hover:opacity-90 transition"/>
          <img src="/gallery2.png" className="w-full h-64 object-contain bg-gray-100 dark:bg-gray-800 rounded hover:opacity-90 transition"/>
        </div>
      </section>

      <section id="localizacao" className="max-w-5xl mx-auto px-6 py-8">
        <h3 className="text-xl font-bold mb-4 dark:text-white">Nossa Localização</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
            <h4 className="text-lg font-semibold mb-4 text-primary-700 dark:text-primary-400">Endereço</h4>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-700 dark:text-primary-400 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium">Av. Exemplo, 123</p>
                  <p className="text-sm">São Paulo, SP - CEP 01234-567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-700 dark:text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <p>(11) 9XXXX-XXXX</p>
              </div>
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-700 dark:text-primary-400 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium">Horário de Funcionamento</p>
                  <p className="text-sm">Segunda a Sábado: 9h - 19h</p>
                  <p className="text-sm">Domingo: Fechado</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-lg h-80">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0983988647844!2d-46.65825668502243!3d-23.561684184682447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1637012345678!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da PetCare"
            ></iframe>
          </div>
        </div>
      </section>

      <footer id="contato" className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-8 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <h4 className="font-bold text-lg dark:text-white">PetCare</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Av. Exemplo, 123 — Aberto 9h–19h</p>
            <p className="text-sm mt-2 dark:text-gray-300">📞 (11) 9XXXX-XXXX</p>
          </div>
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium mb-2 dark:text-white">Agende pelo WhatsApp</label>
            <a href="https://wa.me/55119XXXXXXXX?text=Ol%C3%A1%2C+quero+agendar+um+banho" className="inline-block w-full text-center px-4 py-3 rounded-lg bg-primary-700 text-white hover:bg-primary-800 transition">Abrir WhatsApp</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
