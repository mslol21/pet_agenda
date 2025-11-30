# 🔧 GUIA: Configurar Banco de Dados no Supabase

## ⚠️ Problema Encontrado

O Prisma CLI instalado globalmente está na versão 7, que tem incompatibilidades.

## ✅ SOLUÇÃO: Configurar via Interface do Supabase

### Passo 1: Acessar SQL Editor do Supabase

1. Acesse: https://supabase.com/dashboard/project/fjfuwvhbhpmsfxetlpwn/sql/new
2. Cole o SQL abaixo e clique em "Run"

```sql
-- Criar tabela petshops
CREATE TABLE IF NOT EXISTS petshops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  email TEXT,
  endereco TEXT,
  cidade TEXT NOT NULL,
  logo_url TEXT,
  plano_atual TEXT DEFAULT 'free',
  plano_expira_em TIMESTAMP,
  limite_agendamentos_mes INTEGER DEFAULT 30,
  configuracoes JSONB DEFAULT '{}',
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Criar tabela usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  petshop_id UUID NOT NULL REFERENCES petshops(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  email TEXT,
  senha_hash TEXT NOT NULL,
  role TEXT DEFAULT 'cliente',
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(petshop_id, telefone)
);

-- Criar tabela pets
CREATE TABLE IF NOT EXISTS pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  raca TEXT,
  porte TEXT,
  idade INTEGER,
  peso DECIMAL(5,2),
  observacoes TEXT,
  foto_url TEXT,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Criar tabela servicos
CREATE TABLE IF NOT EXISTS servicos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  petshop_id UUID NOT NULL REFERENCES petshops(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  descricao TEXT,
  preco DECIMAL(10,2) NOT NULL,
  duracao_minutos INTEGER DEFAULT 60,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Criar tabela agendamentos
CREATE TABLE IF NOT EXISTS agendamentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  petshop_id UUID NOT NULL REFERENCES petshops(id) ON DELETE CASCADE,
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  servico_id UUID NOT NULL REFERENCES servicos(id) ON DELETE SET NULL,
  funcionario_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
  data_hora TIMESTAMP NOT NULL,
  duracao_minutos INTEGER NOT NULL,
  status TEXT DEFAULT 'pendente',
  observacoes TEXT,
  lembrete_enviado BOOLEAN DEFAULT false,
  confirmado_pelo_cliente BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(funcionario_id, data_hora)
);

-- Criar tabela historico_atendimentos
CREATE TABLE IF NOT EXISTS historico_atendimentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agendamento_id UUID UNIQUE NOT NULL REFERENCES agendamentos(id) ON DELETE CASCADE,
  pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  observacoes TEXT,
  fotos_antes JSONB DEFAULT '[]',
  fotos_depois JSONB DEFAULT '[]',
  atendido_em TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Criar tabela transacoes_pix
CREATE TABLE IF NOT EXISTS transacoes_pix (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agendamento_id UUID UNIQUE NOT NULL REFERENCES agendamentos(id) ON DELETE CASCADE,
  petshop_id UUID NOT NULL REFERENCES petshops(id) ON DELETE CASCADE,
  valor DECIMAL(10,2) NOT NULL,
  pix_id_externo TEXT,
  qr_code TEXT,
  qr_code_base64 TEXT,
  status TEXT DEFAULT 'pendente',
  pago_em TIMESTAMP,
  expira_em TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Criar tabela planos_assinatura
CREATE TABLE IF NOT EXISTS planos_assinatura (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  petshop_id UUID NOT NULL REFERENCES petshops(id) ON DELETE CASCADE,
  plano TEXT NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  inicio_em TIMESTAMP NOT NULL,
  expira_em TIMESTAMP,
  ativo BOOLEAN DEFAULT true,
  cancelado_em TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Criar tabela logs_whatsapp
CREATE TABLE IF NOT EXISTS logs_whatsapp (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agendamento_id UUID NOT NULL REFERENCES agendamentos(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL,
  telefone TEXT NOT NULL,
  mensagem TEXT NOT NULL,
  enviado BOOLEAN DEFAULT false,
  erro TEXT,
  enviado_em TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_usuarios_petshop ON usuarios(petshop_id);
CREATE INDEX IF NOT EXISTS idx_pets_usuario ON pets(usuario_id);
CREATE INDEX IF NOT EXISTS idx_servicos_petshop ON servicos(petshop_id);
CREATE INDEX IF NOT EXISTS idx_agendamentos_petshop ON agendamentos(petshop_id);
CREATE INDEX IF NOT EXISTS idx_agendamentos_data ON agendamentos(data_hora);
CREATE INDEX IF NOT EXISTS idx_agendamentos_status ON agendamentos(status);
```

### Passo 2: Inserir Dados de Exemplo

Cole e execute este SQL para criar dados de teste:

```sql
-- Inserir petshop de exemplo
INSERT INTO petshops (slug, nome, telefone, email, cidade, endereco, configuracoes)
VALUES (
  'amigofiel',
  'Amigo Fiel Pet Shop',
  '11999999999',
  'contato@amigofiel.com',
  'Guaianases',
  'Rua Exemplo, 123',
  '{"horario_funcionamento":{"segunda":{"inicio":"08:00","fim":"18:00"},"terca":{"inicio":"08:00","fim":"18:00"},"quarta":{"inicio":"08:00","fim":"18:00"},"quinta":{"inicio":"08:00","fim":"18:00"},"sexta":{"inicio":"08:00","fim":"18:00"},"sabado":{"inicio":"08:00","fim":"14:00"}},"intervalo_agendamento_minutos":60,"cores":{"primaria":"#0d9488","secundaria":"#14b8a6"},"whatsapp_lembretes":true,"pix_ativo":false}'::jsonb
) RETURNING id;

-- Copie o ID retornado acima e substitua em PETSHOP_ID_AQUI abaixo

-- Inserir admin (senha: senha123)
INSERT INTO usuarios (petshop_id, nome, telefone, email, senha_hash, role)
VALUES (
  'PETSHOP_ID_AQUI',
  'Carlos Silva',
  '11999999999',
  'carlos@amigofiel.com',
  '$2a$10$YourHashedPasswordHere',
  'admin'
) RETURNING id;

-- Inserir cliente (senha: senha123)
INSERT INTO usuarios (petshop_id, nome, telefone, senha_hash, role)
VALUES (
  'PETSHOP_ID_AQUI',
  'Juliana Santos',
  '11988888888',
  '$2a$10$YourHashedPasswordHere',
  'cliente'
) RETURNING id;

-- Inserir serviços
INSERT INTO servicos (petshop_id, nome, descricao, preco, duracao_minutos)
VALUES 
  ('PETSHOP_ID_AQUI', 'Banho', 'Banho completo com shampoo e condicionador', 40.00, 60),
  ('PETSHOP_ID_AQUI', 'Tosa', 'Tosa higiênica ou completa', 60.00, 90),
  ('PETSHOP_ID_AQUI', 'Banho + Tosa', 'Pacote completo', 90.00, 120),
  ('PETSHOP_ID_AQUI', 'Corte de Unhas', 'Corte de unhas e limpeza de ouvidos', 20.00, 30);

-- Inserir plano free
INSERT INTO planos_assinatura (petshop_id, plano, valor, inicio_em)
VALUES ('PETSHOP_ID_AQUI', 'free', 0, NOW());
```

### Passo 3: Rodar o Projeto

Agora você pode rodar o projeto:

```bash
cd "C:\Users\massa\Nova pasta (3)\petagenda-local"
npm run dev
```

Acesse: http://localhost:3000

### Passo 4: Testar Login

Use as credenciais:
- **Admin:** 11999999999 / senha123
- **Cliente:** 11988888888 / senha123

---

## 🔄 ALTERNATIVA: Usar Prisma 5 (Recomendado)

Se preferir usar Prisma, desinstale a versão global:

```bash
npm uninstall -g prisma
npm cache clean --force
```

Depois rode:

```bash
cd "C:\Users\massa\Nova pasta (3)\petagenda-local"
npx prisma@5.9.1 db push
npx prisma@5.9.1 db seed
```

---

## ✅ Verificar se Funcionou

1. Acesse: https://supabase.com/dashboard/project/fjfuwvhbhpmsfxetlpwn/editor
2. Você deve ver 9 tabelas criadas
3. Clique em "petshops" e veja se tem 1 registro

---

**Qualquer dúvida, me avise!** 🚀
