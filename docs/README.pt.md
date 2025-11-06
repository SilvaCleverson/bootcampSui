# 🌊 Bootcamp Sui Move

## 📋 Sobre o Bootcamp

Este repositório contém os desafios e projetos desenvolvidos durante o **Sui MOVE Bootcamp Brasil**. Cada desafio demonstra diferentes conceitos e funcionalidades da linguagem Move na plataforma Sui.

### 🎯 Informações do Bootcamp

- **Nome:** Sui MOVE Bootcamp Brasil
- **Período:** De 03 a 17 de Novembro
- **Formato:** Aulas online
- **Nível:** Iniciante ao Intermediário
- **Horário:** 19h às 20h (horário do Brasil)
- **Certificação:** Certificado oficial Sui Developer
- **Flexibilidade:** As aulas ficam gravadas, você pode fazer no seu horário

**Organizadores:**
- Sui
- WayLearn
- ParaBuilders

**Inscrições:** [luma.com/wxsj6hjy](https://luma.com/wxsj6hjy)

## 👨‍💻 Autor

**Cleverson Silva**

## 🚀 Como Executar

### 🔧 Instalação Automática (Windows)

**Repositório:** [GitHub - SilvaCleverson/bootcampSui](https://github.com/SilvaCleverson/bootcampSui)

Este projeto inclui um instalador de 1 clique para Windows que instala automaticamente:

**O que será instalado:**

1. **Chocolatey** (Gerenciador de Pacotes para Windows)
   - Necessário para instalar os outros pacotes

2. **Sui CLI** (Última versão)
   - Ferramenta de linha de comando para desenvolvimento na blockchain Sui

3. **Git** (Última versão)
   - Sistema de controle de versão

4. **Visual Studio Code** (Última versão)
   - Editor de código

5. **Extensões do VS Code/Cursor** (instaladas automaticamente):
   - Prettier Move (mysten.prettier-move)
   - Sui Move (mysten.move)
   - Move Syntax (damirka.move-syntax)

6. **Projeto Sui First Steps**
   - Baixado e extraído do GitHub
   - Instalado em: `C:\bootcampSui`
   - Se `C:\bootcampSui` já existir, cria: `C:\bootcampSui_YYYYMMDD`
   - Abre automaticamente o VS Code na pasta do projeto

#### Passo a Passo:

1. **Navegue até a pasta `sui-one-click-installer`:**
   ```bash
   cd bootcampSui\sui-one-click-installer
   ```

2. **Execute o instalador:**
   - Clique com o botão direito em `Install Sui (run as administrator).bat`
   - Selecione **"Executar como administrador"**
   - Ou simplesmente dê duplo clique (o script solicitará permissões automaticamente)

3. **Aguarde a instalação:**
   - O instalador usará o Chocolatey para instalar os programas
   - Todo o processo será registrado no arquivo `instalacao_sui.log`

4. **Verifique a instalação:**
   - Abra um **novo PowerShell** (importante: feche e abra novamente)
   - Execute os comandos para verificar:
     ```bash
     sui --version
     git --version
     code --version
     ```

5. **Próximos passos após instalação:**
   ```bash
   # Configurar o cliente Sui
   sui client
   
   # Selecionar a rede (testnet/devnet/mainnet)
   # Criar novo endereço
   sui client new-address ed25519
   
   # Obter tokens de teste (se necessário)
   sui client faucet
   ```

#### ⚠️ Solução de Problemas

- Se algum comando não for reconhecido após a instalação, **feche e abra um novo terminal**
- Se a instalação falhar, consulte o arquivo `instalacao_sui.log` na pasta `sui-one-click-installer`
- Certifique-se de executar como administrador

### 📦 Instalação Manual

Se preferir instalar manualmente ou estiver em outro sistema operacional:

1. **Instalar Sui CLI:**
   - Siga as instruções em: [Sui Documentation](https://docs.sui.io/build/install)
   - Verifique a instalação: `sui --version`

2. **Instalar Git:**
   - Windows: [Git for Windows](https://git-scm.com/download/win)
   - Verifique: `git --version`

3. **Instalar VS Code:**
   - [VS Code Download](https://code.visualstudio.com/)
   - Verifique: `code --version`

### 🏃 Executar os Testes

Após a instalação, navegue até o diretório do projeto:
```bash
cd bootcampSui
```

E execute os testes:

```bash
sui move test
```

Isso executará todos os testes de todos os desafios no projeto.

## 📁 Estrutura do Projeto

```
bootcampSui/
├── Move.toml              # Configuração do pacote Move
├── README.md              # README principal (índice multi-idioma)
├── .gitignore             # Arquivos ignorados pelo Git
├── docs/                  # Documentação
│   ├── README.pt.md       # Este arquivo (Português)
│   ├── README.en.md       # Versão em Inglês
│   └── README.es.md        # Versão em Espanhol
├── sui-one-click-installer/  # Scripts de instalação automática
│   ├── Install Sui (run as administrator).bat  # Instalador principal (Windows)
│   ├── script_sui.ps1      # Script PowerShell de instalação
│   └── README.txt         # Instruções do instalador
└── sources/
    └── desafios/                  # Pasta de desafios
        ├── desafio_logo.move          # Desafio 01: Logo ASCII
        ├── desafio_contador.move      # Desafio 02: Contador
        ├── desafio_lista_tarefas.move # Desafio 03: Lista de Tarefas
        └── ...                        # Outros desafios serão adicionados aqui
```

## 📚 Desafios

### Desafio 01: Logo ASCII 🎨

**Arquivo:** `sources/desafios/desafio_logo.move`

**Objetivo:** Imprimir o logo ASCII da Sui usando funções auxiliares e laços.

**Conceitos Demonstrados:**
- Funções auxiliares
- Laços (`while`)
- Vetores de bytes
- Testes unitários

**Como executar:**
```bash
cd bootcampSui
sui move test desafio_logo
```

**Resultado Esperado:**
O comando imprime o logo ASCII completo da Sui no console.

---

### Desafio 02: Contador 🔢

**Arquivo:** `sources/desafios/desafio_contador.move`

**Objetivo:** Implementar várias funções de contador usando laços e lógica condicional.

**Conceitos Demonstrados:**
- Laços (`while`)
- Reatribuição de variáveis
- Parâmetros de funções
- Múltiplas implementações de contador:
  - Contar de 1 até N
  - Contar de início até fim
  - Contagem regressiva
  - Contar com intervalo personalizado
  - Contar com mensagem personalizada

**Como executar:**
```bash
cd bootcampSui
sui move test desafio_contador
```

**Resultado Esperado:**
O comando executa todas as funções de contador e exibe os resultados da contagem no console.

---

### Desafio 03: Lista de Tarefas 📝

**Arquivo:** `sources/desafios/desafio_lista_tarefas.move`

**Objetivo:** Implementar um contrato inteligente de Lista de Tarefas com operações CRUD (Create, Read, Update, Delete).

**Conceitos Demonstrados:**
- Structs com habilidades `key` e `store`
- Criação e transferência de objetos
- Referências mutáveis (`&mut`)
- Operações com vetores
- Funções entry para interação com blockchain
- Tratamento de erros com `abort`

**Funções:**
- `new()` - Cria uma nova lista de tarefas vazia
- `adicionar_tarefa()` - Adiciona uma tarefa à lista
- `remover_tarefa()` - Remove uma tarefa pelo índice
- `alterar_tarefa()` - Altera uma tarefa pelo índice
- `quantidade_tarefas()` - Retorna o número de tarefas
- `obter_tarefa()` - Obtém uma tarefa pelo índice
- `listar_tarefas()` - Lista todas as tarefas (para debug)
- `limpar_tarefas()` - Limpa todas as tarefas

**Como testar:**
```bash
cd bootcampSui
sui move test desafio_lista_tarefas
```

**Como publicar:**
```bash
cd bootcampSui
sui client publish
```

**Como usar (após publicar):**
```bash
# Criar uma nova lista de tarefas
sui client call --package <PACKAGE_ID> --module desafio_lista_tarefas --function new --gas-budget 100000000

# Adicionar uma tarefa
sui client call --package <PACKAGE_ID> --module desafio_lista_tarefas --function adicionar_tarefa --args <LIST_OBJECT_ID> "Minha tarefa" --gas-budget 100000000

# Alterar uma tarefa (índice 0)
sui client call --package <PACKAGE_ID> --module desafio_lista_tarefas --function alterar_tarefa --args <LIST_OBJECT_ID> 0 "Tarefa alterada" --gas-budget 100000000

# Remover uma tarefa (índice 0)
sui client call --package <PACKAGE_ID> --module desafio_lista_tarefas --function remover_tarefa --args <LIST_OBJECT_ID> 0 --gas-budget 100000000
```

**Resultado Esperado:**
Os testes demonstram todas as operações CRUD em uma lista de tarefas armazenada na blockchain Sui.

---

*Mais desafios serão adicionados conforme o progresso do bootcamp.*

## 🔍 Explicação para Desenvolvedores ADVPL

### Comparação com ADVPL

| ADVPL | Move | Função |
|-------|------|--------|
| `User Function` | `fun` com `#[test]` | Função principal executável |
| `Static Function` | `fun` (sem `#[test]`) | Função auxiliar/helper |
| `While ... EndDo` | `while (...) { }` | Laço de repetição |
| `ConOut()` | `print()` | Imprime no console |
| `cTexto := "Hello"` | `b"Hello"` + `utf8()` | String (byte string) |
| `#Define CONST 0` | `const CONST: u64 = 0` | Constante |
| `#Include` | `use` | Importar bibliotecas |

### Conceitos Principais

#### 1. Módulos
Em Move, o código é organizado em módulos. É similar a ter uma classe ou conjunto de funções estáticas em ADVPL.

```move
module introducao::desafio_logo {
    // código aqui
}
```

#### 2. Funções
- Funções privadas: `fun nome_funcao()`
- Funções públicas: `public fun nome_funcao()`
- Funções de teste: `#[test] fun nome_funcao()`

#### 3. Tipos de Dados
- `u8`, `u16`, `u32`, `u64`: Números inteiros sem sinal
- `bool`: Booleano (true/false)
- `vector<T>`: Vetor/array de elementos do tipo T
- `address`: Endereço na blockchain

#### 4. Laços
Move usa `while` para laços:

```move
let i = 0;
while (i < 10) {
    // código aqui
    i = i + 1;
}
```

## 🧪 Testes

Cada desafio contém testes unitários marcados com `#[test]`.

### Executar todos os testes:
```bash
sui move test
```

### Executar um teste específico:
```bash
sui move test nome_do_teste
```

## 📚 Conceitos Aprendidos

- ✅ **Funções auxiliares**: Reutilização de código
- ✅ **Laços (`while`)**: Repetição de operações
- ✅ **Vetores de bytes**: Manipulação de strings em Move
- ✅ **Testes unitários**: Validação do código
- ✅ **Modularização**: Organização do código em funções
- ✅ **Constantes**: Definição de valores fixos
- ✅ **Imports**: Uso de bibliotecas padrão

## 🛠️ Tecnologias

- **Linguagem**: Move (Sui)
- **Plataforma**: Sui Blockchain
- **CLI**: Sui CLI
- **Editor**: VS Code (recomendado)

## 📖 Referências

- [Documentação Move](https://move-language.github.io/move/)
- [Documentação Sui](https://docs.sui.io/)
- [Move Book](https://move-book.com/)
- [Sui Developers](https://sui.io/developers)

## 📝 Notas do Desenvolvedor

Este bootcamp foi uma jornada de aprendizado vindo de ADVPL para Move. As comparações com ADVPL ajudam a entender melhor os conceitos de Move.

### Dicas para Iniciantes:

1. **Tipos são obrigatórios**: Move é fortemente tipado, diferente de ADVPL
2. **Ownership é importante**: Move usa um sistema de propriedade único
3. **Testes são essenciais**: Use `#[test]` para validar seu código
4. **Strings são bytes**: Em Move, strings são `vector<u8>` e precisam ser convertidas

## 📄 Licença

Este projeto é parte do Bootcamp Sui Move e é usado para fins educacionais.

---

**Desenvolvido com ❤️ por Cleverson Silva**

*Bootcamp Sui Move - 2025*

