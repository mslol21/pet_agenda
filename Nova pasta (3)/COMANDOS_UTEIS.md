# 📝 Comandos Úteis - PetAgenda Local

## 🚀 Inicialização

```bash
# Instalar dependências
npm install

# Copiar .env.example para .env.local
cp .env.example .env.local

# Editar variáveis de ambiente
code .env.local  # ou seu editor preferido

# Gerar cliente Prisma
npx prisma generate

# Criar banco de dados
npx prisma migrate dev --name init

# Popular com dados de exemplo
npx prisma db seed

# Rodar em desenvolvimento
npm run dev
```

---

## 🗄️ Banco de Dados (Prisma)

```bash
# Gerar cliente Prisma (após alterar schema)
npx prisma generate

# Criar nova migration
npx prisma migrate dev --name nome_da_migration

# Aplicar migrations em produção
npx prisma migrate deploy

# Abrir Prisma Studio (visualizar dados)
npx prisma studio

# Resetar banco (CUIDADO - apaga tudo!)
npx prisma migrate reset

# Push schema sem criar migration (dev)
npx prisma db push

# Popular banco com seed
npx prisma db seed

# Ver status das migrations
npx prisma migrate status
```

---

## 🔨 Desenvolvimento

```bash
# Rodar em modo desenvolvimento
npm run dev

# Build de produção
npm run build

# Rodar build de produção localmente
npm start

# Lint (verificar erros)
npm run lint

# Lint e corrigir automaticamente
npm run lint -- --fix
```

---

## 🎨 Shadcn UI

```bash
# Adicionar componente
npx shadcn-ui@latest add [component-name]

# Exemplos:
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add calendar
npx shadcn-ui@latest add table

# Adicionar múltiplos componentes
npx shadcn-ui@latest add button card input label select
```

---

## 🚢 Deploy (Vercel)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy preview
vercel

# Deploy produção
vercel --prod

# Ver logs
vercel logs

# Ver variáveis de ambiente
vercel env ls

# Adicionar variável de ambiente
vercel env add [NOME]
```

---

## 🧪 Testes

```bash
# Testar conexão com banco
npx prisma db pull

# Validar schema do Prisma
npx prisma validate

# Formatar schema do Prisma
npx prisma format
```

---

## 📦 Dependências

```bash
# Instalar nova dependência
npm install [package-name]

# Instalar dependência de desenvolvimento
npm install -D [package-name]

# Atualizar todas as dependências
npm update

# Verificar dependências desatualizadas
npm outdated

# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

---

## 🔍 Debug

```bash
# Ver variáveis de ambiente carregadas
node -e "console.log(process.env)"

# Verificar versão do Node
node -v

# Verificar versão do npm
npm -v

# Limpar cache do Next.js
rm -rf .next

# Limpar tudo e reinstalar
rm -rf .next node_modules package-lock.json
npm install
```

---

## 📊 Análise

```bash
# Analisar bundle size
npm run build
# Depois verificar em: .next/analyze/

# Ver estatísticas do build
npm run build -- --profile
```

---

## 🔐 Segurança

```bash
# Gerar secret para NextAuth
openssl rand -base64 32

# Verificar vulnerabilidades
npm audit

# Corrigir vulnerabilidades automaticamente
npm audit fix
```

---

## 🌐 Supabase CLI (Opcional)

```bash
# Instalar Supabase CLI
npm install -g supabase

# Login
supabase login

# Inicializar projeto local
supabase init

# Rodar Supabase localmente
supabase start

# Parar Supabase local
supabase stop

# Ver status
supabase status
```

---

## 📱 Evolution API (WhatsApp)

```bash
# Se usando Docker (self-hosted)
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down

# Reiniciar
docker-compose restart
```

---

## 🎯 Atalhos Úteis

```bash
# Desenvolvimento completo (limpar + instalar + migrar + seed + rodar)
npm run dev:fresh() {
  rm -rf .next node_modules
  npm install
  npx prisma generate
  npx prisma migrate dev
  npx prisma db seed
  npm run dev
}

# Reset completo do banco
npm run db:reset

# Abrir Prisma Studio
npm run db:studio
```

---

## 📚 Recursos

- **Next.js Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **Supabase Docs:** https://supabase.com/docs
- **Shadcn UI:** https://ui.shadcn.com
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Mercado Pago API:** https://www.mercadopago.com.br/developers
- **Evolution API:** https://doc.evolution-api.com

---

## 🆘 Problemas Comuns

### Erro: "Can't reach database server"
```bash
# Verificar DATABASE_URL no .env.local
# Testar conexão:
npx prisma db pull
```

### Erro: "Module not found"
```bash
npm install
npx prisma generate
```

### Erro: "Port 3000 already in use"
```bash
# Matar processo na porta 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID [PID] /F

# Linux/Mac:
lsof -ti:3000 | xargs kill -9
```

### Build falha na Vercel
```bash
# Verificar se todas as env vars estão configuradas
# Verificar se prisma generate está no build script
# Ver logs completos na Vercel
```

---

**Dica:** Salve este arquivo e consulte sempre que precisar! 📌
