# 🚀 Guia de Deploy - CronoCapilar

Este guia apresenta as melhores opções para publicar o CronoCapilar online.

---

## 🏆 Opção 1: Vercel (RECOMENDADO)

**Melhor para:** Next.js, deploy rápido, integração com GitHub

### Vantagens:
- ✅ Integração nativa com Next.js (criado pela mesma equipe)
- ✅ Deploy automático via GitHub
- ✅ HTTPS e CDN global incluídos
- ✅ Domínio gratuito (`seu-projeto.vercel.app`)
- ✅ Plano gratuito generoso
- ✅ Preview de pull requests
- ✅ Analytics incluído

### Como fazer:

1. **Instale a CLI da Vercel** (opcional):
   ```bash
   npm i -g vercel
   ```

2. **Faça login na Vercel**:
   - Acesse: https://vercel.com
   - Faça login com GitHub

3. **Conecte seu repositório**:
   - Clique em "Add New Project"
   - Selecione o repositório `bootcampSui`
   - Configure:
     - **Root Directory**: `cronocapilar-sui-final`
     - **Framework Preset**: Next.js (detectado automaticamente)
     - **Build Command**: `npm run build`
     - **Output Directory**: `.next` (padrão)

4. **Variáveis de Ambiente** (se necessário):
   - Geralmente não precisa de variáveis para este projeto
   - O Package ID está hardcoded em `constants.ts`

5. **Deploy**:
   - Clique em "Deploy"
   - Aguarde o build (2-3 minutos)
   - Pronto! Seu app estará online

### URL de exemplo:
```
https://cronocapilar-sui-final.vercel.app
```

---

## 🌐 Opção 2: Netlify

**Melhor para:** Deploy simples, integração com Git

### Vantagens:
- ✅ Deploy automático via GitHub
- ✅ HTTPS e CDN incluídos
- ✅ Domínio gratuito
- ✅ Formulários e funções serverless
- ✅ Plano gratuito generoso

### Como fazer:

1. **Acesse Netlify**:
   - https://netlify.com
   - Faça login com GitHub

2. **Conecte o repositório**:
   - "Add new site" → "Import an existing project"
   - Selecione o repositório
   - Configure:
     - **Base directory**: `cronocapilar-sui-final`
     - **Build command**: `npm run build`
     - **Publish directory**: `.next`

3. **Deploy**:
   - Clique em "Deploy site"
   - Aguarde o build

### URL de exemplo:
```
https://cronocapilar-sui-final.netlify.app
```

---

## 🚂 Opção 3: Railway

**Melhor para:** Aplicações que precisam de mais controle

### Vantagens:
- ✅ Deploy via GitHub
- ✅ Suporte a Node.js completo
- ✅ Variáveis de ambiente fáceis
- ✅ Logs em tempo real
- ✅ $5 de crédito grátis/mês

### Como fazer:

1. **Acesse Railway**:
   - https://railway.app
   - Faça login com GitHub

2. **Crie novo projeto**:
   - "New Project" → "Deploy from GitHub repo"
   - Selecione o repositório

3. **Configure o serviço**:
   - Root Directory: `cronocapilar-sui-final`
   - Build Command: `npm run build`
   - Start Command: `npm start`

4. **Deploy**:
   - Railway detecta automaticamente e faz o deploy

---

## 🎨 Opção 4: Render

**Melhor para:** Alternativa moderna ao Heroku

### Vantagens:
- ✅ Deploy automático via GitHub
- ✅ HTTPS incluído
- ✅ Domínio gratuito
- ✅ Plano gratuito disponível (com limitações)

### Como fazer:

1. **Acesse Render**:
   - https://render.com
   - Faça login com GitHub

2. **Crie novo Web Service**:
   - "New" → "Web Service"
   - Conecte o repositório
   - Configure:
     - **Root Directory**: `cronocapilar-sui-final`
     - **Build Command**: `npm run build`
     - **Start Command**: `npm start`

3. **Deploy**:
   - Render faz o deploy automaticamente

---

## 🌍 Opção 5: Fleek (Web3 Focado)

**Melhor para:** Aplicações Web3, deploy descentralizado

### Vantagens:
- ✅ Focado em aplicações Web3
- ✅ Deploy para IPFS
- ✅ Integração com Arweave
- ✅ Suporte a Next.js
- ✅ Domínio Web3 (.eth, .crypto)

### Como fazer:

1. **Acesse Fleek**:
   - https://fleek.co
   - Faça login

2. **Crie novo site**:
   - "Add New Site"
   - Conecte o GitHub
   - Configure para Next.js

3. **Deploy**:
   - Fleek faz build e deploy para IPFS

---

## 📋 Checklist Pré-Deploy

Antes de fazer o deploy, verifique:

- [ ] ✅ Build local funciona: `npm run build`
- [ ] ✅ Package ID atualizado em `lib/constants.ts`
- [ ] ✅ README.md atualizado
- [ ] ✅ Código commitado no Git
- [ ] ✅ Sem erros de TypeScript: `npm run lint`
- [ ] ✅ Testado localmente: `npm run dev`

---

## 🔧 Configurações Importantes

### Para Vercel/Netlify:

Crie um arquivo `vercel.json` ou `netlify.toml` (opcional):

**vercel.json**:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install"
}
```

### Variáveis de Ambiente:

Normalmente **NÃO são necessárias** para este projeto, pois:
- Package ID está em `constants.ts`
- Não há API keys secretas
- Tudo é público na blockchain

---

## 🎯 Recomendação Final

**Para este projeto, recomendo VERCEL** porque:

1. ✅ Criado pela equipe do Next.js
2. ✅ Deploy mais rápido e simples
3. ✅ Melhor otimização para Next.js
4. ✅ Preview de branches automaticamente
5. ✅ Analytics incluído
6. ✅ Domínio customizado fácil

---

## 📝 Passos Rápidos (Vercel)

```bash
# 1. Certifique-se que o código está no GitHub
git push

# 2. Acesse vercel.com e faça login

# 3. Importe o projeto do GitHub

# 4. Configure:
#    - Root Directory: cronocapilar-sui-final
#    - Framework: Next.js (auto-detectado)

# 5. Deploy! 🚀
```

---

## 🆘 Problemas Comuns

### Build falha:
- Verifique se `npm run build` funciona localmente
- Confira os logs de build na plataforma

### Erro de módulo não encontrado:
- Certifique-se que `node_modules` está no `.gitignore`
- A plataforma instala automaticamente

### Erro de TypeScript:
- Execute `npm run lint` localmente
- Corrija todos os erros antes do deploy

---

## 🔗 Links Úteis

- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Railway Docs](https://docs.railway.app)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**Boa sorte com o deploy! 🚀**

