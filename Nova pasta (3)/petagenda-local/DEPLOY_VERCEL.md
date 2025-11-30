# 🚀 Deploy PetAgenda Local na Vercel

## 📋 Pré-requisitos

- ✅ Conta no GitHub
- ✅ Conta na Vercel (gratuita)
- ✅ Conta no Supabase (gratuita)
- ✅ Projeto funcionando localmente

---

## 🔧 Passo 1: Preparar o Projeto

### 1.1 Criar arquivo `.gitignore`

Certifique-se de que `.env.local` está no `.gitignore`:

```gitignore
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

### 1.2 Verificar `package.json`

Certifique-se de que os scripts estão corretos:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

---

## 📦 Passo 2: Subir para o GitHub

### 2.1 Inicializar Git (se ainda não fez)

```bash
cd "C:\Users\massa\Nova pasta (3)\petagenda-local"
git init
git add .
git commit -m "Initial commit - PetAgenda Local"
```

### 2.2 Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Nome: `petagenda-local`
3. Descrição: `Sistema de agendamento para petshops`
4. Público ou Privado (sua escolha)
5. **NÃO** marque "Add README"
6. Clique "Create repository"

### 2.3 Conectar e Enviar

```bash
git remote add origin https://github.com/SEU_USUARIO/petagenda-local.git
git branch -M main
git push -u origin main
```

---

## 🌐 Passo 3: Deploy na Vercel

### 3.1 Acessar Vercel

1. Acesse: https://vercel.com
2. Clique "Sign Up" ou "Login"
3. Faça login com GitHub

### 3.2 Importar Projeto

1. Clique "Add New..." → "Project"
2. Encontre `petagenda-local` na lista
3. Clique "Import"

### 3.3 Configurar Projeto

**Framework Preset:** Next.js (detectado automaticamente)

**Root Directory:** `./` (deixe padrão)

**Build Command:** `npm run build` (padrão)

**Output Directory:** `.next` (padrão)

### 3.4 Configurar Variáveis de Ambiente

Clique em "Environment Variables" e adicione:

```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
```

**Onde encontrar:**
1. Acesse: https://supabase.com
2. Seu projeto → Settings → API
3. Copie:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3.5 Deploy

1. Clique "Deploy"
2. Aguarde 2-3 minutos
3. ✅ Deploy concluído!

---

## 🎯 Passo 4: Configurar Domínio (Opcional)

### 4.1 Domínio Vercel (Gratuito)

Você receberá automaticamente:
```
https://petagenda-local.vercel.app
```

### 4.2 Domínio Personalizado

1. Vá em "Settings" → "Domains"
2. Adicione seu domínio
3. Configure DNS conforme instruções

---

## 🔒 Passo 5: Configurar Supabase para Produção

### 5.1 Adicionar URL da Vercel

1. Supabase → Authentication → URL Configuration
2. Site URL: `https://petagenda-local.vercel.app`
3. Redirect URLs: `https://petagenda-local.vercel.app/**`

### 5.2 Configurar CORS (se necessário)

Já está configurado no código com `supabase.ts`

---

## ✅ Passo 6: Testar Produção

### 6.1 Acessar Site

```
https://petagenda-local.vercel.app
```

### 6.2 Testar Funcionalidades

- [ ] Landing page carrega
- [ ] Login funciona
- [ ] Dashboard carrega
- [ ] Criar serviço
- [ ] Criar agendamento
- [ ] Confirmar agendamento
- [ ] WhatsApp abre

---

## 🔄 Passo 7: Atualizações Futuras

### 7.1 Fazer Mudanças Localmente

```bash
# Edite os arquivos
git add .
git commit -m "Descrição da mudança"
git push
```

### 7.2 Deploy Automático

A Vercel detecta automaticamente e faz deploy!

---

## 🐛 Troubleshooting

### Erro: "Build Failed"

**Solução:**
1. Verifique logs na Vercel
2. Teste `npm run build` localmente
3. Corrija erros de TypeScript

### Erro: "Supabase Connection Failed"

**Solução:**
1. Verifique variáveis de ambiente
2. Confirme URLs no Supabase
3. Verifique CORS

### Erro: "404 Not Found"

**Solução:**
1. Verifique se build completou
2. Limpe cache: Settings → Clear Cache
3. Redeploy

---

## 📊 Monitoramento

### Analytics (Gratuito)

1. Vercel → Analytics
2. Veja visitantes, performance, etc.

### Logs

1. Vercel → Deployments → Logs
2. Veja erros em tempo real

---

## 💰 Custos

### Plano Gratuito Vercel:

- ✅ 100 GB bandwidth/mês
- ✅ Domínio .vercel.app
- ✅ SSL automático
- ✅ Deploy ilimitados
- ✅ Serverless functions

**Suficiente para começar!**

### Plano Gratuito Supabase:

- ✅ 500 MB database
- ✅ 1 GB file storage
- ✅ 2 GB bandwidth
- ✅ 50.000 usuários ativos/mês

**Perfeito para MVP!**

---

## 🎉 Pronto!

Seu PetAgenda Local está no ar! 🚀

**URL:** https://petagenda-local.vercel.app

**Próximos Passos:**
1. Compartilhe com clientes
2. Colete feedback
3. Itere e melhore

---

## 📞 Suporte

**Vercel:** https://vercel.com/docs
**Supabase:** https://supabase.com/docs
**Next.js:** https://nextjs.org/docs
