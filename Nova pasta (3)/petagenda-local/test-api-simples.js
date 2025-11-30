// test-api-simples.js
// Teste direto do Supabase sem passar pela API Next.js

const { createClient } = require('@supabase/supabase-js')
const bcrypt = require('bcryptjs')

const supabaseUrl = 'https://fjfuwvhbhpmsfxetlpwn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqZnV3dmhiaHBtc2Z4ZXRscHduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNjMxODksImV4cCI6MjA3OTkzOTE4OX0.RzgFq9QV0qvLNJm7PZ4ATWcEmWkLOsQZrEzoSczfE9A'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testCadastroDirecto() {
  console.log('🧪 Testando cadastro DIRETO no Supabase...\n')
  
  const dados = {
    nome_petshop: 'Pet Shop Direto',
    slug: 'petshopdireto',
    cidade: 'Rio de Janeiro',
    telefone: '21987654321',
    email: 'direto@petshop.com',
    senha: 'teste123',
    nome_admin: 'Admin Direto'
  }
  
  try {
    // 1. Criar petshop
    console.log('1️⃣ Criando petshop...')
    const { data: petshop, error: petshopError } = await supabase
      .from('petshops')
      .insert({
        slug: dados.slug,
        nome: dados.nome_petshop,
        telefone: dados.telefone,
        email: dados.email,
        cidade: dados.cidade,
        plano_atual: 'free',
        configuracoes: {
          horario_funcionamento: {
            segunda: { inicio: '08:00', fim: '18:00' }
          }
        }
      })
      .select()
      .single()
    
    if (petshopError) {
      console.error('❌ Erro ao criar petshop:', petshopError)
      return
    }
    
    console.log('✅ Petshop criado:', petshop.nome)
    console.log('   ID:', petshop.id)
    
    // 2. Criar admin
    console.log('\n2️⃣ Criando admin...')
    const senhaHash = await bcrypt.hash(dados.senha, 10)
    
    const { data: admin, error: adminError } = await supabase
      .from('usuarios')
      .insert({
        petshop_id: petshop.id,
        nome: dados.nome_admin,
        telefone: dados.telefone,
        email: dados.email,
        senha_hash: senhaHash,
        role: 'admin'
      })
      .select()
      .single()
    
    if (adminError) {
      console.error('❌ Erro ao criar admin:', adminError)
      return
    }
    
    console.log('✅ Admin criado:', admin.nome)
    
    // 3. Criar plano
    console.log('\n3️⃣ Criando plano free...')
    const { error: planoError } = await supabase
      .from('planos_assinatura')
      .insert({
        petshop_id: petshop.id,
        plano: 'free',
        valor: 0,
        inicio_em: new Date().toISOString()
      })
    
    if (planoError) {
      console.error('❌ Erro ao criar plano:', planoError)
      return
    }
    
    console.log('✅ Plano criado')
    
    console.log('\n' + '='.repeat(50))
    console.log('🎉 CADASTRO COMPLETO COM SUCESSO!')
    console.log('='.repeat(50))
    console.log('\n📋 Credenciais:')
    console.log('   Telefone:', dados.telefone)
    console.log('   Senha:', dados.senha)
    console.log('   Slug:', dados.slug)
    console.log('\n🔗 Acesse: http://localhost:3000/login')
    
  } catch (error) {
    console.error('\n❌ ERRO:', error.message)
    console.error('Stack:', error.stack)
  }
}

testCadastroDirecto()
