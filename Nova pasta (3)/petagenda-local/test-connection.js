// test-connection.js
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://fjfuwvhbhpmsfxetlpwn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqZnV3dmhiaHBtc2Z4ZXRscHduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNjMxODksImV4cCI6MjA3OTkzOTE4OX0.RzgFq9QV0qvLNJm7PZ4ATWcEmWkLOsQZrEzoSczfE9A'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log('🧪 Testando conexão com Supabase...\n')
  console.log('📍 URL:', supabaseUrl)
  console.log('🔑 Key:', supabaseKey.substring(0, 50) + '...\n')
  
  try {
    // Teste 1: Listar tabelas
    console.log('📋 Teste 1: Listando petshops...')
    const { data: petshops, error: error1 } = await supabase
      .from('petshops')
      .select('*')
      .limit(5)
    
    if (error1) {
      console.error('❌ Erro ao listar petshops:', error1.message)
      console.error('   Detalhes:', error1)
    } else {
      console.log('✅ Petshops encontrados:', petshops ? petshops.length : 0)
      if (petshops && petshops.length > 0) {
        console.log('   Primeiro:', petshops[0].nome)
      }
    }
    
    console.log('')
    
    // Teste 2: Listar usuários
    console.log('👥 Teste 2: Listando usuários...')
    const { data: usuarios, error: error2 } = await supabase
      .from('usuarios')
      .select('*')
      .limit(5)
    
    if (error2) {
      console.error('❌ Erro ao listar usuários:', error2.message)
    } else {
      console.log('✅ Usuários encontrados:', usuarios ? usuarios.length : 0)
      if (usuarios && usuarios.length > 0) {
        console.log('   Primeiro:', usuarios[0].nome)
      }
    }
    
    console.log('')
    
    // Teste 3: Listar serviços
    console.log('🛠️  Teste 3: Listando serviços...')
    const { data: servicos, error: error3 } = await supabase
      .from('servicos')
      .select('*')
      .limit(5)
    
    if (error3) {
      console.error('❌ Erro ao listar serviços:', error3.message)
    } else {
      console.log('✅ Serviços encontrados:', servicos ? servicos.length : 0)
      if (servicos && servicos.length > 0) {
        servicos.forEach(s => console.log(`   - ${s.nome}: R$ ${s.preco}`))
      }
    }
    
    console.log('\n' + '='.repeat(50))
    console.log('✅ CONEXÃO COM SUPABASE FUNCIONANDO!')
    console.log('='.repeat(50))
    
  } catch (err) {
    console.log('\n' + '='.repeat(50))
    console.error('❌ ERRO NA CONEXÃO:', err.message)
    console.error('   Stack:', err.stack)
    console.log('='.repeat(50))
  }
}

testConnection()
