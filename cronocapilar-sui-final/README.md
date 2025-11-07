# 💆‍♀️ CronoCapilar

> **Transforma sua rotina capilar em prova on-chain de autocuidado**

### ⚠️ **Status: Em Desenvolvimento Ativo**

Este projeto está em desenvolvimento contínuo. Funcionalidades podem estar incompletas ou sujeitas a mudanças. Use com cautela em produção.

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

### 🚧 Em Desenvolvimento

- [ ] Recuperação de dados on-chain
- [ ] Visualização de histórico completo
- [ ] Compartilhamento de perfil
- [ ] Sistema de gamificação
- [ ] Notificações e lembretes

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

O projeto utiliza smart contracts Move publicados na Sui devnet:

- **Package ID**: `0x6531470ba7bc8d4682855b54ba8cb6940146ffd1322ea0902aae534633f0101a`
- **Módulo**: `profile`
- **Funções principais**:
  - `create_profile` - Criar perfil on-chain
  - `register_treatment` - Registrar tratamento
  - `register_event` - Registrar evento capilar

O código dos smart contracts está em: `../sources/desafios/cronocapilar.move`

---

## 🌍 Internacionalização

O projeto suporta 3 idiomas:

- 🇧🇷 **Português (Brasil)** - `pt-BR`
- 🇺🇸 **English (US)** - `en-US`
- 🇪🇸 **Español** - `es-ES`

O idioma é detectado automaticamente baseado nas configurações do navegador, mas pode ser alterado manualmente através do seletor de idioma.

---

## 📝 Checklist de Implementação

Para ver o checklist completo de funcionalidades, consulte:
- [CHECKLIST_SUI.md](./CHECKLIST_SUI.md)

---

## 🐛 Problemas Conhecidos

- ⚠️ Dados on-chain ainda não são recuperados automaticamente ao conectar a carteira
- ⚠️ Algumas funcionalidades podem apresentar comportamento inesperado durante desenvolvimento

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

*Última atualização: Novembro 2025*

