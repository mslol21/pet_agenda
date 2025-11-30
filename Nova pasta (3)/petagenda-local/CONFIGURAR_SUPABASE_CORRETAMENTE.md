# 🔧 CONFIGURAÇÃO CORRETA DO SUPABASE

## 📋 Informações do Seu Projeto

**Project Reference:** fjfuwvhbhpmsfxetlpwn  
**URL da API:** https://fjfuwvhbhpmsfxetlpwn.supabase.co  
**Anon Key:** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

---

## ✅ PASSO A PASSO PARA CORRIGIR

### 1. Obter a String de Conexão Correta

Acesse: https://supabase.com/dashboard/project/fjfuwvhbhpmsfxetlpwn/settings/database

Você verá várias opções de conexão. Use a **Connection Pooling** (Pooler):

#### Opção A: Session Mode (Recomendado para Next.js)
```
Host: aws-0-us-east-1.pooler.supabase.com
Database: postgres
Port: 5432
User: postgres.fjfuwvhbhpmsfxetlpwn
Password: [sua-senha]
```

**String de conexão:**
```
postgresql://postgres.fjfuwvhbhpmsfxetlpwn:[SUA-SENHA]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
```

#### Opção B: Transaction Mode (Mais rápido)
```
Host: aws-0-us-east-1.pooler.supabase.com
Port: 6543
```

**String de conexão:**
```
postgresql://postgres.fjfuwvhbhpmsfxetlpwn:[SUA-SENHA]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

#### Opção C: Conexão Direta (Sem pooler)
```
Host: db.fjfuwvhbhpmsfxetlpwn.supabase.co
Port: 5432
```

**String de conexão:**
```
postgresql://postgres:[SUA-SENHA]@db.fjfuwvhbhpmsfxetlpwn.supabase.co:5432/postgres
```

---

### 2. Atualizar o arquivo `.env.local`

Edite o arquivo `.env.local` na raiz do projeto:

```bash
# ================================
# SUPABASE - CONFIGURAÇÃO CORRETA
# ================================

# Opção 1: Transaction Mode (RECOMENDADO - Mais rápido)
DATABASE_URL="postgresql://postgres.fjfuwvhbhpmsfxetlpwn:[SUA-SENHA]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Opção 2: Session Mode (Se a opção 1 não funcionar)
# DATABASE_URL="postgresql://postgres.fjfuwvhbhpmsfxetlpwn:[SUA-SENHA]@aws-0-us-east-1.pooler.supabase.com:5432/postgres"

# Opção 3: Conexão Direta (Última opção)
# DATABASE_URL="postgresql://postgres:[SUA-SENHA]@db.fjfuwvhbhpmsfxetlpwn.supabase.co:5432/postgres"

# API Supabase (NÃO MUDAR)
NEXT_PUBLIC_SUPABASE_URL="https://fjfuwvhbhpmsfxetlpwn.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqZnV3dmhiaHBtc2Z4ZXRscHduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNjMxODksImV4cCI6MjA3OTkzOTE4OX0.RzgFq9QV0qvLNJm7PZ4ATWcEmWkLOsQZrEzoSczfE9A"

# NextAuth
NEXTAUTH_SECRET="petagenda-local-secret-2024-change-this"
NEXTAUTH_URL="http://localhost:3000"
```

**IMPORTANTE:** Substitua `[SUA-SENHA]` pela senha do banco de dados!

---

### 3. Como Obter a Senha do Banco

Se você esqueceu a senha:

1. Acesse: https://supabase.com/dashboard/project/fjfuwvhbhpmsfxetlpwn/settings/database
2. Clique em **"Reset database password"**
3. Defina uma nova senha
4. Copie a senha
5. Cole no `.env.local`

---

### 4. Testar a Conexão

Depois de configurar, teste:

```bash
# Parar o servidor (Ctrl+C)

# Limpar cache
Remove-Item -Recurse -Force .next

# Rodar novamente
npm run dev
```

---

## 🧪 TESTE RÁPIDO DA CONEXÃO

Crie um arquivo `test-connection.js` na raiz:

```javascript
// test-connection.js
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://fjfuwvhbhpmsfxetlpwn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqZnV3dmhiaHBtc2Z4ZXRscHduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNjMxODksImV4cCI6MjA3OTkzOTE4OX0.RzgFq9QV0qvLNJm7PZ4ATWcEmWkLOsQZrEzoSczfE9A'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log('🧪 Testando conexão com Supabase...\n')
  
  try {
    const { data, error } = await supabase
      .from('petshops')
      .select('*')
      .limit(1)
    
    if (error) {
      console.error('❌ Erro:', error.message)
      return
    }
    
    console.log('✅ Conexão OK!')
    console.log('📊 Dados encontrados:', data ? data.length : 0)
    if (data && data.length > 0) {
      console.log('📝 Primeiro registro:', data[0])
    }
  } catch (err) {
    console.error('❌ Erro na conexão:', err.message)
  }
}

testConnection()
```

Execute:
```bash
node test-connection.js
```

Se funcionar, você verá: **✅ Conexão OK!**

---

## 🔍 ERROS COMUNS E SOLUÇÕES

### Erro: "connection timeout"
**Solução:** Use Transaction Mode (porta 6543) com `?pgbouncer=true`

### Erro: "password authentication failed"
**Solução:** Resete a senha no dashboard do Supabase

### Erro: "database does not exist"
**Solução:** Verifique se o nome do banco é `postgres` (não `petagenda`)

### Erro: "too many connections"
**Solução:** Use Connection Pooling (pooler) ao invés de conexão direta

---

## 📝 CONFIGURAÇÃO FINAL RECOMENDADA

Use esta configuração no `.env.local`:

```bash
# Transaction Mode com Pooler (MELHOR OPÇÃO)
DATABASE_URL="postgresql://postgres.fjfuwvhbhpmsfxetlpwn:[SUA-SENHA]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

NEXT_PUBLIC_SUPABASE_URL="https://fjfuwvhbhpmsfxetlpwn.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqZnV3dmhiaHBtc2Z4ZXRscHduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNjMxODksImV4cCI6MjA3OTkzOTE4OX0.RzgFq9QV0qvLNJm7PZ4ATWcEmWkLOsQZrEzoSczfE9A"

NEXTAUTH_SECRET="petagenda-local-secret-2024"
NEXTAUTH_URL="http://localhost:3000"
```

---

## ✅ CHECKLIST FINAL

- [ ] Obtive a senha do banco de dados
- [ ] Atualizei o `.env.local` com a string de conexão correta
- [ ] Testei com `node test-connection.js`
- [ ] Limpei o cache (`.next`)
- [ ] Reiniciei o servidor (`npm run dev`)
- [ ] Testei a página de cadastro

---

**Qual erro específico você está vendo? Me mostre a mensagem de erro completa!**
