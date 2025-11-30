# 🐛 GUIA DE TROUBLESHOOTING - Erro "Unexpected token '<'"

## ❌ Erro Reportado
```
Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

## 🔍 Causa Provável

Este erro acontece quando a API retorna HTML ao invés de JSON. Possíveis causas:

1. **Erro de compilação no Next.js**
2. **Erro de importação** (módulo não encontrado)
3. **Erro de sintaxe** no código da API
4. **Variáveis de ambiente faltando**

## ✅ SOLUÇÃO RÁPIDA

### Passo 1: Verificar se o servidor está rodando

Abra o terminal onde rodou `npm run dev` e verifique se há erros em vermelho.

### Passo 2: Verificar variáveis de ambiente

Certifique-se que o arquivo `.env.local` existe e tem:

```bash
NEXT_PUBLIC_SUPABASE_URL="https://fjfuwvhbhpmsfxetlpwn.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqZnV3dmhiaHBtc2Z4ZXRscHduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNjMxODksImV4cCI6MjA3OTkzOTE4OX0.RzgFq9QV0qvLNJm7PZ4ATWcEmWkLOsQZrEzoSczfE9A"
```

### Passo 3: Reiniciar o servidor

```bash
# Parar o servidor (Ctrl+C)
# Limpar cache
Remove-Item -Recurse -Force .next

# Rodar novamente
npm run dev
```

### Passo 4: Testar a API diretamente

Abra o navegador em: http://localhost:3000/api/auth/login

Você deve ver um erro JSON (não HTML), algo como:
```json
{"error": "Dados inválidos"}
```

Se ver HTML, significa que há erro de compilação.

## 🔧 SOLUÇÃO ALTERNATIVA

Se o erro persistir, teste com dados mockados:

### Modificar página de login para testar sem API:

```typescript
// app/login/page.tsx - Adicionar no handleSubmit:

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  // TESTE: Pular API e ir direto pro dashboard
  localStorage.setItem('user', JSON.stringify({
    id: '123',
    nome: 'Teste',
    telefone: telefone,
    role: 'admin',
    petshop: {
      id: '456',
      nome: 'Teste Petshop',
      slug: 'teste'
    }
  }))
  
  router.push('/dashboard')
  return
  
  // ... resto do código
}
```

Isso permite testar o dashboard sem depender da API.

## 📝 LOGS ÚTEIS

Para ver erros detalhados, adicione console.log nas APIs:

```typescript
// app/api/auth/register/route.ts
export async function POST(request: Request) {
  console.log('=== REGISTER API CHAMADA ===')
  
  try {
    const body = await request.json()
    console.log('Body recebido:', body)
    
    // ... resto do código
  } catch (error) {
    console.error('ERRO NA API:', error)
    // ... resto do código
  }
}
```

Depois verifique o terminal onde rodou `npm run dev`.

## 🆘 Se Nada Funcionar

1. Verifique se o Supabase está acessível:
   - Acesse: https://fjfuwvhbhpmsfxetlpwn.supabase.co
   - Deve carregar a página do Supabase

2. Teste a conexão do Supabase:
   ```typescript
   // Criar arquivo test-supabase.ts na raiz
   import { supabase } from './lib/supabase'
   
   async function test() {
     const { data, error } = await supabase
       .from('petshops')
       .select('*')
       .limit(1)
     
     console.log('Data:', data)
     console.log('Error:', error)
   }
   
   test()
   ```

3. Rodar: `npx ts-node test-supabase.ts`

---

**Me avise qual erro específico aparece no terminal do `npm run dev`!**
