// lib/validations.ts
import { z } from 'zod'

// Validação de telefone brasileiro
const phoneRegex = /^(\d{2})9?\d{8}$/

// Schema de registro de petshop
export const registerPetshopSchema = z.object({
  nome_petshop: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  
  slug: z.string()
    .min(3, 'Slug deve ter no mínimo 3 caracteres')
    .max(50, 'Slug deve ter no máximo 50 caracteres')
    .regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens'),
  
  cidade: z.string()
    .min(3, 'Cidade deve ter no mínimo 3 caracteres'),
  
  telefone: z.string()
    .regex(phoneRegex, 'Telefone inválido. Use formato: (11) 99999-9999'),
  
  email: z.string()
    .email('Email inválido')
    .optional()
    .or(z.literal('')),
  
  senha: z.string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .max(50, 'Senha deve ter no máximo 50 caracteres'),
  
  nome_admin: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
})

export type RegisterPetshopInput = z.infer<typeof registerPetshopSchema>

// Schema de login
export const loginSchema = z.object({
  telefone: z.string()
    .regex(phoneRegex, 'Telefone inválido'),
  
  senha: z.string()
    .min(1, 'Senha é obrigatória'),
  
  petshop_slug: z.string()
    .optional()
})

export type LoginInput = z.infer<typeof loginSchema>

// Schema de cadastro de pet
export const petSchema = z.object({
  usuario_id: z.string().uuid(),
  
  nome: z.string()
    .min(2, 'Nome deve ter no mínimo 2 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres'),
  
  raca: z.string()
    .max(50, 'Raça deve ter no máximo 50 caracteres')
    .optional()
    .or(z.literal('')),
  
  porte: z.enum(['pequeno', 'medio', 'grande'])
    .optional(),
  
  idade: z.number()
    .int('Idade deve ser um número inteiro')
    .min(0, 'Idade não pode ser negativa')
    .max(30, 'Idade máxima é 30 anos')
    .optional(),
  
  peso: z.number()
    .min(0, 'Peso não pode ser negativo')
    .max(200, 'Peso máximo é 200kg')
    .optional(),
  
  observacoes: z.string()
    .max(500, 'Observações devem ter no máximo 500 caracteres')
    .optional()
    .or(z.literal('')),
  
  foto_url: z.string()
    .url('URL inválida')
    .optional()
    .or(z.literal(''))
})

export type PetInput = z.infer<typeof petSchema>

// Schema de serviço
export const servicoSchema = z.object({
  petshop_id: z.string().uuid(),
  
  nome: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  
  descricao: z.string()
    .max(500, 'Descrição deve ter no máximo 500 caracteres')
    .optional()
    .or(z.literal('')),
  
  preco: z.number()
    .min(0, 'Preço não pode ser negativo')
    .max(10000, 'Preço máximo é R$ 10.000'),
  
  duracao_minutos: z.number()
    .int('Duração deve ser um número inteiro')
    .min(15, 'Duração mínima é 15 minutos')
    .max(480, 'Duração máxima é 8 horas')
})

export type ServicoInput = z.infer<typeof servicoSchema>

// Schema de agendamento
export const agendamentoSchema = z.object({
  petshop_id: z.string().uuid(),
  usuario_id: z.string().uuid(),
  pet_id: z.string().uuid(),
  servico_id: z.string().uuid(),
  
  data_hora: z.string()
    .datetime('Data/hora inválida'),
  
  observacoes: z.string()
    .max(500, 'Observações devem ter no máximo 500 caracteres')
    .optional()
    .or(z.literal(''))
}).refine(
  (data) => {
    const dataHora = new Date(data.data_hora)
    return dataHora > new Date()
  },
  {
    message: 'Data/hora deve ser no futuro',
    path: ['data_hora']
  }
)

export type AgendamentoInput = z.infer<typeof agendamentoSchema>

// Schema de atualização de status
export const updateStatusSchema = z.object({
  status: z.enum([
    'pendente',
    'confirmado',
    'em_andamento',
    'concluido',
    'cancelado'
  ])
})

export type UpdateStatusInput = z.infer<typeof updateStatusSchema>

// Schema de configurações do petshop
export const configuracoesPetshopSchema = z.object({
  horario_funcionamento: z.object({
    segunda: z.object({
      inicio: z.string().regex(/^\d{2}:\d{2}$/),
      fim: z.string().regex(/^\d{2}:\d{2}$/)
    }).optional(),
    terca: z.object({
      inicio: z.string().regex(/^\d{2}:\d{2}$/),
      fim: z.string().regex(/^\d{2}:\d{2}$/)
    }).optional(),
    quarta: z.object({
      inicio: z.string().regex(/^\d{2}:\d{2}$/),
      fim: z.string().regex(/^\d{2}:\d{2}$/)
    }).optional(),
    quinta: z.object({
      inicio: z.string().regex(/^\d{2}:\d{2}$/),
      fim: z.string().regex(/^\d{2}:\d{2}$/)
    }).optional(),
    sexta: z.object({
      inicio: z.string().regex(/^\d{2}:\d{2}$/),
      fim: z.string().regex(/^\d{2}:\d{2}$/)
    }).optional(),
    sabado: z.object({
      inicio: z.string().regex(/^\d{2}:\d{2}$/),
      fim: z.string().regex(/^\d{2}:\d{2}$/)
    }).optional(),
    domingo: z.object({
      inicio: z.string().regex(/^\d{2}:\d{2}$/),
      fim: z.string().regex(/^\d{2}:\d{2}$/)
    }).optional()
  }),
  
  intervalo_agendamento_minutos: z.number()
    .int()
    .min(15)
    .max(240)
    .default(60),
  
  cores: z.object({
    primaria: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    secundaria: z.string().regex(/^#[0-9A-Fa-f]{6}$/)
  }).optional(),
  
  whatsapp_lembretes: z.boolean().default(true),
  pix_ativo: z.boolean().default(false)
})

export type ConfiguracoesPetshopInput = z.infer<typeof configuracoesPetshopSchema>

// Schema de PIX
export const pixSchema = z.object({
  agendamento_id: z.string().uuid(),
  valor: z.number()
    .min(1, 'Valor mínimo é R$ 1,00')
    .max(10000, 'Valor máximo é R$ 10.000')
})

export type PixInput = z.infer<typeof pixSchema>
