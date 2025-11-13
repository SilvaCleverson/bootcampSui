# 📁 Estrutura do Projeto BootcampSui

## 📂 Organização de Diretórios

```
bootcampSui/
├── 📄 README.md                    # Documentação principal do projeto
├── 📄 Move.toml                    # Configuração do pacote Move
├── 📄 Move.lock                    # Lock file do Move
├── 📄 .gitignore                   # Arquivos ignorados pelo Git
│
├── 📁 sources/                     # Código-fonte Move
│   └── desafios/                   # Desafios do Bootcamp
│       ├── cronocapilar.move      # ⭐ Contrato principal CronoCapilar
│       ├── desafio_logo.move      # Desafio 01: ASCII Logo
│       ├── desafio_contador.move   # Desafio 02: Counter
│       └── desafio_lista_tarefas.move # Desafio 03: Todo List
│
├── 📁 build/                       # Artefatos de build (ignorado no Git)
│   └── BootcampSui/               # Arquivos compilados do Move
│
├── 📁 cronocapilar-sui-final/     # ⭐ Aplicação Web3 (Next.js)
│   ├── 📄 README.md               # Documentação da aplicação
│   ├── 📄 package.json            # Dependências Node.js
│   ├── 📄 vercel.json             # Configuração Vercel
│   │
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── page.tsx              # Página principal
│   │   ├── layout.tsx            # Layout raiz
│   │   ├── globals.css           # Estilos globais
│   │   └── checkin/               # Página de check-in
│   │
│   ├── 📁 components/            # Componentes React
│   │   ├── Timeline.tsx          # Timeline de eventos
│   │   ├── TimelinePage.tsx       # Página de timeline
│   │   ├── EventRegister.tsx     # Registro de eventos
│   │   ├── LoginModal.tsx        # Modal de login
│   │   └── ...                   # Outros componentes
│   │
│   ├── 📁 lib/                    # Bibliotecas e utilitários
│   │   ├── constants.ts          # Constantes (Package ID, etc)
│   │   ├── i18n.tsx              # Internacionalização
│   │   └── sui-provider.tsx      # Provider do Sui Dapp Kit
│   │
│   ├── 📁 public/                 # Arquivos estáticos
│   │   ├── LogoSui.jpg          # Logo Sui
│   │   └── ...                   # Outros assets
│   │
│   ├── 📁 contracts/              # Documentação dos contratos
│   │   └── README.md             # Info sobre smart contracts
│   │
│   ├── 📄 DEPLOY.md              # Guia de deploy
│   └── 📄 CHECKLIST_SUI.md       # Checklist de implementação
│
├── 📁 docs/                       # Documentação geral
│   ├── README.pt.md              # Documentação em Português
│   ├── README.en.md              # Documentação em Inglês
│   ├── README.es.md              # Documentação em Espanhol
│   └── DEPLOY.md                 # Link para guia de deploy
│
├── 📁 sui-one-click-installer/    # Instalador automático
│   ├── Install Sui (run as administrator).bat
│   ├── script_sui.ps1
│   └── README.txt
│
└── 📄 SESSAO_*.md                 # Documentação de sessões (não versionado)
```

## 🔑 Arquivos Importantes

### Smart Contracts
- **Contrato Principal:** `sources/desafios/cronocapilar.move`
- **Package ID (Mainnet):** `0x313d461e1eb560b5215d9ac61f02e7f2413ddfca3d000df76ea3fa39ab680663`

### Frontend
- **Configuração:** `cronocapilar-sui-final/lib/constants.ts`
- **Provider Sui:** `cronocapilar-sui-final/lib/sui-provider.tsx`
- **Página Principal:** `cronocapilar-sui-final/app/page.tsx`

### Documentação
- **Principal:** `README.md`
- **Aplicação:** `cronocapilar-sui-final/README.md`
- **Deploy:** `cronocapilar-sui-final/DEPLOY.md`

## 📝 Notas

- A pasta `build/` contém arquivos compilados e está no `.gitignore`
- A pasta `contracts/` no frontend contém apenas documentação
- Os smart contracts estão em `sources/desafios/`
- Documentação de sessões (`SESSAO_*.md`) não é versionada

