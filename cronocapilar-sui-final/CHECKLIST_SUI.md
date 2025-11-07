# ✅ Checklist - Integração Sui - CronoCapilar

## 📋 Pré-requisitos

### 1. Instalação da Carteira Sui
- [ ] Instalar extensão **Sui Wallet** no navegador (Chrome/Edge)
  - Link: https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil
- [ ] Criar uma nova carteira ou importar existente
- [ ] Anotar a seed phrase em local seguro
- [ ] Obter SUI tokens na testnet (faucet)

### 2. Configuração do Ambiente
- [ ] Verificar se Node.js está instalado (`node --version`)
- [ ] Verificar se npm está funcionando (`npm --version`)
- [ ] Instalar dependências do projeto: `npm install`

---

## 🔧 Configuração do Projeto

### 3. Verificar Dependências
- [x] `@mysten/dapp-kit` instalado
- [x] `@mysten/sui` instalado
- [ ] Verificar se todas as dependências estão atualizadas: `npm outdated`

### 4. Testar Integração Básica
- [ ] Executar o projeto: `npm run dev`
- [ ] Abrir http://localhost:3000
- [ ] Verificar se o botão "Conectar Sui Wallet" aparece no header
- [ ] Conectar a carteira Sui
- [ ] Verificar se o endereço aparece formatado
- [ ] Testar desconexão

---

## 📝 Smart Contract Move

### 5. Criar Estrutura do Contrato
- [ ] Criar pasta `contracts/` no projeto (se não existir)
- [ ] Criar arquivo `Move.toml` na pasta contracts
- [ ] Criar módulo Move: `sources/cronocapilar.move`
- [ ] Definir struct para armazenar check-ins
- [ ] Implementar funções:
  - [ ] `new()` - criar novo registro
  - [ ] `check_in()` - registrar check-in
  - [ ] `get_streak()` - obter sequência atual
  - [ ] `get_last_checkin()` - obter último check-in

### 6. Publicar Contrato
- [ ] Configurar endereço do módulo no `Move.toml`
- [ ] Compilar o contrato: `sui move build`
- [ ] Testar o contrato: `sui move test`
- [ ] Publicar na testnet: `sui client publish --gas-budget 100000000`
- [ ] Anotar o Package ID retornado
- [ ] Anotar o Object ID do objeto criado

---

## 🔗 Integração Frontend ↔ Blockchain

### 7. Atualizar CheckInCard
- [ ] Importar `useSignAndExecuteTransaction` do `@mysten/dapp-kit`
- [ ] Importar `TransactionBlock` do `@mysten/sui/transactions`
- [ ] Criar função para chamar o smart contract
- [ ] Substituir localStorage por transação on-chain
- [ ] Adicionar tratamento de erros
- [ ] Adicionar loading durante transação
- [ ] Mostrar hash da transação após sucesso

### 8. Ler Dados On-Chain
- [ ] Criar função para ler streak do objeto
- [ ] Criar função para ler último check-in
- [ ] Usar `useSuiClientQuery` para buscar dados
- [ ] Atualizar UI quando dados mudarem
- [ ] Adicionar refresh manual

### 9. Tratamento de Erros
- [ ] Tratar erro de carteira não conectada
- [ ] Tratar erro de saldo insuficiente
- [ ] Tratar erro de transação rejeitada
- [ ] Mostrar mensagens de erro amigáveis
- [ ] Adicionar retry para transações falhadas

---

## 🎨 Melhorias de UX

### 10. Feedback Visual
- [ ] Adicionar loading spinner durante transação
- [ ] Mostrar progresso da transação
- [ ] Adicionar confetti/animacao ao completar check-in
- [ ] Mostrar toast notifications
- [ ] Adicionar som de sucesso (opcional)

### 11. Informações da Transação
- [ ] Mostrar link para explorer Sui após transação
- [ ] Exibir gas fee estimado antes de enviar
- [ ] Mostrar histórico de transações
- [ ] Adicionar timestamp das transações

---

## 🧪 Testes

### 12. Testes Funcionais
- [ ] Testar conexão de carteira
- [ ] Testar desconexão
- [ ] Testar check-in com carteira conectada
- [ ] Testar check-in sem carteira (modo local)
- [ ] Testar múltiplos check-ins no mesmo dia
- [ ] Testar check-in em dias diferentes
- [ ] Verificar se streak é calculado corretamente
- [ ] Testar com múltiplas carteiras

### 13. Testes de Rede
- [ ] Testar na testnet
- [ ] Testar na devnet (opcional)
- [ ] Verificar se transações aparecem no explorer
- [ ] Testar com diferentes quantidades de SUI

---

## 📚 Documentação

### 14. Documentar o Projeto
- [ ] Atualizar README.md com instruções
- [ ] Documentar como publicar o contrato
- [ ] Documentar como conectar carteira
- [ ] Adicionar screenshots
- [ ] Documentar variáveis de ambiente (se houver)
- [ ] Adicionar link para contrato publicado

---

## 🚀 Deploy

### 15. Preparar para Produção
- [ ] Configurar variáveis de ambiente
- [ ] Atualizar network para mainnet (quando pronto)
- [ ] Otimizar bundle size
- [ ] Testar build de produção: `npm run build`
- [ ] Testar build localmente: `npm start`

### 16. Deploy (quando pronto)
- [ ] Escolher plataforma (Vercel, Netlify, etc.)
- [ ] Configurar domínio
- [ ] Fazer deploy
- [ ] Testar em produção
- [ ] Configurar analytics (opcional)

---

## 🎯 Funcionalidades Extras (Opcional)

### 17. Features Avançadas
- [ ] Sistema de NFTs para conquistas
- [ ] Leaderboard on-chain
- [ ] Compartilhar streak nas redes sociais
- [ ] Exportar dados em PDF
- [ ] Notificações push para lembrar check-in
- [ ] Integração com calendário

---

## 📝 Notas Importantes

### ⚠️ Segurança
- [ ] Nunca commitar seed phrases ou chaves privadas
- [ ] Usar variáveis de ambiente para dados sensíveis
- [ ] Validar todas as entradas do usuário
- [ ] Implementar rate limiting (se necessário)

### 💡 Dicas
- Sempre teste na testnet antes de mainnet
- Mantenha backup da seed phrase
- Use faucet para obter SUI de teste
- Monitore gas fees antes de enviar transações

---

## 🔗 Links Úteis

- **Sui Wallet**: https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil
- **Sui Explorer**: https://suiexplorer.com/
- **Sui Faucet**: https://discord.com/channels/916379725201563759/971488439931392130
- **Documentação Sui**: https://docs.sui.io/
- **Documentação dApp Kit**: https://sui-typescript-docs.vercel.app/dapp-kit

---

**Última atualização**: $(date)
**Status**: 🟡 Em progresso

