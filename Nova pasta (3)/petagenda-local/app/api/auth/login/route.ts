// app/api/auth/login/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const loginSchema = z.object({
  telefone: z.string().min(10),
  senha: z.string().min(1),
  petshop_slug: z.string().optional()
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = loginSchema.parse(body)

    // Buscar usuário com petshop
    const { data: usuario, error } = await supabase
      .from('usuarios')
      .select(`
        *,
        petshop:petshops(*)
      `)
      .eq('telefone', data.telefone)
      .eq('ativo', true)
      .single()

    if (error || !usuario) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    // Verificar senha
    const senhaValida = await bcrypt.compare(data.senha, usuario.senha_hash)

    if (!senhaValida) {
      return NextResponse.json(
        { error: 'Senha inválida' },
        { status: 401 }
      )
    }

    // Retornar dados do usuário (sem senha)
    const { senha_hash, ...usuarioSemSenha } = usuario

    return NextResponse.json({
      success: true,
      user: usuarioSemSenha
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Erro ao fazer login:', error)
    return NextResponse.json(
      { error: 'Erro ao fazer login' },
      { status: 500 }
    )
  }
}
