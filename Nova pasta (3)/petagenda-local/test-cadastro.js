// test-cadastro.js
const axios = require('axios')

async function testCadastro() {
  console.log('🧪 Testando cadastro de novo petshop...\n')
  
  const dados = {
    nome_petshop: 'Pet Shop Teste',
    slug: 'petshopteste',
    cidade: 'São Paulo',
    telefone: '11987654321',
    email: 'teste@petshop.com',
    senha: 'teste123',
    nome_admin: 'João Teste'
  }
  
  console.log('📝 Dados do cadastro:')
  console.log(JSON.stringify(dados, null, 2))
  console.log('')
  
  try {
    console.log('📡 Enviando requisição para API...')
    const response = await axios.post('http://localhost:3000/api/auth/register', dados, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    console.log('\n' + '='.repeat(50))
    console.log('✅ CADASTRO REALIZADO COM SUCESSO!')
    console.log('='.repeat(50))
    console.log('\n📊 Resposta da API:')
    console.log(JSON.stringify(response.data, null, 2))
    
    if (response.data.petshop) {
      console.log('\n🎉 Petshop criado:')
      console.log('   ID:', response.data.petshop.id)
      console.log('   Nome:', response.data.petshop.nome)
      console.log('   Slug:', response.data.petshop.slug)
      console.log('\n🔗 Acesse: http://localhost:3000/login')
      console.log('   Telefone: 11987654321')
      console.log('   Senha: teste123')
    }
    
  } catch (error) {
    console.log('\n' + '='.repeat(50))
    console.log('❌ ERRO NO CADASTRO')
    console.log('='.repeat(50))
    
    if (error.response) {
      console.log('\n📊 Resposta da API:')
      console.log('   Status:', error.response.status)
      console.log('   Erro:', JSON.stringify(error.response.data, null, 2))
      
      if (error.response.data.error) {
        console.log('\n💡 Mensagem de erro:', error.response.data.error)
      }
      
      if (error.response.data.details) {
        console.log('\n📋 Detalhes:')
        error.response.data.details.forEach(detail => {
          console.log(`   - ${detail.path.join('.')}: ${detail.message}`)
        })
      }
    } else if (error.request) {
      console.log('\n❌ Servidor não respondeu')
      console.log('   Certifique-se que o servidor está rodando: npm run dev')
    } else {
      console.log('\n❌ Erro:', error.message)
    }
  }
}

testCadastro()
