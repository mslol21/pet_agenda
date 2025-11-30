// app/api/auth/register/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const registerSchema = z.object({
  nome_petshop: z.string().min(3),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  cidade: z.string().min(3),
  telefone: z.string().min(10),
  email: z.string().email().optional(),
  senha: z.string().min(6),
  nome_admin: z.string().min(3)
})

export async function POST(request: Request) {
  console.log('=== REGISTER API CHAMADA ===')
  
  try {
    console.log('1. Lendo body...')
    const body = await request.json()
    console.log('Body recebido:', body)
    
    console.log('2. Validando com Zod...')
    const data = registerSchema.parse(body)
    console.log('Dados validados:', data)

    // Verificar se slug já existe
    console.log('3. Verificando se slug existe...')
    const { data: existingPetshop, error: checkError } = await supabase
      .from('petshops')
      .select('id')
      .eq('slug', data.slug)
      .maybeSingle()
    
    console.log('Resultado da verificação:', { existingPetshop, checkError })

    if (existingPetshop) {
      console.log('Slug já existe, retornando erro')
      return NextResponse.json(
        { error: 'Este slug já está em uso' },
        { status: 400 }
      )
    }

    // Criar petshop
    console.log('4. Criando petshop...')
    const { data: petshop, error: petshopError } = await supabase
      .from('petshops')
      .insert({
        slug: data.slug,
        nome: data.nome_petshop,
        telefone: data.telefone,
        email: data.email || null,
        cidade: data.cidade,
        plano_atual: 'free',
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
          }
        }
      })
      .select()
      .single()

    console.log('Resultado criar petshop:', { petshop, petshopError })

    if (petshopError || !petshop) {
      console.error('ERRO ao criar petshop:', petshopError)
      return NextResponse.json(
        { error: 'Erro ao criar petshop', details: petshopError },
        { status: 500 }
      )
    }

    // Criar usuário admin
    console.log('5. Criando admin...')
    const senhaHash = await bcrypt.hash(data.senha, 10)
    console.log('Senha hasheada')
    
    const { data: admin, error: adminError } = await supabase
      .from('usuarios')
      .insert({
        petshop_id: petshop.id,
        nome: data.nome_admin,
        telefone: data.telefone,
        email: data.email || null,
        senha_hash: senhaHash,
        role: 'admin'
      })
      .select()
      .single()

    console.log('Resultado criar admin:', { admin, adminError })

    if (adminError) {
      console.error('ERRO ao criar admin:', adminError)
      return NextResponse.json(
        { error: 'Erro ao criar admin', details: adminError },
        { status: 500 }
      )
    }

    // Criar plano free
    console.log('6. Criando plano free...')
    const { error: planoError } = await supabase
      .from('planos_assinatura')
      .insert({
        petshop_id: petshop.id,
        plano: 'free',
        valor: 0,
        inicio_em: new Date().toISOString()
      })
    
    if (planoError) {
      console.error('ERRO ao criar plano:', planoError)
    }

    console.log('7. Cadastro concluído com sucesso!')
    return NextResponse.json({
      success: true,
      petshop: {
        id: petshop.id,
        slug: petshop.slug,
        nome: petshop.nome
      }
    }, { status: 201 })

  } catch (error) {
    console.error('=== ERRO NO CATCH ===')
    console.error('Tipo:', error instanceof Error ? error.constructor.name : typeof error)
    console.error('Mensagem:', error instanceof Error ? error.message : String(error))
    console.error('Stack:', error instanceof Error ? error.stack : 'N/A')
    
    if (error instanceof z.ZodError) {
      console.error('Erro de validação Zod:', error.issues)
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erro ao criar petshop', message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
