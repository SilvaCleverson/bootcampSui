# 💆‍♀️ CronoCapilar

> **Transforma sua rotina capilar em prova on-chain de autocuidado**

### ✅ **Status: Deploy em Produção**

**🌐 Aplicação Online:** [https://bootcamp-sui.vercel.app](https://bootcamp-sui.vercel.app)

⚠️ **Disclaimer:** Este site é apenas para apresentação final do Bootcamp Sui. Não é um produto comercial.

---

## 📱 Sobre o Projeto

**CronoCapilar** é uma aplicação Web3 completa que permite aos usuários registrar e acompanhar seus cuidados capilares de forma descentralizada na blockchain Sui. Cada tratamento, evento e perfil é armazenado on-chain, criando uma prova imutável da jornada de autocuidado capilar.

### 🎯 Diferenciais

- ✅ **Armazenamento On-Chain**: Todos os dados são salvos na blockchain Sui
- ✅ **Descentralizado**: Sem dependência de servidores centralizados
- ✅ **Imutável**: Histórico permanente e verificável
- ✅ **Multi-idioma**: Suporte para Português, Inglês e Espanhol
- ✅ **Interface Moderna**: Design responsivo e intuitivo

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **React Hooks** - Gerenciamento de estado
- **CSS-in-JS** - Estilização inline

### Blockchain
- **Sui Move** - Smart contracts na blockchain Sui
- **Sui Dapp Kit** - Integração com carteiras Sui
- **Sui Wallet** - Carteira oficial Sui
- **Phantom** - Carteira alternativa

### Internacionalização
- Sistema customizado de i18n
- Detecção automática de idioma
- Suporte para 3 idiomas (PT-BR, EN-US, ES-ES)

---

## 🎯 Funcionalidades

### ✅ Implementadas

- [x] Conexão com carteira Sui
- [x] Perfil de cuidados capilares on-chain
- [x] Registro de tratamentos (Hidratação, Nutrição, Reconstrução)
- [x] Timeline de eventos capilares
- [x] Sistema de check-in diário
- [x] Registro de eventos (Big Chop, Cortes, Colorações)
- [x] Estatísticas e acompanhamento
- [x] Internacionalização completa
- [x] Design responsivo
- [x] **Carregamento automático de dados on-chain**
- [x] **Detecção dinâmica de rede (Mainnet/Testnet/Devnet)**
- [x] **Atualização automática a cada 30 minutos**
- [x] **Contador visual de tempo até próxima atualização**
- [x] **Deploy na Vercel**
- [x] **Disclaimer e links para Sui e Bootcamp**

---

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Carteira Sui instalada no navegador

### Passos

1. **Clone o repositório** (se ainda não tiver):
   ```bash
   git clone <repository-url>
   cd bootcampSui/cronocapilar-sui-final
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Execute o projeto em desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Acesse no navegador**:
   ```
   http://localhost:3000
   ```

5. **Conecte sua carteira Sui**:
   - Clique em "Conectar Carteira"
   - Selecione sua carteira (Sui Wallet ou Phantom)
   - Autorize a conexão

---

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento na porta 3000

# Produção
npm run build        # Cria build de produção
npm run start        # Inicia servidor de produção

# Qualidade de código
npm run lint         # Executa ESLint
```

---

## 📁 Estrutura do Projeto

```
cronocapilar-sui-final/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Página principal
│   ├── layout.tsx         # Layout raiz
│   ├── checkin/           # Página de check-in
│   └── globals.css       # Estilos globais
├── components/            # Componentes React
│   ├── BigChopCard.tsx   # Card do Big Chop
│   ├── CheckInCard.tsx   # Card de check-in
│   ├── EventRegister.tsx # Registro de eventos
│   ├── LoginModal.tsx    # Modal de login
│   ├── TimelinePage.tsx  # Página de timeline
│   └── ...
├── lib/                   # Utilitários e providers
│   ├── constants.ts      # Constantes (Package ID, etc)
│   ├── i18n.tsx          # Sistema de internacionalização
│   └── sui-provider.tsx  # Provider do Sui Dapp Kit
├── public/                # Arquivos estáticos
│   ├── LogoSui.jpg       # Logo Sui
│   └── ...
├── contracts/             # Smart contracts (Move)
└── package.json          # Dependências e scripts
```

---

## 🔗 Smart Contracts

O projeto utiliza smart contracts Move publicados na blockchain Sui:

- **Package ID**: `0x9102fbafd6900f9a06d1db65eb6b7dec4bd1eebe00ea531b75665ebf290e804e`
- **Rede**: Suporta Mainnet, Testnet e Devnet (detecção automática)
- **Módulo**: `profile`
- **Funções principais**:
  - `create_profile` - Criar perfil on-chain
  - `register_treatment` - Registrar tratamento capilar
  - `register_event` - Registrar evento capilar (Big Chop, Cortes, Colorações)

### 📝 Estruturas de Dados

- **Profile**: Armazena informações do perfil capilar (tipo, comprimento, textura)
- **Treatment**: Registra tratamentos realizados (Hidratação, Nutrição, Reconstrução)
- **Event**: Registra eventos importantes (Big Chop, Cortes, Colorações)

O código dos smart contracts está em: `../sources/desafios/cronocapilar.move`

> **Nota:** O Package ID também está visível no rodapé da aplicação para facilitar testes.
> 
> ⚠️ **Importante:** O Package ID pode mudar se o contrato for republicado (especialmente após resets do Devnet).

---

## 🌍 Internacionalização

O projeto suporta 3 idiomas:

- 🇧🇷 **Português (Brasil)** - `pt-BR`
- 🇺🇸 **English (US)** - `en-US`
- 🇪🇸 **Español** - `es-ES`

O idioma é detectado automaticamente baseado nas configurações do navegador, mas pode ser alterado manualmente através do seletor de idioma.

## 🌐 Detecção de Rede

O aplicativo detecta automaticamente a rede Sui conectada:

- **Mainnet**: Rede principal da Sui
- **Testnet**: Rede de testes pública
- **Devnet**: Rede de desenvolvimento (pode ser resetada periodicamente)

A detecção é feita dinamicamente baseada na carteira conectada, garantindo que os dados sejam buscados da rede correta.

---

## 📝 Checklist de Implementação

Para ver o checklist completo de funcionalidades, consulte:
- [CHECKLIST_SUI.md](./CHECKLIST_SUI.md)

---

## 🚀 Deploy e Publicação

### ✅ Deploy Atual

O CronoCapilar está **deployado e funcionando** na Vercel:
- **URL:** [https://bootcamp-sui.vercel.app](https://bootcamp-sui.vercel.app)
- **Plataforma:** Vercel
- **Deploy automático:** Ativado via GitHub

### 📖 Guia de Deploy

Para mais informações sobre deploy, consulte:
- [DEPLOY.md](./DEPLOY.md) - Guia completo com todas as opções de hospedagem

**Recomendação:** Use **Vercel** para o melhor suporte a Next.js e deploy mais simples.

---

## 🔄 Atualização de Dados On-Chain

O aplicativo atualiza automaticamente os dados on-chain a cada **30 minutos**. Um contador visual mostra o tempo restante até a próxima atualização.

- ⏳ **Indicador de atualização**: Mostra "Próxima atualização em Xmin"
- 🔄 **Atualização automática**: Dados são buscados da blockchain automaticamente
- 💾 **Cache local**: Dados são armazenados localmente para melhor performance

---

## 📄 Licença

Este projeto faz parte do Sui Move Bootcamp e é usado para fins educacionais e de demonstração.

---

## 👨‍💻 Autor

**Cleverson Silva**

Desenvolvido durante o **Sui Move Bootcamp Brasil** (Novembro 2025)

---

## 🙏 Agradecimentos

- **Sui Foundation** - Pela plataforma e documentação
- **WayLearn** - Pela organização do bootcamp
- **ParaBuilders** - Pelo suporte e mentoria

---

**Desenvolvido com ❤️ e muito café ☕**

*Última atualização: Dezembro 2024*

