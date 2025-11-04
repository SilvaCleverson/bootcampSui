# 🌊 Bootcamp Sui Move

## 📋 Sobre o Bootcamp

Este repositório contém os desafios e projetos desenvolvidos durante o Bootcamp Sui Move. Cada desafio demonstra diferentes conceitos e funcionalidades da linguagem Move na plataforma Sui.

## 👨‍💻 Autor

**Cleverson**

## 🚀 Como Executar

### Pré-requisitos

1. **Instalar Sui CLI:**
   ```bash
   sui --version
   ```
   
   Se não tiver instalado, siga as instruções em: [Sui Documentation](https://docs.sui.io/build/install)

2. **Navegar até o diretório do projeto:**
   ```bash
   cd bootcampSui
   ```

### Executar os Testes

```bash
sui move test
```

Isso executará todos os testes de todos os desafios no projeto.

## 📁 Estrutura do Projeto

```
bootcampSui/
├── Move.toml              # Configuração do pacote Move
├── README.md              # Este arquivo
├── .gitignore             # Arquivos ignorados pelo Git
└── sources/
    ├── desafio_logo.move  # Desafio 01: Logo ASCII
    └── ...                # Outros desafios serão adicionados aqui
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

**Desenvolvido com ❤️ por Cleverson**

*Bootcamp Sui Move - 2025*
