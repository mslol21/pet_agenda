# 🔧 CORREÇÃO URGENTE - Erro 500 ao Criar Agendamento

## ⚡ SOLUÇÃO RÁPIDA (Execute Agora!)

### Passo 1: Abra o Supabase

1. Acesse: https://supabase.com
2. Entre no seu projeto
3. Vá em **SQL Editor** (ícone de banco de dados)

### Passo 2: Execute Este SQL

Copie e cole este código no SQL Editor:

```sql
-- Adicionar colunas de cliente na tabela agendamentos
ALTER TABLE agendamentos 
ADD COLUMN IF NOT EXISTS cliente_nome TEXT,
ADD COLUMN IF NOT EXISTS cliente_telefone TEXT;

-- Tornar cliente_id opcional
ALTER TABLE agendamentos 
ALTER COLUMN cliente_id DROP NOT NULL;
```

### Passo 3: Clique em "RUN"

Aguarde a mensagem de sucesso.

### Passo 4: Teste o Agendamento

1. Volte para: http://localhost:3003/petshopteste3
2. Tente criar um agendamento
3. Deve funcionar agora! ✅

---

## 📋 O Que Foi Mudado

**ANTES:**
- Agendamento dependia de criar cliente primeiro
- Tabela `usuarios` precisava ter coluna `role`
- Mais complexo e propenso a erros

**DEPOIS:**
- Agendamento salva dados do cliente direto
- Não depende da tabela `usuarios`
- Mais simples e direto

---

## 🧪 Verificar Se Funcionou

### No Terminal do Servidor:

Você deve ver:
```
=== API AGENDAMENTOS - POST ===
1. Body recebido: { ... }
2. Dados validados com sucesso
3. Criando agendamento...
4. Resultado: { sucesso: true, erro: null }
5. Agendamento criado com sucesso! ID: ...
```

### No Navegador:

Você deve ver:
```
✅ AGENDAMENTO CONFIRMADO COM SUCESSO!

📅 Serviço: ...
💰 Valor: R$ ...
...
```

---

## ❌ Se Ainda Der Erro

### Erro: "column cliente_nome does not exist"

**Solução:** Execute o SQL acima novamente

### Erro: "violates not-null constraint"

**Solução:** Execute este SQL:
```sql
ALTER TABLE agendamentos 
ALTER COLUMN cliente_id DROP NOT NULL;
```

### Erro: "relation agendamentos does not exist"

**Solução:** A tabela não existe! Execute:
```sql
CREATE TABLE agendamentos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  petshop_id UUID REFERENCES petshops(id) NOT NULL,
  cliente_id UUID REFERENCES usuarios(id),
  cliente_nome TEXT,
  cliente_telefone TEXT,
  servico_id UUID REFERENCES servicos(id) NOT NULL,
  data_agendamento TIMESTAMP NOT NULL,
  status TEXT DEFAULT 'pendente',
  observacoes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 📊 Estrutura Final da Tabela

```sql
agendamentos:
  - id (UUID, PK)
  - petshop_id (UUID, FK → petshops)
  - cliente_id (UUID, FK → usuarios, NULLABLE)
  - cliente_nome (TEXT) ← NOVO
  - cliente_telefone (TEXT) ← NOVO
  - servico_id (UUID, FK → servicos)
  - data_agendamento (TIMESTAMP)
  - status (TEXT)
  - observacoes (TEXT)
  - created_at (TIMESTAMP)
```

---

## ✅ Checklist

- [ ] Executei o SQL no Supabase
- [ ] Vi mensagem de sucesso
- [ ] Servidor Next.js está rodando
- [ ] Tentei criar agendamento
- [ ] Funcionou! 🎉

---

**Execute o SQL acima e me diga se funcionou!**
