// test-agendamento.js
const axios = require('axios')

async function testAgendamento() {
  console.log('🧪 Testando criação de agendamento...\n')
  
  // Primeiro, vamos buscar um petshop e serviço existente
  const petshopId = '00000000-0000-0000-0000-000000000000' // Substitua pelo ID real
  const servicoId = '00000000-0000-0000-0000-000000000000' // Substitua pelo ID real
  
  const dados = {
    petshop_id: petshopId,
    cliente_nome: 'João Teste',
    cliente_telefone: '11999998888',
    servico_id: servicoId,
    data_agendamento: '2024-12-01T14:00:00'
  }
  
  console.log('📝 Dados do agendamento:')
  console.log(JSON.stringify(dados, null, 2))
  console.log('')
  
  try {
    console.log('📡 Enviando requisição para API...')
    console.log('🔗 URL: http://localhost:3003/api/agendamentos')
    console.log('')
    
    const response = await axios.post('http://localhost:3003/api/agendamentos', dados, {
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
      console.log('✅ AGENDAMENTO CRIADO COM SUCESSO!')
      console.log('==================================================')
    } else {
      console.log('\n❌ ERRO AO CRIAR AGENDAMENTO')
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

console.log('⚠️  IMPORTANTE: Antes de rodar este teste:')
console.log('1. Abra o Supabase e pegue o ID de um petshop')
console.log('2. Pegue o ID de um serviço')
console.log('3. Substitua os IDs no código acima')
console.log('4. Rode: node test-agendamento.js')
console.log('')

// testAgendamento()
