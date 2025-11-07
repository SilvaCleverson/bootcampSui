# 🌊 Sui Move Bootcamp

> **Choose your language / Escolha seu idioma / Elige tu idioma**
> 
> - 🇧🇷 [Português (Brasil)](docs/README.pt.md)
> - 🇺🇸 [English](docs/README.en.md)
> - 🇪🇸 [Español](docs/README.es.md)

---

## 🌟 **CronoCapilar - Projeto Principal**

### ⚠️ **Status: Em Desenvolvimento**

> **O CronoCapilar é o projeto principal e mais completo deste repositório, demonstrando uma aplicação Web3 completa integrada com a blockchain Sui.**

### 📱 **Sobre o Projeto**

**CronoCapilar** é uma aplicação Web3 que transforma a rotina de cuidados capilares em prova on-chain de autocuidado na blockchain Sui. O projeto integra:

- **Frontend**: Next.js com TypeScript
- **Blockchain**: Sui Move smart contracts
- **Carteiras**: Integração com Sui Wallet e Phantom
- **Internacionalização**: Suporte para Português, Inglês e Espanhol

### 🎯 **Funcionalidades Principais**

- ✅ Perfil de cuidados capilares on-chain
- ✅ Registro de tratamentos capilares (Hidratação, Nutrição, Reconstrução)
- ✅ Timeline de eventos capilares (Big Chop, Cortes, Colorações)
- ✅ Sistema de check-in diário
- ✅ Estatísticas e acompanhamento de progresso
- ✅ Armazenamento descentralizado na blockchain Sui

### 📂 **Localização do Projeto**

O projeto está localizado em: `cronocapilar-sui-final/`

### 🚧 **Aviso Importante**

**Este projeto está em desenvolvimento ativo.** Funcionalidades podem estar incompletas ou sujeitas a mudanças. Use com cautela em produção.

### 🔗 **Links Relacionados**

- 📄 [Checklist de Implementação](cronocapilar-sui-final/CHECKLIST_SUI.md)
- 📦 [Package.json](cronocapilar-sui-final/package.json)

---

## 📋 About the Bootcamp

This repository contains challenges and projects developed during the **Sui MOVE Bootcamp Brasil**. Each challenge demonstrates different concepts and functionalities of the Move language on the Sui platform.

### 🎯 Bootcamp Information

- **Name:** Sui MOVE Bootcamp Brasil
- **Period:** November 3rd to 17th
- **Format:** Online classes
- **Level:** Beginner to Intermediate
- **Schedule:** 7 PM to 8 PM (Brazil time)
- **Certification:** Official Sui Developer Certificate
- **Flexibility:** Recorded classes, you can watch at your own pace

**Organizers:**
- Sui
- WayLearn
- ParaBuilders

**Registration:** [luma.com/wxsj6hjy](https://luma.com/wxsj6hjy)

## 👨‍💻 Author

**Cleverson Silva**

## 🚀 Quick Start

**Repository:** [GitHub - SilvaCleverson/bootcampSui](https://github.com/SilvaCleverson/bootcampSui)

---

## ⚡ **ONE-CLICK INSTALLER (RECOMMENDED FOR WINDOWS)**

### 🎯 **Easiest Way to Get Started**

This repository includes a **one-click installer** that automatically sets up your entire development environment in minutes!

### 📍 **Where to Find It**

Navigate to the `sui-one-click-installer/` folder in this repository.

### 🚀 **How to Use**

1. **Open the installer folder:**
   ```bash
   cd bootcampSui\sui-one-click-installer
   ```

2. **Run the installer:**
   - Right-click on `Install Sui (run as administrator).bat`
   - Select **"Run as administrator"**
   - Or simply double-click (the script will request permissions automatically)

3. **Wait for installation** (5-10 minutes depending on your internet speed)

4. **Verify installation:**
   - Open a **NEW PowerShell window** (important: close and reopen)
   - Run:
     ```bash
     sui --version
     git --version
     code --version
     ```

### 📦 **What Gets Installed Automatically**

✅ **Chocolatey** - Package manager for Windows  
✅ **Sui CLI** - Latest version (command-line tool for Sui blockchain)  
✅ **Git** - Version control system  
✅ **Visual Studio Code** - Code editor  
✅ **VS Code Extensions:**
   - Prettier Move (code formatting)
   - Sui Move (syntax highlighting and IntelliSense)
   - Move Syntax (additional syntax support)  
✅ **Sui First Steps Project** - Downloaded and extracted to `C:\bootcampSui`

### 📂 **Installation Location**

- **Project:** `C:\bootcampSui` (or `C:\bootcampSui_YYYYMMDD_HHMMSS_FFF` if folder exists)
- **Log file:** `installation_sui.log` (in the same folder as the installer script)

### ⚠️ **Important Notes**

- **Run as administrator** - Required for installing software
- **Close and reopen terminal** - After installation, open a new PowerShell to use commands
- **Check log file** - If something fails, check `installation_sui.log` for details

### 📖 **Detailed Instructions**

For complete step-by-step instructions, see:
- 📄 `sui-one-click-installer/README.txt` (English)
- 🇧🇷 [Português (Brasil)](docs/README.pt.md) - Complete guide with ADVPL comparisons
- 🇺🇸 [English](docs/README.en.md) - Full documentation
- 🇪🇸 [Español](docs/README.es.md) - Documentación completa

---

## 🔄 **Para Desenvolvedores ADVPL Migrando para Move**

Se você é desenvolvedor **ADVPL/Protheus** e está começando com Move, este repositório foi criado especialmente para facilitar sua transição!

### 📚 **Guia Completo de Comparação**

O arquivo **[docs/README.pt.md](docs/README.pt.md)** contém uma seção completa com comparações detalhadas entre ADVPL e Move, incluindo:

- ✅ **Tabela de comparação** ADVPL ↔ Move
- ✅ **Explicação de conceitos** principais
- ✅ **Exemplos práticos** de migração
- ✅ **Dicas específicas** para desenvolvedores ADVPL

### 🎯 **Principais Diferenças**

| ADVPL | Move | Observação |
|-------|------|------------|
| **Funções** |||
| `User Function` | `#[test] fun` | Função executável/testável |
| `Static Function` | `fun` | Função auxiliar/helper |
| `Public Function` | `public fun` | Função pública do módulo |
| `Public Entry Function` | `public entry fun` | Função de entrada para transações |
| **Estruturas de Controle** |||
| `While ... EndDo` | `while { }` | Laço de repetição |
| `If ... EndIf` | `if { }` | Condicional |
| **Estruturas de Dados** |||
| `aStruct := {cCampo1, cCampo2}` | `struct Nome { campo1: Tipo, campo2: Tipo }` | Definição de estrutura |
| `aStruct.cCampo1` | `struct.campo1` | Acesso a campo |
| `aStruct := {cCampo1 := "valor"}` | `Struct { campo1: valor }` | Criação de instância |
| **Abilities (Capacidades)** |||
| - | `has key` | Objeto pode ser identificado na blockchain |
| - | `has store` | Objeto pode ser armazenado/transferido |
| - | `has drop` | Objeto pode ser descartado |
| - | `has copy` | Objeto pode ser copiado |
| **Referências** |||
| Passagem por valor | `&` (referência imutável) | Leitura sem modificar |
| `@` (passagem por referência) | `&mut` (referência mutável) | Permite modificação |
| **Tipos de Dados** |||
| `cTexto := "Hello"` | `vector<u8>` + `utf8()` | String (vetor de bytes) |
| `nNumero := 10` | `u64`, `u32`, `u8` | Números inteiros sem sinal |
| `lLogico := .T.` | `bool` (true/false) | Booleano |
| `aArray := {}` | `vector<Tipo>` | Array/Vetor |
| **Outros** |||
| `ConOut()` | `print()` | Saída no console |
| `#Define CONST 0` | `const CONST: u64 = 0` | Constante |
| `#Include` | `use` | Importar bibliotecas |
| `Local` | `let` | Variável local |
| - | `UID` | Identificador único de objeto |
| - | `TxContext` | Contexto da transação |
| - | `address` | Endereço na blockchain |

### 📦 **Exemplo Prático: Structs**

Em Move, structs são como estruturas em ADVPL, mas com capacidades especiais:

```move
// Move: Struct com abilities key e store (pode ser objeto na blockchain)
struct Profile has key, store {
    id: UID,
    hair_type: vector<u8>,
    owner: address,
}

// Criar instância
let profile = Profile {
    id: object::new(ctx),
    hair_type: b"liso",
    owner: sender,
};
```

**Equivalente em ADVPL:**
```advpl
// ADVPL: Estrutura simples
Local aProfile := {;
    "id"      => "",
    "cHairType" => "liso",
    "cOwner"  => ""
}
```

### 💡 **Dica Importante**

Este bootcamp foi desenvolvido por um desenvolvedor que migrou de ADVPL para Move, então as explicações são pensadas especialmente para quem vem dessa base!

**👉 Acesse o guia completo:** [docs/README.pt.md](docs/README.pt.md)

---

### 🔧 **Manual Installation (Alternative)**

If you prefer to install manually or are not on Windows, see the detailed guides:
- 🇧🇷 [Português (Brasil)](docs/README.pt.md)
- 🇺🇸 [English](docs/README.en.md)
- 🇪🇸 [Español](docs/README.es.md)

### Quick Test

```bash
cd bootcampSui
sui move test
```

## 📁 Project Structure

```
bootcampSui/
├── Move.toml              # Move package configuration
├── README.md              # This file (main index)
├── .gitignore             # Git ignored files
├── docs/                  # Documentation files
│   ├── README.pt.md       # Portuguese version
│   ├── README.en.md       # English version
│   └── README.es.md        # Spanish version
├── cronocapilar-sui-final/  # 🌟 PROJETO PRINCIPAL - CronoCapilar (Em Desenvolvimento)
│   ├── app/               # Next.js app directory
│   ├── components/        # React components
│   ├── lib/               # Utilities and providers
│   ├── contracts/         # Smart contracts
│   ├── public/            # Static assets
│   └── CHECKLIST_SUI.md   # Checklist de implementação
├── sui-one-click-installer/  # Automatic installation scripts
│   ├── Install Sui (run as administrator).bat  # Main installer (Windows)
│   ├── script_sui.ps1      # PowerShell installation script
│   └── README.txt          # Installer instructions
└── sources/
    └── desafios/              # Challenges folder
        ├── cronocapilar.move # Smart contract do CronoCapilar
        ├── desafio_logo.move          # Challenge 01: ASCII Logo
        ├── desafio_contador.move      # Challenge 02: Counter
        ├── desafio_lista_tarefas.move # Challenge 03: Todo List
        └── ...                        # More challenges will be added here
```

## 📚 Challenges

### Challenge 01: ASCII Logo 🎨

**File:** `sources/desafios/desafio_logo.move`

**Objective:** Print the Sui ASCII logo using helper functions and loops.

**Concepts Demonstrated:**
- Helper functions
- Loops (`while`)
- Byte vectors
- Unit tests

**How to run:**
```bash
cd bootcampSui
sui move test desafio_logo
```

**Expected Result:**
The command prints the complete Sui ASCII logo in the console.

---

### Challenge 02: Counter 🔢

**File:** `sources/desafios/desafio_contador.move`

**Objective:** Implement various counter functions using loops and conditional logic.

**Concepts Demonstrated:**
- Loops (`while`)
- Variable reassignment
- Function parameters
- Multiple counter implementations:
  - Count from 1 to N
  - Count from start to end
  - Countdown (regressive)
  - Count with custom interval
  - Count with custom message

**How to run:**
```bash
cd bootcampSui
sui move test desafio_contador
```

**Expected Result:**
The command executes all counter functions and displays the counting results in the console.

---

### Challenge 03: Todo List 📝

**File:** `sources/desafios/desafio_lista_tarefas.move`

**Objective:** Implement a Todo List smart contract with CRUD operations (Create, Read, Update, Delete).

**Concepts Demonstrated:**
- Structs with `key` and `store` abilities
- Object creation and transfer
- Mutable references (`&mut`)
- Vector operations
- Entry functions for blockchain interaction
- Error handling with `abort`

**Functions:**
- `new()` - Create a new empty todo list
- `adicionar_tarefa()` - Add a task to the list
- `remover_tarefa()` - Remove a task by index
- `alterar_tarefa()` - Update a task by index
- `quantidade_tarefas()` - Get the number of tasks
- `obter_tarefa()` - Get a task by index
- `listar_tarefas()` - List all tasks (for debugging)
- `limpar_tarefas()` - Clear all tasks

**How to test:**
```bash
cd bootcampSui
sui move test desafio_lista_tarefas
```

**How to publish:**
```bash
cd bootcampSui
sui client publish
```

**How to use (after publishing):**
```bash
# Create a new todo list
sui client call --package <PACKAGE_ID> --module desafio_lista_tarefas --function new --gas-budget 100000000

# Add a task
sui client call --package <PACKAGE_ID> --module desafio_lista_tarefas --function adicionar_tarefa --args <LIST_OBJECT_ID> "My task" --gas-budget 100000000

# Update a task (index 0)
sui client call --package <PACKAGE_ID> --module desafio_lista_tarefas --function alterar_tarefa --args <LIST_OBJECT_ID> 0 "Updated task" --gas-budget 100000000

# Remove a task (index 0)
sui client call --package <PACKAGE_ID> --module desafio_lista_tarefas --function remover_tarefa --args <LIST_OBJECT_ID> 0 --gas-budget 100000000
```

**Expected Result:**
The tests demonstrate all CRUD operations on a todo list stored on the Sui blockchain.

---

*More challenges will be added as the bootcamp progresses.*

## 🛠️ Technologies

- **Language**: Move (Sui)
- **Platform**: Sui Blockchain
- **CLI**: Sui CLI
- **Editor**: VS Code (recommended)

## 📖 References

- [Move Documentation](https://move-language.github.io/move/)
- [Sui Documentation](https://docs.sui.io/)
- [Move Book](https://move-book.com/)
- [Sui Developers](https://sui.io/developers)

## 📄 License

This project is part of the Sui Move Bootcamp and is used for educational purposes.

---

**Developed with ❤️ by Cleverson Silva**

*Sui Move Bootcamp - Nov 2025*
