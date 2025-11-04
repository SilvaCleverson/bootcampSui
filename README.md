# 🎨 Desafio Logo ASCII - Bootcamp Sui Move

## 📋 Sobre o Desafio

Este projeto implementa a impressão do logo ASCII da Sui usando a linguagem Move. O desafio demonstra o uso de:
- Funções auxiliares
- Laços (`while`)
- Vetores de bytes
- Testes unitários

## 👨‍💻 Autor

**Cleverson Silva** - Especialista em ADVPL

## 🚀 Como Executar

### Pré-requisitos

1. Instalar Sui CLI:
   ```bash
   sui --version
   ```

2. Navegar até o diretório do projeto:
   ```bash
   cd bootcampSui
   ```

### Executar os Testes

```bash
sui move test
```

### Resultado Esperado

O comando deve imprimir o logo ASCII da Sui no console e mostrar:

```
[debug] "===================================================================================================="
[debug] "===================================================================================================="
... (logo completo)
[debug] "===================================================================================================="
[ PASS ] introducao::desafio_logo::desafio_logo
[ PASS ] introducao::desafio_logo::desafio_logo_fail
Test result: OK. Total tests: 2; passed: 2; failed: 0
```

## 📁 Estrutura do Projeto

```
bootcampSui/
├── Move.toml          # Configuração do pacote Move
├── README.md          # Este arquivo
├── .gitignore         # Arquivos ignorados pelo Git
└── sources/
    └── desafio_logo.move  # Código principal do desafio
```

## 📝 Estrutura do Código

### Módulo Principal

```move
module introducao::desafio_logo
```

### Funções

#### 1. `print_line(line: vector<u8>)`
Função auxiliar que imprime uma linha ASCII no console.

**Parâmetros:**
- `line`: Vetor de bytes contendo a linha a ser impressa

**Exemplo:**
```move
print_line(b"=== Linha exemplo ===");
```

#### 2. `repeat_line(line: vector<u8>, n: u64)`
Função auxiliar que repete uma linha N vezes usando um laço.

**Parâmetros:**
- `line`: Vetor de bytes contendo a linha a ser repetida
- `n`: Número de vezes que a linha será repetida

**Exemplo:**
```move
repeat_line(b"====", 5);  // Imprime 5 vezes
```

#### 3. `desafio_logo()`
Função principal do desafio que imprime o logo completo da Sui.

**Estrutura:**
- Cabeçalho: 9 linhas de `===`
- Corpo: 47 linhas únicas do logo ASCII
- Rodapé: 9 linhas de `===`

## 🔍 Explicação do Código (para desenvolvedores ADVPL)

### Comparação com ADVPL

| ADVPL | Move | Função |
|-------|------|--------|
| `User Function` | `fun` com `#[test]` | Função principal executável |
| `Static Function` | `fun` (sem `#[test]`) | Função auxiliar/helper |
| `While ... EndDo` | `while (...) { }` | Laço de repetição |
| `ConOut()` | `print()` | Imprime no console |
| `cTexto := "Hello"` | `b"Hello"` + `utf8()` | String (byte string) |

### Fluxo de Execução

```
desafio_logo() (função principal)
    │
    ├─→ repeat_line() (repetir linha 9x)
    │       │
    │       └─→ print_line() (imprime cada linha)
    │
    ├─→ print_line() (imprime cada linha única do corpo - 47x)
    │
    └─→ repeat_line() (repetir linha 9x)
            │
            └─→ print_line() (imprime cada linha)
```

## 🧪 Testes

O projeto contém 2 testes:

1. **`desafio_logo()`**: Teste principal que imprime o logo
2. **`desafio_logo_fail()`**: Teste que verifica tratamento de erro (deve falhar propositalmente)

### Executar apenas um teste específico

```bash
sui move test desafio_logo
```

## 📚 Conceitos Demonstrados

- ✅ **Funções auxiliares**: Reutilização de código
- ✅ **Laços (`while`)**: Repetição de operações
- ✅ **Vetores de bytes**: Manipulação de strings em Move
- ✅ **Testes unitários**: Validação do código
- ✅ **Modularização**: Organização do código em funções

## 🛠️ Tecnologias

- **Linguagem**: Move (Sui)
- **Plataforma**: Sui Blockchain
- **CLI**: Sui CLI

## 📖 Referências

- [Documentação Move](https://move-language.github.io/move/)
- [Documentação Sui](https://docs.sui.io/)
- [Move Book](https://move-book.com/)

## 📄 Licença

Este projeto é parte do Bootcamp Sui Move.

---

**Desenvolvido com ❤️ por Cleverson Silva**

