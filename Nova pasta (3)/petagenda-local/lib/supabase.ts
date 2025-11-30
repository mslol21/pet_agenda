// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export type Petshop = {
  id: string
  slug: string
  nome: string
  telefone: string
  email?: string
  endereco?: string
  cidade: string
  logo_url?: string
  plano_atual: string
  plano_expira_em?: string
  limite_agendamentos_mes: number
  configuracoes: any
  ativo: boolean
  created_at: string
  updated_at: string
}

export type Usuario = {
  id: string
  petshop_id: string
  nome: string
  telefone: string
  email?: string
  senha_hash: string
  role: string
  ativo: boolean
  created_at: string
  updated_at: string
}

export type Pet = {
  id: string
  usuario_id: string
  nome: string
  raca?: string
  porte?: string
  idade?: number
  peso?: number
  observacoes?: string
  foto_url?: string
  ativo: boolean
  created_at: string
  updated_at: string
}

export type Servico = {
  id: string
  petshop_id: string
  nome: string
  descricao?: string
  preco: number
  duracao_minutos: number
  ativo: boolean
  created_at: string
  updated_at: string
}

export type Agendamento = {
  id: string
  petshop_id: string
  usuario_id: string
  pet_id: string
  servico_id: string
  funcionario_id?: string
  data_hora: string
  duracao_minutos: number
  status: string
  observacoes?: string
  lembrete_enviado: boolean
  confirmado_pelo_cliente: boolean
  created_at: string
  updated_at: string
}
