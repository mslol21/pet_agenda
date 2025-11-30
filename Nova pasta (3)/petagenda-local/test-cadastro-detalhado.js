// test-cadastro-detalhado.js
const axios = require('axios')

async function testCadastroDetalhado() {
  console.log('🧪 Testando cadastro com detalhes completos...\n')
  
  const dados = {
    nome_petshop: 'Pet Shop Teste 2',
    slug: 'petshopteste2',
    cidade: 'São Paulo',
    telefone: '11987654322',
    email: 'teste2@petshop.com',
    senha: 'teste123',
    nome_admin: 'Maria Teste'
  }
  
  console.log('📝 Dados do cadastro:')
  console.log(JSON.stringify(dados, null, 2))
  console.log('')
  
  try {
    console.log('📡 Enviando requisição para API...')
    console.log('🔗 URL: http://localhost:3000/api/auth/register')
    console.log('')
    
    const response = await axios.post('http://localhost:3000/api/auth/register', dados, {
      headers: {
        'Content-Type': 'application/json'
      },
      validateStatus: function (status) {
        return true // Aceitar qualquer status para ver o erro
      }
    })
    
    console.log('📊 Status da resposta:', response.status)
    console.log('📊 Headers:', JSON.stringify(response.headers, null, 2))
    console.log('📊 Dados da resposta:')
    console.log(JSON.stringify(response.data, null, 2))
    
    if (response.status === 201) {
      console.log('\n✅ CADASTRO REALIZADO COM SUCESSO!')
    } else {
      console.log('\n❌ ERRO NO CADASTRO')
      console.log('Detalhes do erro:', response.data)
    }
    
  } catch (error) {
    console.log('\n❌ ERRO NA REQUISIÇÃO')
    console.log('Tipo de erro:', error.constructor.name)
    console.log('Mensagem:', error.message)
    
    if (error.response) {
      console.log('\nResposta do servidor:')
      console.log('  Status:', error.response.status)
      console.log('  Headers:', error.response.headers)
      console.log('  Data:', error.response.data)
    } else if (error.request) {
      console.log('\nNenhuma resposta recebida')
      console.log('Request:', error.request)
    } else {
      console.log('\nErro ao configurar requisição:', error.message)
    }
    
    if (error.stack) {
      console.log('\nStack trace:')
      console.log(error.stack)
    }
  }
}

testCadastroDetalhado()
