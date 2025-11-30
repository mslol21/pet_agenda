# 🚀 PetAgenda Local - Guia de Início Rápido

## ⚡ Setup em 10 Minutos

### Passo 1: Criar Projeto (2 min)

```bash
# Criar projeto Next.js
npx create-next-app@latest petagenda-local --typescript --tailwind --app
cd petagenda-local

# Instalar dependências principais
npm install @prisma/client @supabase/supabase-js next-auth bcryptjs zod react-hook-form @hookform/resolvers date-fns axios

# Dependências de desenvolvimento
npm install -D prisma @types/bcryptjs

# Shadcn UI
npx shadcn-ui@latest init -y
npx shadcn-ui@latest add button card input label select textarea calendar dialog table badge
```

### Passo 2: Configurar Banco de Dados (3 min)

```bash
# Inicializar Prisma
npx prisma init

# Copiar o schema completo do arquivo 02_arquitetura_software.md
# para prisma/schema.prisma

# Gerar cliente Prisma
npx prisma generate
```

### Passo 3: Configurar Variáveis de Ambiente (2 min)

Criar `.env.local`:

```bash
# Database (Supabase - criar em supabase.com)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"

# NextAuth
NEXTAUTH_SECRET="cole-aqui-resultado-de: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# Mercado Pago (criar em mercadopago.com.br)
MERCADOPAGO_ACCESS_TOKEN="TEST-seu-token-aqui"
MERCADOPAGO_PUBLIC_KEY="TEST-sua-public-key"

# Evolution API (opcional - para WhatsApp)
EVOLUTION_API_URL="https://sua-evolution-api.com"
EVOLUTION_API_KEY="sua-api-key"
EVOLUTION_INSTANCE_NAME="petagenda"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sua-anon-key"
```

### Passo 4: Criar Banco e Seed (2 min)

```bash
# Criar tabelas
npx prisma migrate dev --name init

# Popular com dados de exemplo
npx prisma db seed
```

### Passo 5: Rodar Projeto (1 min)

```bash
npm run dev
```

Acessar: `http://localhost:3000`

---

## 📁 Estrutura de Arquivos a Criar

Copiar código do arquivo `04_codigo_completo.md` para:

### Essenciais (Mínimo Viável):

```
app/
├── api/
│   ├── auth/
│   │   ├── register/route.ts
│   │   └── login/route.ts
│   └── agendamentos/
│       ├── route.ts
│       └── horarios-disponiveis/route.ts
├── page.tsx (Landing page)
└── layout.tsx

components/
├── ui/ (Shadcn components)
└── layout/
    ├── Navbar.tsx
    └── Sidebar.tsx

lib/
├── prisma.ts
└── utils.ts

prisma/
├── schema.prisma
└── seed.ts
```

### Completo (Todas as Funcionalidades):

Seguir estrutura completa do documento `02_arquitetura_software.md` seção 10.

---

## 🎯 Checklist de Desenvolvimento

### Fase 1: Backend (Semana 1)
- [ ] Configurar Prisma + Supabase
- [ ] Criar API de autenticação
- [ ] Criar API de agendamentos
- [ ] Criar API de horários disponíveis
- [ ] Testar endpoints com Postman/Insomnia

### Fase 2: Frontend Básico (Semana 2)
- [ ] Criar landing page
- [ ] Criar tela de login/cadastro
- [ ] Criar dashboard básico
- [ ] Criar calendário de agendamento
- [ ] Criar seletor de horários

### Fase 3: Integrações (Semana 3)
- [ ] Integrar PIX (Mercado Pago)
- [ ] Configurar webhooks
- [ ] Integrar WhatsApp (Evolution API)
- [ ] Testar fluxo completo

### Fase 4: Deploy (Semana 4)
- [ ] Deploy na Vercel
- [ ] Configurar domínio
- [ ] Testar em produção
- [ ] Configurar monitoramento

---

## 🔑 Credenciais de Teste

### Login Admin (após seed):
```
Telefone: 11999999999
Senha: senha123
```

### Login Cliente (após seed):
```
Telefone: 11988888888
Senha: senha123
```

---

## 🐛 Troubleshooting Comum

### Erro: "Can't reach database server"
```bash
# Verificar se DATABASE_URL está correto
# Testar conexão:
npx prisma db pull
```

### Erro: "Module not found"
```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Prisma Client not generated"
```bash
npx prisma generate
```

---

## 📚 Recursos Úteis

- **Documentação Completa:** `06_documentacao_unificada.md`
- **Código Completo:** `04_codigo_completo.md`
- **Arquitetura:** `02_arquitetura_software.md`
- **Design System:** `03_design_system.md`

---

## 🎉 Próximo Passo

Após setup completo, seguir o **Plano de Lançamento em 7 Dias** do arquivo `05_estrategia_marketing.md`!

**Boa sorte! 🚀**
