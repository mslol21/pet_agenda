// app/api/agendamentos/[id]/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

const updateSchema = z.object({
  status: z.enum(['pendente', 'confirmado', 'cancelado'])
})

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  console.log('=== API AGENDAMENTOS - PATCH ===')
  
  try {
    // Aguardar params (Next.js 15+)
    const params = await context.params
    const id = params.id
    
    console.log('1. ID recebido:', id)
    
    const body = await request.json()
    console.log('2. Body recebido:', body)
    
    const data = updateSchema.parse(body)
    console.log('3. Dados validados:', data)

    console.log('4. Atualizando status no banco...')
    const { data: agendamento, error } = await supabase
      .from('agendamentos')
      .update({ status: data.status })
      .eq('id', id)
      .select(`
        *,
        servico:servicos(*),
        petshop:petshops(nome, telefone)
      `)
      .single()

    console.log('5. Resultado:', { 
      sucesso: !!agendamento, 
      erro: error ? error.message : null 
    })

    if (error) {
      console.error('ERRO ao atualizar:', error)
      throw new Error(`Erro ao atualizar agendamento: ${error.message}`)
    }

    if (!agendamento) {
      throw new Error('Agendamento não encontrado')
    }

    console.log('6. Status atualizado com sucesso!')

    // 7. Preparar mensagem WhatsApp
    if (data.status === 'confirmado' || data.status === 'cancelado') {
      console.log('7. Preparando notificação WhatsApp...')
      
      const dataFormatada = new Date(agendamento.data_agendamento).toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      
      const horario = new Date(agendamento.data_agendamento).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      })

      const statusEmoji = data.status === 'confirmado' ? '✅' : '❌'
      const statusTexto = data.status === 'confirmado' ? 'CONFIRMADO' : 'CANCELADO'

      const mensagemWhatsApp = 
        `${statusEmoji} *AGENDAMENTO ${statusTexto}*\n\n` +
        `Olá ${agendamento.cliente_nome}!\n\n` +
        `Seu agendamento foi ${statusTexto.toLowerCase()}:\n\n` +
        `🏪 *${agendamento.petshop?.nome}*\n` +
        `📅 *Serviço:* ${agendamento.servico?.nome}\n` +
        `💰 *Valor:* R$ ${agendamento.servico?.preco.toFixed(2)}\n` +
        `📆 *Data:* ${dataFormatada}\n` +
        `🕐 *Horário:* ${horario}\n` +
        `⏱️ *Duração:* ${agendamento.servico?.duracao_minutos} minutos\n\n` +
        (data.status === 'confirmado' 
          ? `Aguardamos você! 🐕\n\nQualquer dúvida, entre em contato: ${agendamento.petshop?.telefone}`
          : `Se precisar reagendar, entre em contato: ${agendamento.petshop?.telefone}`
        )

      // Retornar com informações para enviar WhatsApp
      return NextResponse.json({
        success: true,
        agendamento,
        whatsapp: {
          telefone: agendamento.cliente_telefone,
          mensagem: mensagemWhatsApp
        }
      })
    }
    return NextResponse.json({
      success: true,
      agendamento
    })

  } catch (error) {
    console.error('=== ERRO NO CATCH ===')
    console.error('Tipo:', error instanceof Error ? error.constructor.name : typeof error)
    console.error('Mensagem:', error instanceof Error ? error.message : String(error))
    console.error('Stack:', error instanceof Error ? error.stack : 'N/A')
    
    if (error instanceof z.ZodError) {
      console.error('Erro de validação Zod:', error.issues)
      return NextResponse.json(
        { error: 'Status inválido', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erro ao atualizar agendamento', message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
