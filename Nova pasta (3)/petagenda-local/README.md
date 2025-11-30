# 🐕 PetAgenda Local

Sistema de agendamento online para petshops e clínicas veterinárias.

## 🚀 Setup Rápido

### 1. Instalar dependências adicionais

As dependências principais já foram instaladas. Instale as dependências do Radix UI:

```bash
npm install @radix-ui/react-slot
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/petagenda"
NEXTAUTH_SECRET="sua-secret-key-aqui"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Configurar banco de dados

```bash
# Gerar cliente Prisma
npx prisma generate

# Criar banco de dados (se usar Supabase, pule este passo)
npx prisma db push

# Ou criar migrations
npx prisma migrate dev --name init
```

### 4. Rodar projeto

```bash
npm run dev
```

Acesse: `http://localhost:3000`

## 📁 Estrutura Criada

```
petagenda-local/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/route.ts ✅
│   │   │   └── login/route.ts ✅
│   │   └── agendamentos/route.ts ✅
│   └── page.tsx ✅ (Landing Page)
├── components/
│   └── ui/
│       └── button.tsx ✅
├── lib/
│   ├── prisma.ts ✅
│   └── utils.ts ✅
├── prisma/
│   └── schema.prisma ✅ (9 tabelas)
└── README.md ✅
```

## 🎯 Próximos Passos

1. Configurar Supabase (criar projeto em supabase.com)
2. Copiar DATABASE_URL do Supabase para .env.local
3. Rodar `npx prisma db push`
4. Criar seed para dados de exemplo
5. Desenvolver mais páginas (login, cadastro, dashboard)

## 📚 Documentação Completa

Consulte os arquivos na pasta de artifacts para documentação completa:
- Estratégia de Produto
- Arquitetura de Software
- Design System
- Código Completo
- Estratégia de Marketing

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Prisma Studio (visualizar banco)
npx prisma studio

# Gerar tipos do Prisma
npx prisma generate
```

## ✅ Status do Projeto

- [x] Projeto Next.js 14 criado
- [x] Dependências instaladas
- [x] Prisma configurado
- [x] Schema do banco (9 tabelas)
- [x] APIs de autenticação
- [x] API de agendamentos
- [x] Landing page
- [x] Componente Button
- [ ] Mais componentes UI
- [ ] Páginas de login/cadastro
- [ ] Dashboard
- [ ] Integração PIX
- [ ] Integração WhatsApp

---

**Desenvolvido com ❤️ para petshops de regiões populares**
