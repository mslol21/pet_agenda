# 🚀 DEPLOY RÁPIDO NA VERCEL

## ✅ Problema Resolvido!

Adicionei o arquivo `vercel.json` na raiz do repositório que configura automaticamente o diretório correto.

## 📋 Passo a Passo Simples

### 1️⃣ Acesse a Vercel
- Vá para: https://vercel.com/new
- Faça login com sua conta GitHub

### 2️⃣ Importe o Repositório
- Clique em **"Import Git Repository"**
- Selecione: **`mslol21/pet_agenda`**
- Clique em **"Import"**

### 3️⃣ Configure as Variáveis de Ambiente

**IMPORTANTE:** Antes de fazer o deploy, adicione estas variáveis:

```env
DATABASE_URL=sua_url_do_supabase_aqui
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
```

**Como obter as credenciais do Supabase:**
1. Acesse: https://supabase.com/dashboard
2. Crie um novo projeto (ou use existente)
3. Vá em **Settings** → **API**
4. Copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Vá em **Settings** → **Database** → **Connection String**
   - Copie a **Connection Pooling** → `DATABASE_URL`

### 4️⃣ Deploy
- Clique em **"Deploy"**
- Aguarde 2-3 minutos
- ✅ Pronto!

## 🎯 Configuração Automática

O arquivo `vercel.json` já está configurado para:
- ✅ Detectar o projeto Next.js em `petagenda-local`
- ✅ Executar build corretamente
- ✅ Configurar output directory

**Você NÃO precisa configurar Root Directory manualmente!**

## 🔗 Links Importantes

- **Repositório GitHub:** https://github.com/mslol21/pet_agenda
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Supabase Dashboard:** https://supabase.com/dashboard

## 🆘 Se der erro

### Erro: "No Next.js version detected"
**Solução:** O `vercel.json` deve resolver isso automaticamente. Se persistir:
1. Vá em **Settings** do projeto na Vercel
2. Em **Root Directory**, coloque: `petagenda-local`

### Erro de Build
**Solução:** Verifique se as variáveis de ambiente estão corretas

### Erro de Database
**Solução:** 
1. Certifique-se de que o Supabase está configurado
2. Execute localmente: `npx prisma db push`
3. Verifique se o `DATABASE_URL` está correto

## ✨ Após o Deploy

1. A Vercel vai te dar uma URL tipo: `https://pet-agenda-xxx.vercel.app`
2. Acesse e teste o sistema
3. Configure domínio personalizado (opcional)

---

**🎉 Tudo pronto para deploy!**
