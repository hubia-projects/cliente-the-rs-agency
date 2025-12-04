# 🚀 Guia de Deploy - GitHub Pages e Vercel

## 📋 Pré-requisitos
- [x] Código atualizado com a solução dos vídeos
- [x] Thumbnails criados (`video-thumb-1.jpg` e `video-thumb-2.jpg`)
- [x] Testado localmente e funcionando

---

## 🔧 GITHUB PAGES

### Passo 1: Commit e Push
```bash
# No terminal, navegue até a pasta do projeto
cd "c:\Users\gabriel\Desktop\Cliente WebSite\Rui\Site\cliente-the-rs-agency"

# Adicionar todos os arquivos modificados
git add .

# Fazer commit
git commit -m "Fix: Corrigir vídeos para funcionar no GitHub Pages - usar thumbnails com modal"

# Push para o GitHub
git push origin main
```

### Passo 2: Verificar GitHub Pages
1. Acesse: https://github.com/hubia-projects/cliente-the-rs-agency
2. Vá em **Settings** > **Pages**
3. Verifique se está configurado:
   - **Source**: Deploy from a branch
   - **Branch**: `main` / `(root)`
4. Aguarde 2-5 minutos para o deploy
5. Acesse: https://hubia-projects.github.io/cliente-the-rs-agency/

### Passo 3: Testar
- ✅ Abrir o site no GitHub Pages
- ✅ Rolar até a seção de Portfólio
- ✅ Verificar se os thumbnails dos vídeos aparecem
- ✅ Clicar em um vídeo e verificar se abre o modal
- ✅ Testar o botão "Abrir em nova aba"

---

## 🌐 VERCEL

### Opção A: Deploy Automático (Recomendado)

Se o repositório já está conectado ao Vercel:

1. Apenas faça push para o GitHub (comando acima)
2. O Vercel detectará automaticamente e fará deploy
3. Aguarde 1-3 minutos
4. Acesse seu site na URL do Vercel

### Opção B: Deploy Manual via CLI

```bash
# Instalar Vercel CLI (se ainda não tiver)
npm install -g vercel

# Login no Vercel
vercel login

# Deploy
cd "c:\Users\gabriel\Desktop\Cliente WebSite\Rui\Site\cliente-the-rs-agency"
vercel

# Para deploy em produção
vercel --prod
```

### Opção C: Deploy Manual via Interface

1. Acesse: https://vercel.com/
2. Faça login
3. Clique em "Add New Project"
4. Importe o repositório `hubia-projects/cliente-the-rs-agency`
5. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: (deixar vazio)
   - **Output Directory**: `./`
6. Clique em "Deploy"

---

## 🎯 Checklist de Verificação Pós-Deploy

### GitHub Pages
- [ ] Site carrega sem erros
- [ ] Todas as imagens aparecem
- [ ] Menu de navegação funciona
- [ ] Thumbnails dos vídeos aparecem
- [ ] Ícone de play sobre os vídeos
- [ ] Ao clicar no vídeo, abre modal
- [ ] Vídeo reproduz no modal
- [ ] Botão "Abrir em nova aba" funciona
- [ ] Modal fecha corretamente (X, ESC, clique fora)
- [ ] Formulário de contato funciona
- [ ] Site responsivo no mobile

### Vercel
- [ ] Mesmos checks acima
- [ ] HTTPS funcionando
- [ ] Domínio customizado (se configurado)
- [ ] Certificado SSL válido

---

## 🔍 URLs para Testar

### GitHub Pages:
```
https://hubia-projects.github.io/cliente-the-rs-agency/
```

### Testar especificamente:
- **Homepage**: `/`
- **Portfólio (scroll até)**: `/#portfolio`
- **Blog**: `/blog.html`

---

## 🐛 Solução de Problemas Comuns

### ❌ Vídeos ainda não funcionam no GitHub Pages

**Causa**: Cache do navegador ou deploy não completado

**Solução**:
1. Aguarde 5 minutos após o push
2. Limpe o cache do navegador (Ctrl + Shift + Delete)
3. Tente em modo anônimo (Ctrl + Shift + N)
4. Verifique o status do deploy em Actions no GitHub

### ❌ Thumbnails não aparecem

**Causa**: Caminho incorreto ou arquivos não foram commitados

**Solução**:
```bash
# Verificar se os arquivos existem
git ls-files | grep video-thumb

# Se não aparecer, adicionar manualmente:
git add assets/images/novas-midias/video-thumb-1.jpg
git add assets/images/novas-midias/video-thumb-2.jpg
git commit -m "Add: Adicionar thumbnails dos vídeos"
git push
```

### ❌ Modal não abre

**Causa**: JavaScript não carregou ou erro no console

**Solução**:
1. Abra o DevTools (F12)
2. Vá na aba "Console"
3. Recarregue a página
4. Verifique se há erros em vermelho
5. Se houver, copie e envie para análise

### ❌ Vídeo não carrega no modal

**Causa**: Streamable pode estar bloqueado ou link inválido

**Solução**:
1. Clique no botão "Abrir em nova aba"
2. Verifique se o vídeo abre no Streamable
3. Se não abrir, o link pode estar quebrado
4. Substitua por novo link do Streamable

---

## 📊 Monitoramento

### GitHub Actions
- Acesse: https://github.com/hubia-projects/cliente-the-rs-agency/actions
- Verifique se o deploy foi bem-sucedido (✅ verde)

### Vercel Dashboard
- Acesse: https://vercel.com/dashboard
- Verifique o status do último deploy
- Veja logs em caso de erro

---

## 🎉 Pronto!

Após seguir estes passos, seu site estará funcionando perfeitamente tanto no **GitHub Pages** quanto no **Vercel** com os vídeos carregando corretamente através do modal.

### 📞 Suporte
Se algo não funcionar:
1. Verifique o arquivo `SOLUCAO-VIDEOS.md` para detalhes técnicos
2. Consulte a seção de Troubleshooting acima
3. Abra um issue no GitHub com prints e descrição do problema

---

**Última atualização**: 4 de Dezembro de 2025
