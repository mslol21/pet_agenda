# 🚀 Deploy na Vercel - Configuração Correta

## ⚠️ Problema Identificado

A Vercel está procurando o `package.json` no diretório raiz do repositório, mas o projeto Next.js está dentro da pasta `petagenda-local`.

## ✅ Solução: Configurar Root Directory

### Passo a Passo na Vercel

1. **Acesse seu projeto na Vercel**
   - Vá para [vercel.com/dashboard](https://vercel.com/dashboard)
   - Clique no projeto ou em "Import Project"

2. **Configure o Root Directory**
   - Na seção **"Build and Output Settings"**
   - Encontre o campo **"Root Directory"**
   - Clique em **"Edit"** ou **"Override"**
   - Digite: `petagenda-local`
   - Clique em **"Continue"** ou **"Save"**

3. **Configure as Variáveis de Ambiente**
   - Vá para **"Environment Variables"**
   - Adicione as seguintes variáveis:

   ```
   DATABASE_URL=postgresql://seu_usuario:senha@host:5432/petagenda
   NEXTAUTH_SECRET=sua-secret-key-aqui
   NEXTAUTH_URL=https://seu-dominio.vercel.app
   ```

   **Para Supabase (se estiver usando):**
   ```
   NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
   ```

4. **Deploy**
   - Clique em **"Deploy"**
   - Aguarde o build completar

## 🎯 Configuração Visual

```
┌─────────────────────────────────────────┐
│ Import Git Repository                   │
├─────────────────────────────────────────┤
│ Repository: mslol21/massa               │
│                                         │
│ Root Directory: petagenda-local  ← AQUI│
│                                         │
│ Framework Preset: Next.js               │
│ Build Command: npm run build            │
│ Output Directory: .next                 │
└─────────────────────────────────────────┘
```

## 🔧 Alternativa: Mover Projeto para Raiz

Se preferir, posso mover todos os arquivos do `petagenda-local` para a raiz do repositório. Isso eliminaria a necessidade de configurar o Root Directory.

**Vantagens:**
- ✅ Deploy mais simples
- ✅ Configuração padrão da Vercel

**Desvantagens:**
- ⚠️ Reorganização de arquivos
- ⚠️ Precisa atualizar o repositório

## 📝 Checklist de Deploy

- [ ] Criar projeto na Vercel
- [ ] Importar repositório do GitHub
- [ ] Configurar Root Directory: `petagenda-local`
- [ ] Adicionar variáveis de ambiente
- [ ] Fazer deploy
- [ ] Testar aplicação no domínio da Vercel

## 🆘 Troubleshooting

### Erro: "No Next.js version detected"
**Solução:** Certifique-se de que o Root Directory está configurado como `petagenda-local`

### Erro de Build
**Solução:** Verifique se todas as variáveis de ambiente estão configuradas corretamente

### Erro de Database
**Solução:** 
1. Use Supabase (recomendado para deploy)
2. Configure o `DATABASE_URL` com a URL do Supabase
3. Execute `npx prisma db push` localmente primeiro

## 🎉 Após o Deploy

1. Acesse a URL fornecida pela Vercel
2. Teste o login/cadastro
3. Verifique se o banco de dados está conectado
4. Configure domínio personalizado (opcional)

---

**Precisa de ajuda?** Me avise qual solução você prefere:
1. Configurar Root Directory na Vercel (mais rápido)
2. Mover projeto para raiz do repositório (mais limpo)
