# ⚡ Deploy Rápido - Checklist

## 🎯 5 Passos para Deploy

### ✅ 1. GitHub (5 min)

```bash
cd "C:\Users\massa\Nova pasta (3)\petagenda-local"
git init
git add .
git commit -m "Deploy PetAgenda Local"
git remote add origin https://github.com/SEU_USUARIO/petagenda-local.git
git push -u origin main
```

### ✅ 2. Vercel (3 min)

1. https://vercel.com → Login com GitHub
2. "Add New Project"
3. Selecione `petagenda-local`
4. Clique "Import"

### ✅ 3. Variáveis de Ambiente (2 min)

Na Vercel, adicione:

```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
```

**Onde pegar:**
- Supabase → Settings → API

### ✅ 4. Deploy (1 min)

Clique "Deploy" e aguarde!

### ✅ 5. Configurar Supabase (1 min)

Supabase → Authentication → URL Configuration:
- Site URL: `https://petagenda-local.vercel.app`
- Redirect URLs: `https://petagenda-local.vercel.app/**`

---

## 🎉 Pronto!

**Seu site:** https://petagenda-local.vercel.app

**Total:** ~12 minutos

---

## 🔄 Atualizações

```bash
git add .
git commit -m "Atualização"
git push
```

Deploy automático! ✨

---

## 📋 Checklist Final

- [ ] GitHub criado
- [ ] Vercel conectado
- [ ] Variáveis configuradas
- [ ] Deploy concluído
- [ ] Supabase configurado
- [ ] Site testado
- [ ] Login funciona
- [ ] Agendamentos funcionam

---

**Guia completo:** `DEPLOY_VERCEL.md`
