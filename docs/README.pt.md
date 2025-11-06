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

Este projeto inclui um instalador de 1 clique para Windows que instala automaticamente:
- **Sui CLI**
- **Git**
- **Visual Studio Code**

#### Passo a Passo:

1. **Navegue até a pasta `instalador`:**
   ```bash
   cd bootcampSui\instalador
   ```

2. **Execute o instalador:**
   - Clique com o botão direito em `Instalar_Sui.bat`
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
- Se a instalação falhar, consulte o arquivo `instalacao_sui.log` na pasta `instalador`
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
├── instalador/            # Scripts de instalação automática
│   ├── Instalar_Sui.bat   # Instalador principal (Windows)
│   ├── script_sui.ps1      # Script PowerShell de instalação
│   └── README.txt         # Instruções do instalador
└── sources/
    ├── desafio_logo.move      # Desafio 01: Logo ASCII
    ├── desafio_contador.move  # Desafio 02: Contador
    └── ...                    # Outros desafios serão adicionados aqui
```

## 📚 Desafios

### Desafio 01: Logo ASCII 🎨

**Arquivo:** `sources/desafio_logo.move`

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

**Arquivo:** `sources/desafio_contador.move`

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

