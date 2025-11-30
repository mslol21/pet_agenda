// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Limpar dados existentes
  await prisma.logWhatsapp.deleteMany()
  await prisma.planoAssinatura.deleteMany()
  await prisma.transacaoPix.deleteMany()
  await prisma.historicoAtendimento.deleteMany()
  await prisma.agendamento.deleteMany()
  await prisma.servico.deleteMany()
  await prisma.pet.deleteMany()
  await prisma.usuario.deleteMany()
  await prisma.petshop.deleteMany()

  console.log('✅ Dados antigos removidos')

  // Criar petshop de exemplo
  const petshop = await prisma.petshop.create({
    data: {
      slug: 'amigofiel',
      nome: 'Amigo Fiel Pet Shop',
      telefone: '11999999999',
      email: 'contato@amigofiel.com',
      cidade: 'Guaianases',
      endereco: 'Rua Exemplo, 123',
      planoAtual: 'free',
      configuracoes: {
        horario_funcionamento: {
          segunda: { inicio: '08:00', fim: '18:00' },
          terca: { inicio: '08:00', fim: '18:00' },
          quarta: { inicio: '08:00', fim: '18:00' },
          quinta: { inicio: '08:00', fim: '18:00' },
          sexta: { inicio: '08:00', fim: '18:00' },
          sabado: { inicio: '08:00', fim: '14:00' }
        },
        intervalo_agendamento_minutos: 60,
        cores: {
          primaria: '#0d9488',
          secundaria: '#14b8a6'
        },
        whatsapp_lembretes: true,
        pix_ativo: false
      }
    }
  })

  console.log('✅ Petshop criado:', petshop.nome)

  // Criar admin
  const senhaHash = await bcrypt.hash('senha123', 10)
  const admin = await prisma.usuario.create({
    data: {
      petshopId: petshop.id,
      nome: 'Carlos Silva',
      telefone: '11999999999',
      email: 'carlos@amigofiel.com',
      senhaHash,
      role: 'admin'
    }
  })

  console.log('✅ Admin criado:', admin.nome)

  // Criar cliente
  const cliente = await prisma.usuario.create({
    data: {
      petshopId: petshop.id,
      nome: 'Juliana Santos',
      telefone: '11988888888',
      senhaHash: await bcrypt.hash('senha123', 10),
      role: 'cliente'
    }
  })

  console.log('✅ Cliente criado:', cliente.nome)

  // Criar pet
  const pet = await prisma.pet.create({
    data: {
      usuarioId: cliente.id,
      nome: 'Mel',
      raca: 'Shih Tzu',
      porte: 'pequeno',
      idade: 3,
      peso: 5.0,
      observacoes: 'Alergia a shampoo X. Nervoso com barulho.'
    }
  })

  console.log('✅ Pet criado:', pet.nome)

  // Criar serviços
  const servicos = await prisma.servico.createMany({
    data: [
      {
        petshopId: petshop.id,
        nome: 'Banho',
        descricao: 'Banho completo com shampoo e condicionador',
        preco: 40.00,
        duracaoMinutos: 60
      },
      {
        petshopId: petshop.id,
        nome: 'Tosa',
        descricao: 'Tosa higiênica ou completa',
        preco: 60.00,
        duracaoMinutos: 90
      },
      {
        petshopId: petshop.id,
        nome: 'Banho + Tosa',
        descricao: 'Pacote completo',
        preco: 90.00,
        duracaoMinutos: 120
      },
      {
        petshopId: petshop.id,
        nome: 'Corte de Unhas',
        descricao: 'Corte de unhas e limpeza de ouvidos',
        preco: 20.00,
        duracaoMinutos: 30
      }
    ]
  })

  console.log('✅ Serviços criados:', servicos.count)

  // Criar plano free
  await prisma.planoAssinatura.create({
    data: {
      petshopId: petshop.id,
      plano: 'free',
      valor: 0,
      inicioEm: new Date()
    }
  })

  console.log('✅ Plano free criado')

  // Criar agendamento de exemplo
  const servicoBanho = await prisma.servico.findFirst({
    where: { petshopId: petshop.id, nome: 'Banho' }
  })

  if (servicoBanho) {
    const amanha = new Date()
    amanha.setDate(amanha.getDate() + 1)
    amanha.setHours(10, 0, 0, 0)

    await prisma.agendamento.create({
      data: {
        petshopId: petshop.id,
        usuarioId: cliente.id,
        petId: pet.id,
        servicoId: servicoBanho.id,
        dataHora: amanha,
        duracaoMinutos: servicoBanho.duracaoMinutos,
        status: 'pendente',
        observacoes: 'Primeiro agendamento de exemplo'
      }
    })

    console.log('✅ Agendamento de exemplo criado')
  }

  console.log('\n🎉 Seed concluído com sucesso!')
  console.log('\n📋 Dados criados:')
  console.log('   - 1 Petshop: Amigo Fiel Pet Shop')
  console.log('   - 1 Admin: Carlos Silva (11999999999 / senha123)')
  console.log('   - 1 Cliente: Juliana Santos (11988888888 / senha123)')
  console.log('   - 1 Pet: Mel (Shih Tzu)')
  console.log('   - 4 Serviços: Banho, Tosa, Banho+Tosa, Corte de Unhas')
  console.log('   - 1 Agendamento de exemplo')
  console.log('\n🔐 Credenciais de teste:')
  console.log('   Admin: 11999999999 / senha123')
  console.log('   Cliente: 11988888888 / senha123')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
