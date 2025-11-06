# 🌊 Sui Move Bootcamp

> **Choose your language / Escolha seu idioma / Elige tu idioma**
> 
> - 🇧🇷 [Português (Brasil)](docs/README.pt.md)
> - 🇺🇸 [English](docs/README.en.md)
> - 🇪🇸 [Español](docs/README.es.md)

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

For detailed installation and usage instructions, please select your preferred language:
- 🇧🇷 [Português (Brasil)](docs/README.pt.md) - Complete guide with ADVPL comparisons
- 🇺🇸 [English](docs/README.en.md) - Full documentation
- 🇪🇸 [Español](docs/README.es.md) - Documentación completa

### 🛠️ One-Click Installer (Windows)

This repository includes a one-click installer for Windows that automatically installs:
- **Chocolatey** (Package Manager)
- **Sui CLI** (Latest version)
- **Git** (Version control)
- **Visual Studio Code** (Code editor)
- **VS Code Extensions** (Prettier Move, Sui Move, Move Syntax)
- **Sui First Steps Project** (Downloaded and extracted to `C:\bootcampSui`)

**Location:** `sui-one-click-installer/` folder  
**Instructions:** See `sui-one-click-installer/README.txt`

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
├── sui-one-click-installer/  # Automatic installation scripts
│   ├── Install Sui (run as administrator).bat  # Main installer (Windows)
│   ├── script_sui.ps1      # PowerShell installation script
│   └── README.txt          # Installer instructions
└── sources/
    ├── desafio_logo.move      # Challenge 01: ASCII Logo
    ├── desafio_contador.move  # Challenge 02: Counter
    └── ...                    # More challenges will be added here
```

## 📚 Challenges

### Challenge 01: ASCII Logo 🎨

**File:** `sources/desafio_logo.move`

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

**File:** `sources/desafio_contador.move`

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

*Sui Move Bootcamp - 2025*
