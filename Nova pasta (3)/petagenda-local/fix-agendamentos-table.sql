-- SCRIPT SQL PARA CORRIGIR TABELA AGENDAMENTOS
-- Execute este script no Supabase SQL Editor

-- 1. Adicionar colunas de cliente na tabela agendamentos
ALTER TABLE agendamentos 
ADD COLUMN IF NOT EXISTS cliente_nome TEXT,
ADD COLUMN IF NOT EXISTS cliente_telefone TEXT;

-- 2. Tornar cliente_id opcional (pode ser NULL)
ALTER TABLE agendamentos 
ALTER COLUMN cliente_id DROP NOT NULL;

-- 3. Verificar estrutura da tabela
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'agendamentos'
ORDER BY ordinal_position;

-- 4. Testar inserção
INSERT INTO agendamentos (
  petshop_id,
  cliente_nome,
  cliente_telefone,
  servico_id,
  data_agendamento,
  status
) VALUES (
  (SELECT id FROM petshops LIMIT 1),
  'Cliente Teste',
  '11999999999',
  (SELECT id FROM servicos LIMIT 1),
  NOW() + INTERVAL '1 day',
  'pendente'
) RETURNING *;

-- Se funcionou, delete o teste:
-- DELETE FROM agendamentos WHERE cliente_nome = 'Cliente Teste';
