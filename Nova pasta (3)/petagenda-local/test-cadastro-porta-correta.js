// test-cadastro-porta-correta.js
const axios = require('axios')

async function testCadastroPortaCorreta() {
  console.log('🧪 Testando cadastro na porta CORRETA (3003)...\n')
  
  const dados = {
    nome_petshop: 'Pet Shop Teste 3',
    slug: 'petshopteste3',
    cidade: 'Belo Horizonte',
    telefone: '31987654321',
    email: 'teste3@petshop.com',
    senha: 'teste123',
    nome_admin: 'Carlos Teste'
  }
  
  console.log('📝 Dados do cadastro:')
  console.log(JSON.stringify(dados, null, 2))
  console.log('')
  
  try {
    console.log('📡 Enviando requisição para API...')
    console.log('🔗 URL: http://localhost:3003/api/auth/register')
    console.log('')
    
    const response = await axios.post('http://localhost:3003/api/auth/register', dados, {
      headers: {
        'Content-Type': 'application/json'
      },
      validateStatus: function (status) {
        return true
      }
    })
    
    console.log('📊 Status da resposta:', response.status)
    console.log('📊 Dados da resposta:')
    console.log(JSON.stringify(response.data, null, 2))
    
    if (response.status === 201) {
      console.log('\n' + '='.repeat(50))
      console.log('✅ CADASTRO REALIZADO COM SUCESSO!')
      console.log('='.repeat(50))
      console.log('\n📋 Petshop criado:')
      console.log('   ID:', response.data.petshop.id)
      console.log('   Nome:', response.data.petshop.nome)
      console.log('   Slug:', response.data.petshop.slug)
      console.log('\n🔗 Acesse: http://localhost:3003/login')
      console.log('   Telefone:', dados.telefone)
      console.log('   Senha:', dados.senha)
    } else {
      console.log('\n❌ ERRO NO CADASTRO')
      console.log('Status:', response.status)
      console.log('Detalhes:', response.data)
    }
    
  } catch (error) {
    console.log('\n❌ ERRO NA REQUISIÇÃO')
    console.log('Mensagem:', error.message)
    
    if (error.response) {
      console.log('Status:', error.response.status)
      console.log('Data:', error.response.data)
    }
  }
}

testCadastroPortaCorreta()
