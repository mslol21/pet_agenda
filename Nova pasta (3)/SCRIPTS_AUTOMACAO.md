# 🚀 Scripts de Automação - PetAgenda Local

## 📦 Script de Setup Completo

Salve como `setup.sh` (Linux/Mac) ou `setup.ps1` (Windows):

### Windows (PowerShell)
```powershell
# setup.ps1
Write-Host "🚀 Iniciando setup do PetAgenda Local..." -ForegroundColor Green

# Verificar Node.js
Write-Host "`n📦 Verificando Node.js..." -ForegroundColor Yellow
node --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js não encontrado! Instale em: https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Criar projeto
Write-Host "`n📁 Criando projeto Next.js..." -ForegroundColor Yellow
npx create-next-app@latest petagenda-local --typescript --tailwind --app --use-npm --yes

# Entrar no diretório
Set-Location petagenda-local

# Instalar dependências
Write-Host "`n📦 Instalando dependências..." -ForegroundColor Yellow
npm install @prisma/client @supabase/supabase-js next-auth bcryptjs zod react-hook-form @hookform/resolvers date-fns axios
npm install -D prisma @types/bcryptjs

# Shadcn UI
Write-Host "`n🎨 Configurando Shadcn UI..." -ForegroundColor Yellow
npx shadcn-ui@latest init -y
npx shadcn-ui@latest add button card input label select textarea calendar dialog table badge

# Inicializar Prisma
Write-Host "`n🗄️ Inicializando Prisma..." -ForegroundColor Yellow
npx prisma init

# Copiar .env.example
Write-Host "`n🔐 Criando arquivo .env.local..." -ForegroundColor Yellow
Copy-Item ..\.env.example .env.local

# Inicializar Git
Write-Host "`n📝 Inicializando Git..." -ForegroundColor Yellow
git init
git add .
git commit -m "Initial commit - PetAgenda Local"

Write-Host "`n✅ Setup concluído!" -ForegroundColor Green
Write-Host "`nPróximos passos:" -ForegroundColor Cyan
Write-Host "1. Edite o arquivo .env.local com suas credenciais"
Write-Host "2. Cole o schema do Prisma em prisma/schema.prisma"
Write-Host "3. Execute: npx prisma migrate dev --name init"
Write-Host "4. Execute: npm run dev"
Write-Host "`n🎉 Bom desenvolvimento!" -ForegroundColor Green
```

### Linux/Mac (Bash)
```bash
#!/bin/bash
# setup.sh

echo "🚀 Iniciando setup do PetAgenda Local..."

# Verificar Node.js
echo -e "\n📦 Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado! Instale em: https://nodejs.org"
    exit 1
fi
node --version

# Criar projeto
echo -e "\n📁 Criando projeto Next.js..."
npx create-next-app@latest petagenda-local --typescript --tailwind --app --use-npm --yes

# Entrar no diretório
cd petagenda-local

# Instalar dependências
echo -e "\n📦 Instalando dependências..."
npm install @prisma/client @supabase/supabase-js next-auth bcryptjs zod react-hook-form @hookform/resolvers date-fns axios
npm install -D prisma @types/bcryptjs

# Shadcn UI
echo -e "\n🎨 Configurando Shadcn UI..."
npx shadcn-ui@latest init -y
npx shadcn-ui@latest add button card input label select textarea calendar dialog table badge

# Inicializar Prisma
echo -e "\n🗄️ Inicializando Prisma..."
npx prisma init

# Copiar .env.example
echo -e "\n🔐 Criando arquivo .env.local..."
cp ../.env.example .env.local

# Inicializar Git
echo -e "\n📝 Inicializando Git..."
git init
git add .
git commit -m "Initial commit - PetAgenda Local"

echo -e "\n✅ Setup concluído!"
echo -e "\nPróximos passos:"
echo "1. Edite o arquivo .env.local com suas credenciais"
echo "2. Cole o schema do Prisma em prisma/schema.prisma"
echo "3. Execute: npx prisma migrate dev --name init"
echo "4. Execute: npm run dev"
echo -e "\n🎉 Bom desenvolvimento!"
```

---

## 🗄️ Script de Reset do Banco

Salve como `reset-db.sh`:

```bash
#!/bin/bash

echo "⚠️  ATENÇÃO: Isso vai APAGAR TODOS OS DADOS do banco!"
read -p "Tem certeza? (digite 'SIM' para confirmar): " confirmacao

if [ "$confirmacao" != "SIM" ]; then
    echo "❌ Operação cancelada."
    exit 0
fi

echo "🗑️  Resetando banco de dados..."
npx prisma migrate reset --force

echo "✅ Banco resetado com sucesso!"
echo "📊 Dados de exemplo foram inseridos via seed."
```

---

## 📊 Script de Backup do Banco

Salve como `backup-db.sh`:

```bash
#!/bin/bash

# Criar diretório de backups
mkdir -p backups

# Nome do arquivo com timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="backups/backup_$TIMESTAMP.sql"

echo "💾 Criando backup do banco de dados..."

# Extrair DATABASE_URL do .env.local
DATABASE_URL=$(grep DATABASE_URL .env.local | cut -d '=' -f2)

# Fazer backup usando pg_dump (PostgreSQL)
pg_dump "$DATABASE_URL" > "$BACKUP_FILE"

if [ $? -eq 0 ]; then
    echo "✅ Backup criado com sucesso: $BACKUP_FILE"
    
    # Comprimir backup
    gzip "$BACKUP_FILE"
    echo "📦 Backup comprimido: ${BACKUP_FILE}.gz"
else
    echo "❌ Erro ao criar backup!"
    exit 1
fi

# Manter apenas os últimos 7 backups
echo "🧹 Limpando backups antigos..."
ls -t backups/backup_*.sql.gz | tail -n +8 | xargs rm -f

echo "✅ Processo concluído!"
```

---

## 🚀 Script de Deploy

Salve como `deploy.sh`:

```bash
#!/bin/bash

echo "🚀 Iniciando processo de deploy..."

# Verificar se há mudanças não commitadas
if [[ -n $(git status -s) ]]; then
    echo "⚠️  Você tem mudanças não commitadas!"
    read -p "Deseja commitá-las agora? (s/n): " commit_now
    
    if [ "$commit_now" = "s" ]; then
        git add .
        read -p "Mensagem do commit: " commit_msg
        git commit -m "$commit_msg"
    else
        echo "❌ Deploy cancelado. Commite suas mudanças primeiro."
        exit 1
    fi
fi

# Rodar testes (se houver)
echo "🧪 Rodando testes..."
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Testes falharam! Corrija os erros antes de fazer deploy."
    exit 1
fi

# Build
echo "🔨 Fazendo build..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build falhou!"
    exit 1
fi

# Push para repositório
echo "📤 Enviando para repositório..."
git push origin main

# Deploy na Vercel
echo "🌐 Fazendo deploy na Vercel..."
vercel --prod

echo "✅ Deploy concluído com sucesso!"
echo "🎉 Seu site está no ar!"
```

---

## 📧 Script de Envio de Lembretes

Salve como `send-reminders.js`:

```javascript
// send-reminders.js
// Execute com: node send-reminders.js

const { PrismaClient } = require('@prisma/client')
const axios = require('axios')

const prisma = new PrismaClient()

async function sendReminders() {
  console.log('📧 Enviando lembretes...')
  
  // Data de amanhã
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)
  
  const dayAfter = new Date(tomorrow)
  dayAfter.setDate(dayAfter.getDate() + 1)
  
  // Buscar agendamentos de amanhã
  const agendamentos = await prisma.agendamento.findMany({
    where: {
      dataHora: {
        gte: tomorrow,
        lt: dayAfter
      },
      status: {
        in: ['pendente', 'confirmado']
      },
      lembreteEnviado: false
    },
    include: {
      usuario: true,
      pet: true,
      servico: true,
      petshop: true
    }
  })
  
  console.log(`📊 ${agendamentos.length} lembretes para enviar`)
  
  for (const agendamento of agendamentos) {
    try {
      const mensagem = `Olá ${agendamento.usuario.nome}! 👋

Lembrete: ${agendamento.pet.nome} tem ${agendamento.servico.nome} agendado para amanhã às ${agendamento.dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}.

📍 ${agendamento.petshop.nome}

Confirme sua presença respondendo SIM.

Até lá! 🐕`
      
      // Enviar via WhatsApp (Evolution API)
      await axios.post(
        `${process.env.EVOLUTION_API_URL}/message/sendText/${process.env.EVOLUTION_INSTANCE_NAME}`,
        {
          number: agendamento.usuario.telefone,
          text: mensagem
        },
        {
          headers: {
            'apikey': process.env.EVOLUTION_API_KEY
          }
        }
      )
      
      // Marcar como enviado
      await prisma.agendamento.update({
        where: { id: agendamento.id },
        data: { lembreteEnviado: true }
      })
      
      // Registrar log
      await prisma.logWhatsapp.create({
        data: {
          agendamentoId: agendamento.id,
          tipo: 'lembrete_24h',
          telefone: agendamento.usuario.telefone,
          mensagem,
          enviado: true,
          enviadoEm: new Date()
        }
      })
      
      console.log(`✅ Lembrete enviado para ${agendamento.usuario.nome}`)
      
      // Aguardar 1 segundo entre envios
      await new Promise(resolve => setTimeout(resolve, 1000))
      
    } catch (error) {
      console.error(`❌ Erro ao enviar para ${agendamento.usuario.nome}:`, error.message)
      
      // Registrar erro
      await prisma.logWhatsapp.create({
        data: {
          agendamentoId: agendamento.id,
          tipo: 'lembrete_24h',
          telefone: agendamento.usuario.telefone,
          mensagem: '',
          enviado: false,
          erro: error.message
        }
      })
    }
  }
  
  console.log('✅ Processo concluído!')
  await prisma.$disconnect()
}

sendReminders().catch(console.error)
```

---

## ⏰ Configurar Cron Job

### Linux/Mac (crontab)
```bash
# Editar crontab
crontab -e

# Adicionar linha (executar todo dia às 10h)
0 10 * * * cd /caminho/para/petagenda-local && node send-reminders.js >> logs/reminders.log 2>&1
```

### Windows (Task Scheduler)
```powershell
# Criar tarefa agendada
$action = New-ScheduledTaskAction -Execute "node" -Argument "C:\caminho\para\send-reminders.js"
$trigger = New-ScheduledTaskTrigger -Daily -At 10:00AM
Register-ScheduledTask -TaskName "PetAgenda-Reminders" -Action $action -Trigger $trigger
```

---

## 📊 Script de Relatório Mensal

Salve como `monthly-report.js`:

```javascript
// monthly-report.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function generateMonthlyReport(petshopId, year, month) {
  console.log(`📊 Gerando relatório de ${month}/${year}...`)
  
  const startDate = new Date(year, month - 1, 1)
  const endDate = new Date(year, month, 0, 23, 59, 59)
  
  // Buscar agendamentos do mês
  const agendamentos = await prisma.agendamento.findMany({
    where: {
      petshopId,
      dataHora: {
        gte: startDate,
        lte: endDate
      }
    },
    include: {
      servico: true
    }
  })
  
  // Calcular métricas
  const total = agendamentos.length
  const concluidos = agendamentos.filter(a => a.status === 'concluido').length
  const cancelados = agendamentos.filter(a => a.status === 'cancelado').length
  const faturamento = agendamentos
    .filter(a => a.status === 'concluido')
    .reduce((sum, a) => sum + a.servico.preco, 0)
  
  const ticketMedio = concluidos > 0 ? faturamento / concluidos : 0
  
  // Serviços mais vendidos
  const servicosCount = {}
  agendamentos
    .filter(a => a.status === 'concluido')
    .forEach(a => {
      servicosCount[a.servico.nome] = (servicosCount[a.servico.nome] || 0) + 1
    })
  
  const servicosMaisVendidos = Object.entries(servicosCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
  
  // Exibir relatório
  console.log('\n📈 RELATÓRIO MENSAL')
  console.log('='.repeat(50))
  console.log(`Período: ${month}/${year}`)
  console.log(`Total de Agendamentos: ${total}`)
  console.log(`Concluídos: ${concluidos}`)
  console.log(`Cancelados: ${cancelados}`)
  console.log(`Faturamento: R$ ${faturamento.toFixed(2)}`)
  console.log(`Ticket Médio: R$ ${ticketMedio.toFixed(2)}`)
  console.log('\nServiços Mais Vendidos:')
  servicosMaisVendidos.forEach(([servico, qtd], i) => {
    console.log(`${i + 1}. ${servico} - ${qtd}x`)
  })
  console.log('='.repeat(50))
  
  await prisma.$disconnect()
}

// Usar: node monthly-report.js [petshop_id] [ano] [mes]
const [petshopId, year, month] = process.argv.slice(2)
generateMonthlyReport(petshopId, parseInt(year), parseInt(month))
```

---

## 💡 Como Usar os Scripts

1. **Dar permissão de execução** (Linux/Mac):
```bash
chmod +x setup.sh
chmod +x reset-db.sh
chmod +x backup-db.sh
chmod +x deploy.sh
```

2. **Executar**:
```bash
./setup.sh
./backup-db.sh
node send-reminders.js
```

3. **Agendar tarefas** (cron):
```bash
# Backup diário às 2h da manhã
0 2 * * * /caminho/para/backup-db.sh

# Lembretes diários às 10h
0 10 * * * cd /caminho/para/projeto && node send-reminders.js
```

---

**Todos os scripts estão prontos para uso!** 🚀

Adapte conforme sua necessidade e ambiente.
