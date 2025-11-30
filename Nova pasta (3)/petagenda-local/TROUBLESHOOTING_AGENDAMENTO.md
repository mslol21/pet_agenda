# 🔧 Troubleshooting - Erro ao Criar Agendamento

## 🎯 Como Identificar o Erro

### 1. Verifique o Console do Navegador

Abra o DevTools (F12) e vá na aba **Console**. Procure por erros em vermelho.

### 2. Verifique o Terminal do Servidor

No terminal onde está rodando `npm run dev`, procure pelos logs:

```
=== API AGENDAMENTOS - POST ===
1. Body recebido: { ... }
2. Dados validados: { ... }
3. Verificando cliente existente...
```

---

## 🐛 Erros Comuns e Soluções

### Erro 1: "column 'role' does not exist"

**Causa:** A tabela `usuarios` não tem a coluna `role`

**Solução:**
```sql
-- Execute no Supabase SQL Editor:
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'cliente';
```

### Erro 2: "petshop_id is not a valid UUID"

**Causa:** O ID do petshop não está sendo passado corretamente

**Solução:** Verifique se o petshop tem ID válido:
```javascript
// No código, adicione log:
console.log('Petshop ID:', petshop.id)
```

### Erro 3: "servico_id is not a valid UUID"

**Causa:** O serviço selecionado não tem ID válido

**Solução:** Verifique se há serviços cadastrados:
1. Acesse `/dashboard/servicos`
2. Cadastre pelo menos um serviço
3. Tente agendar novamente

### Erro 4: "Dados inválidos"

**Causa:** Validação Zod falhou

**Solução:** Verifique os campos obrigatórios:
- `petshop_id` (UUID)
- `cliente_nome` (mínimo 3 caracteres)
- `cliente_telefone` (mínimo 10 caracteres)
- `servico_id` (UUID)
- `data_agendamento` (formato: YYYY-MM-DDTHH:mm:ss)

---

## 🧪 Como Testar

### Teste 1: Verificar Estrutura do Banco

```sql
-- Execute no Supabase SQL Editor:

-- 1. Verificar tabela usuarios
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'usuarios';

-- 2. Verificar tabela agendamentos
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'agendamentos';

-- 3. Verificar se há serviços
SELECT id, nome, preco FROM servicos LIMIT 5;
```

### Teste 2: Criar Agendamento Manualmente

```sql
-- Execute no Supabase SQL Editor:

-- 1. Pegar IDs necessários
SELECT id, slug FROM petshops LIMIT 1;
SELECT id, nome FROM servicos LIMIT 1;

-- 2. Criar cliente de teste
INSERT INTO usuarios (petshop_id, nome, telefone, role)
VALUES ('SEU_PETSHOP_ID', 'Cliente Teste', '11999999999', 'cliente')
RETURNING id;

-- 3. Criar agendamento de teste
INSERT INTO agendamentos (petshop_id, cliente_id, servico_id, data_agendamento, status)
VALUES (
  'SEU_PETSHOP_ID',
  'SEU_CLIENTE_ID',
  'SEU_SERVICO_ID',
  '2024-12-01 14:00:00',
  'pendente'
);
```

### Teste 3: Usar Script de Teste

```bash
# 1. Edite test-agendamento.js com IDs reais
# 2. Execute:
node test-agendamento.js
```

---

## 📋 Checklist de Verificação

- [ ] Servidor Next.js está rodando (porta 3003)
- [ ] Supabase está configurado (`.env.local`)
- [ ] Tabela `usuarios` tem coluna `role`
- [ ] Tabela `agendamentos` existe
- [ ] Há pelo menos 1 serviço cadastrado
- [ ] Petshop tem ID válido
- [ ] Console do navegador não mostra erros
- [ ] Terminal do servidor mostra logs

---

## 🆘 Se Nada Funcionar

1. **Copie os logs do terminal** (tudo que aparece após "=== API AGENDAMENTOS - POST ===")
2. **Copie o erro do console do navegador** (F12 → Console)
3. **Me envie** para que eu possa ajudar

---

## 🔍 Logs Esperados (Sucesso)

```
=== API AGENDAMENTOS - POST ===
1. Body recebido: { petshop_id: '...', cliente_nome: 'João', ... }
2. Dados validados: { ... }
3. Verificando cliente existente...
Resultado verificação: { existingCliente: null, checkError: null }
5. Criando novo cliente...
Resultado criar cliente: { newCliente: { id: '...' }, clienteError: null }
6. Cliente criado com ID: ...
7. Criando agendamento...
Resultado criar agendamento: { agendamento: { ... }, agendamentoError: null }
8. Agendamento criado com sucesso!
```

---

**Qual erro está aparecendo para você?**
