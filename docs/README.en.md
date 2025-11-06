# 🌊 Sui Move Bootcamp

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

## 🚀 How to Run

### 🔧 Automatic Installation (Windows)

**Repository:** [GitHub - SilvaCleverson/bootcampSui](https://github.com/SilvaCleverson/bootcampSui)

This project includes a one-click installer for Windows that automatically installs:

**What will be installed:**

1. **Chocolatey** (Package Manager for Windows)
   - Required for installing other packages

2. **Sui CLI** (Latest version)
   - Command-line tool for Sui blockchain development

3. **Git** (Latest version)
   - Version control system

4. **Visual Studio Code** (Latest version)
   - Code editor

5. **VS Code/Cursor Extensions** (automatically installed):
   - Prettier Move (mysten.prettier-move)
   - Sui Move (mysten.move)
   - Move Syntax (damirka.move-syntax)

6. **Sui First Steps Project**
   - Downloaded and extracted from GitHub
   - Installed in: `C:\bootcampSui`
   - If `C:\bootcampSui` already exists, creates: `C:\bootcampSui_YYYYMMDD`
   - Automatically opens VS Code in the project folder

#### Step by Step:

1. **Navigate to the `sui-one-click-installer` folder:**
   ```bash
   cd bootcampSui\sui-one-click-installer
   ```

2. **Run the installer:**
   - Right-click on `Install Sui (run as administrator).bat`
   - Select **"Run as administrator"**
   - Or simply double-click (the script will request permissions automatically)

3. **Wait for installation:**
   - The installer will use Chocolatey to install the programs
   - The entire process will be logged in the `instalacao_sui.log` file

4. **Verify installation:**
   - Open a **new PowerShell** (important: close and reopen)
   - Run the commands to verify:
     ```bash
     sui --version
     git --version
     code --version
     ```

5. **Next steps after installation:**
   ```bash
   # Configure Sui client
   sui client
   
   # Select network (testnet/devnet/mainnet)
   # Create new address
   sui client new-address ed25519
   
   # Get test tokens (if needed)
   sui client faucet
   ```

#### ⚠️ Troubleshooting

- If any command is not recognized after installation, **close and open a new terminal**
- If installation fails, check the `instalacao_sui.log` file in the `sui-one-click-installer` folder
- Make sure to run as administrator

### 📦 Manual Installation

If you prefer to install manually or are on another operating system:

1. **Install Sui CLI:**
   - Follow instructions at: [Sui Documentation](https://docs.sui.io/build/install)
   - Verify installation: `sui --version`

2. **Install Git:**
   - Windows: [Git for Windows](https://git-scm.com/download/win)
   - Verify: `git --version`

3. **Install VS Code:**
   - [VS Code Download](https://code.visualstudio.com/)
   - Verify: `code --version`

### 🏃 Run Tests

After installation, navigate to the project directory:
```bash
cd bootcampSui
```

And run the tests:

```bash
sui move test
```

This will run all tests from all challenges in the project.

## 📁 Project Structure

```
bootcampSui/
├── Move.toml              # Move package configuration
├── README.md              # Main README (multi-language index)
├── .gitignore             # Git ignored files
├── docs/                  # Documentation
│   ├── README.pt.md       # Portuguese version
│   ├── README.en.md       # English version (this file)
│   └── README.es.md        # Spanish version
├── sui-one-click-installer/  # Automatic installation scripts
│   ├── Install Sui (run as administrator).bat  # Main installer (Windows)
│   ├── script_sui.ps1      # PowerShell installation script
│   └── README.txt          # Installer instructions
└── sources/
    └── desafios/                  # Challenges folder
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

## 🔍 Move Language Basics

### Key Concepts

#### 1. Modules
In Move, code is organized in modules. It's similar to having a class or set of static functions.

```move
module introducao::desafio_logo {
    // code here
}
```

#### 2. Functions
- Private functions: `fun function_name()`
- Public functions: `public fun function_name()`
- Test functions: `#[test] fun function_name()`

#### 3. Data Types
- `u8`, `u16`, `u32`, `u64`: Unsigned integers
- `bool`: Boolean (true/false)
- `vector<T>`: Vector/array of elements of type T
- `address`: Blockchain address

#### 4. Loops
Move uses `while` for loops:

```move
let i = 0;
while (i < 10) {
    // code here
    i = i + 1;
}
```

## 🧪 Testing

Each challenge contains unit tests marked with `#[test]`.

### Run all tests:
```bash
sui move test
```

### Run a specific test:
```bash
sui move test test_name
```

## 📚 Learned Concepts

- ✅ **Helper functions**: Code reuse
- ✅ **Loops (`while`)**: Operation repetition
- ✅ **Byte vectors**: String manipulation in Move
- ✅ **Unit tests**: Code validation
- ✅ **Modularization**: Code organization in functions
- ✅ **Constants**: Fixed value definitions
- ✅ **Imports**: Standard library usage

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

## 📝 Developer Notes

This bootcamp was a learning journey transitioning from traditional programming to Move. Understanding Move's unique concepts helps in building secure blockchain applications.

### Tips for Beginners:

1. **Types are required**: Move is strongly typed
2. **Ownership is important**: Move uses a unique ownership system
3. **Tests are essential**: Use `#[test]` to validate your code
4. **Strings are bytes**: In Move, strings are `vector<u8>` and need to be converted

## 📄 License

This project is part of the Sui Move Bootcamp and is used for educational purposes.

---

**Developed with ❤️ by Cleverson Silva**

*Sui Move Bootcamp - Nov 2025*

