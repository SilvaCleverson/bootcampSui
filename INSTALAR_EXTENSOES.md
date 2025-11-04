# 📦 Instalar Extensões do Move no Cursor

## 🎯 Extensões Recomendadas

Este projeto utiliza as seguintes extensões do VS Code/Cursor para melhorar o desenvolvimento em Move:

1. **Move Language Support** - `mysten.move`
   - Suporte completo para a linguagem Move
   - Syntax highlighting, autocomplete, e formatação

2. **Prettier Move** - `mysten.prettier-move`
   - Formatação automática de código Move
   - Integração com Prettier

3. **Move Syntax** - `damirka.move-syntax`
   - Syntax highlighting adicional para Move

## 🔧 Como Instalar

### Método 1: Via Interface do Cursor (Recomendado)

1. Abra o Cursor
2. Pressione `Ctrl+Shift+X` (ou `Cmd+Shift+X` no Mac) para abrir a aba de Extensões
3. Para cada extensão, procure pelo nome ou ID:
   - Digite: `mysten.move`
   - Digite: `mysten.prettier-move`
   - Digite: `damirka.move-syntax`
4. Clique em **"Install"** para cada uma

### Método 2: Via Link Direto

1. Abra cada link abaixo no navegador:
   - [Move Language Support](https://marketplace.visualstudio.com/items?itemName=mysten.move)
   - [Prettier Move](https://marketplace.visualstudio.com/items?itemName=mysten.prettier-move)
   - [Move Syntax](https://marketplace.visualstudio.com/items?itemName=damirka.move-syntax)
2. Clique em **"Install"** - isso abrirá o Cursor automaticamente
3. Confirme a instalação

### Método 3: Via Command Palette

1. Pressione `Ctrl+Shift+P` (ou `Cmd+Shift+P` no Mac)
2. Digite: `Extensions: Install Extensions`
3. Procure por cada extensão e instale

### Método 4: Via Terminal (PowerShell)

```powershell
# Instalar Move Language Support
code --install-extension mysten.move

# Instalar Prettier Move
code --install-extension mysten.prettier-move

# Instalar Move Syntax
code --install-extension damirka.move-syntax
```

**Nota:** Se `code` não funcionar, use `cursor` no lugar:
```powershell
cursor --install-extension mysten.move
cursor --install-extension mysten.prettier-move
cursor --install-extension damirka.move-syntax
```

## ✅ Verificar Instalação

Após instalar, você pode verificar se as extensões estão ativas:

1. Pressione `Ctrl+Shift+X`
2. Na barra de pesquisa, digite `@installed move`
3. Você deve ver as 3 extensões listadas

## 🎨 Configurações Recomendadas

Após instalar, você pode adicionar estas configurações ao seu `.vscode/settings.json`:

```json
{
  "[move]": {
    "editor.defaultFormatter": "mysten.prettier-move",
    "editor.formatOnSave": true
  },
  "files.associations": {
    "*.move": "move"
  }
}
```

## 📝 Notas

- O arquivo `.vscode/extensions.json` já está configurado neste projeto
- O Cursor pode sugerir automaticamente a instalação dessas extensões quando você abrir o projeto
- Certifique-se de que o Cursor está atualizado para melhor compatibilidade

---

**Desenvolvido com ❤️ por Cleverson Silva**

