// app/api/agendamentos/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

const agendamentoSchema = z.object({
  petshop_id: z.string().uuid(),
  cliente_nome: z.string().min(3),
  cliente_telefone: z.string().min(10),
  cliente_email: z.string().email().optional().nullable(),
  servico_id: z.string().uuid(),
  data_agendamento: z.string(),
  observacoes: z.string().optional().nullable()
})

export async function POST(request: Request) {
  console.log('=== API AGENDAMENTOS - POST ===')
  
  try {
    const body = await request.json()
    console.log('1. Body recebido:', JSON.stringify(body, null, 2))
    
    const data = agendamentoSchema.parse(body)
    console.log('2. Dados validados com sucesso')

    // 3. Buscar informações do serviço para verificar duração
    console.log('3. Buscando informações do serviço...')
    const { data: servico, error: servicoError } = await supabase
      .from('servicos')
      .select('duracao_minutos')
      .eq('id', data.servico_id)
      .single()

    if (servicoError || !servico) {
      throw new Error('Serviço não encontrado')
    }

    console.log('Duração do serviço:', servico.duracao_minutos, 'minutos')

    // 4. Verificar conflito de horários
    console.log('4. Verificando conflitos de horário...')
    
    // Calcular horário de início e fim do novo agendamento
    const novoInicio = new Date(data.data_agendamento)
    const novoFim = new Date(novoInicio.getTime() + servico.duracao_minutos * 60000)

    console.log('Novo agendamento:', {
      inicio: novoInicio.toISOString(),
      fim: novoFim.toISOString()
    })

    // Buscar agendamentos existentes no mesmo dia
    const diaInicio = new Date(novoInicio)
    diaInicio.setHours(0, 0, 0, 0)
    
    const diaFim = new Date(novoInicio)
    diaFim.setHours(23, 59, 59, 999)

    // Definir tipo para agendamentos com servico (Supabase retorna array)
    type AgendamentoComServico = {
      id: string
      data_agendamento: string
      servico: Array<{
        duracao_minutos: number
      }> | null
    }

    const { data: agendamentosExistentes, error: checkError } = await supabase
      .from('agendamentos')
      .select(`
        id,
        data_agendamento,
        servico:servicos(duracao_minutos)
      `)
      .eq('petshop_id', data.petshop_id)
      .neq('status', 'cancelado')
      .gte('data_agendamento', diaInicio.toISOString())
      .lte('data_agendamento', diaFim.toISOString())

    if (checkError) {
      console.error('Erro ao verificar conflitos:', checkError)
      throw new Error('Erro ao verificar conflitos de horário')
    }

    console.log('Agendamentos existentes no dia:', agendamentosExistentes?.length || 0)

    // Verificar se há conflito
    if (agendamentosExistentes && agendamentosExistentes.length > 0) {
      for (const agendamento of agendamentosExistentes as unknown as AgendamentoComServico[]) {
        const existenteInicio = new Date(agendamento.data_agendamento)
        // Supabase retorna servico como array, pegar primeiro elemento
        const duracaoExistente = agendamento.servico?.[0]?.duracao_minutos || 60
        const existenteFim = new Date(existenteInicio.getTime() + duracaoExistente * 60000)

        // Verificar se há sobreposição
        const haConflito = (
          (novoInicio >= existenteInicio && novoInicio < existenteFim) || // Novo começa durante existente
          (novoFim > existenteInicio && novoFim <= existenteFim) ||       // Novo termina durante existente
          (novoInicio <= existenteInicio && novoFim >= existenteFim)      // Novo engloba existente
        )

        if (haConflito) {
          const horarioConflito = existenteInicio.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })
          
          console.log('CONFLITO DETECTADO!')
          console.log('Horário em conflito:', horarioConflito)
          
          throw new Error(
            `Já existe um agendamento neste horário (${horarioConflito}). ` +
            `Por favor, escolha outro horário.`
          )
        }
      }
    }

    console.log('5. Nenhum conflito encontrado!')

    // 6. Criar agendamento
    console.log('6. Criando agendamento...')
    console.log('Dados para inserir:', {
      petshop_id: data.petshop_id,
      cliente_nome: data.cliente_nome,
      cliente_telefone: data.cliente_telefone,
      servico_id: data.servico_id,
      data_agendamento: data.data_agendamento,
      status: 'pendente'
    })

    const { data: agendamento, error: agendamentoError } = await supabase
      .from('agendamentos')
      .insert({
        petshop_id: data.petshop_id,
        cliente_nome: data.cliente_nome,
        cliente_telefone: data.cliente_telefone,
        servico_id: data.servico_id,
        data_agendamento: data.data_agendamento,
        status: 'pendente',
        observacoes: data.observacoes || null
      })
      .select(`
        *,
        servico:servicos(*)
      `)
      .single()

    console.log('7. Resultado:', { 
      sucesso: !!agendamento, 
      erro: agendamentoError ? agendamentoError.message : null 
    })

    if (agendamentoError) {
      console.error('ERRO ao criar agendamento:', agendamentoError)
      throw new Error(`Erro ao criar agendamento: ${agendamentoError.message}`)
    }

    if (!agendamento) {
      throw new Error('Agendamento não foi criado')
    }

    console.log('8. Agendamento criado com sucesso! ID:', agendamento.id)
    return NextResponse.json({
      success: true,
      agendamento
    }, { status: 201 })

  } catch (error) {
    console.error('=== ERRO NO CATCH ===')
    console.error('Tipo:', error instanceof Error ? error.constructor.name : typeof error)
    console.error('Mensagem:', error instanceof Error ? error.message : String(error))
    console.error('Stack:', error instanceof Error ? error.stack : 'N/A')
    
    if (error instanceof z.ZodError) {
      console.error('Erro de validação Zod:', JSON.stringify(error.issues, null, 2))
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erro ao criar agendamento', message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const petshopId = searchParams.get('petshop_id')
    const status = searchParams.get('status')

    if (!petshopId) {
      return NextResponse.json(
        { error: 'petshop_id é obrigatório' },
        { status: 400 }
      )
    }

    let query = supabase
      .from('agendamentos')
      .select(`
        *,
        servico:servicos(*)
      `)
      .eq('petshop_id', petshopId)
      .order('data_agendamento', { ascending: true })

    if (status && status !== 'todos') {
      query = query.eq('status', status)
    }

    const { data: agendamentos, error } = await query

    if (error) {
      throw new Error(error.message)
    }

    return NextResponse.json({
      success: true,
      agendamentos: agendamentos || []
    })

  } catch (error) {
    console.error('Erro ao listar agendamentos:', error)
    return NextResponse.json(
      { error: 'Erro ao listar agendamentos' },
      { status: 500 }
    )
  }
}
