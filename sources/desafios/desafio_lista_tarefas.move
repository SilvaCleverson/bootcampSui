module introducao::desafio_lista_tarefas {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use std::string::{Self, String};
    use std::vector;
    use std::debug::print;

    /// ------------------------------------------------------------------------------------
    /// Desafio: Lista de Tarefas (TodoList) - Bootcamp Sui Move
    /// Autor: Cleverson
    /// ------------------------------------------------------------------------------------

    /// Estrutura que representa uma lista de tarefas.
    /// `key` permite que seja um objeto independente na blockchain.
    /// `store` permite que seja armazenada e transferida.
    struct TodoList has key, store {
        id: UID,
        items: vector<String>,
    }

    /// Cria uma nova lista de tarefas vazia e transfere para o remetente da transação.
    public entry fun new(ctx: &mut TxContext) {
        let list = TodoList {
            id: object::new(ctx),
            items: vector::empty<String>(),
        };
        transfer::transfer(list, tx_context::sender(ctx));
    }

    /// Adiciona uma nova tarefa à lista.
    public entry fun adicionar_tarefa(list: &mut TodoList, tarefa: vector<u8>) {
        let tarefa_string = string::utf8(tarefa);
        vector::push_back(&mut list.items, tarefa_string);
    }

    /// Remove uma tarefa da lista pelo índice (começa em 0).
    public entry fun remover_tarefa(list: &mut TodoList, indice: u64) {
        let tamanho = vector::length(&list.items);
        if (indice >= tamanho) {
            abort 1 // Erro: índice inválido
        };
        vector::remove(&mut list.items, indice);
    }

    /// Altera uma tarefa existente pelo índice.
    public entry fun alterar_tarefa(list: &mut TodoList, indice: u64, nova_tarefa: vector<u8>) {
        let tamanho = vector::length(&list.items);
        if (indice >= tamanho) {
            abort 1 // Erro: índice inválido
        };
        let tarefa_string = string::utf8(nova_tarefa);
        *vector::borrow_mut(&mut list.items, indice) = tarefa_string;
    }

    /// Retorna o número de tarefas na lista.
    public fun quantidade_tarefas(list: &TodoList): u64 {
        vector::length(&list.items)
    }

    /// Obtém uma tarefa pelo índice (retorna uma cópia).
    public fun obter_tarefa(list: &TodoList, indice: u64): String {
        let tamanho = vector::length(&list.items);
        if (indice >= tamanho) {
            abort 1 // Erro: índice inválido
        };
        *vector::borrow(&list.items, indice)
    }

    /// Lista todas as tarefas (para debug/teste).
    public fun listar_tarefas(list: &TodoList) {
        let i = 0;
        let tamanho = vector::length(&list.items);
        while (i < tamanho) {
            let tarefa = vector::borrow(&list.items, i);
            print(tarefa);
            i = i + 1;
        };
    }

    /// Limpa todas as tarefas da lista (remove uma por uma).
    public entry fun limpar_tarefas(list: &mut TodoList) {
        let tamanho = vector::length(&list.items);
        let i = 0;
        while (i < tamanho) {
            vector::pop_back(&mut list.items);
            i = i + 1;
        };
    }

    // ============================================================================
    // Testes Unitários
    // ============================================================================

    #[test_only]
    use std::string::utf8;
    #[test_only]
    use sui::object::delete;

    /// Teste: Cria uma nova lista de tarefas e verifica se está vazia.
    #[test]
    fun teste_criar_lista() {
        let ctx = &mut tx_context::dummy();
        let list = TodoList {
            id: object::new(ctx),
            items: vector::empty<String>(),
        };
        
        let quantidade = quantidade_tarefas(&list);
        assert!(quantidade == 0, 0);
        print(&utf8(b"[OK] Lista criada com sucesso"));
        
        let TodoList { id, items: _ } = list;
        delete(id);
    }

    /// Teste: Adiciona tarefas à lista.
    #[test]
    fun teste_adicionar_tarefas() {
        let ctx = &mut tx_context::dummy();
        let list = TodoList {
            id: object::new(ctx),
            items: vector::empty<String>(),
        };
        
        adicionar_tarefa(&mut list, b"Estudar Move");
        adicionar_tarefa(&mut list, b"Fazer exercicios");
        adicionar_tarefa(&mut list, b"Revisar codigo");
        
        let quantidade = quantidade_tarefas(&list);
        assert!(quantidade == 3, 0);
        print(&utf8(b"[OK] 3 tarefas adicionadas"));
        
        let TodoList { id, items: _ } = list;
        delete(id);
    }

    /// Teste: Remove uma tarefa da lista.
    #[test]
    fun teste_remover_tarefa() {
        let ctx = &mut tx_context::dummy();
        let list = TodoList {
            id: object::new(ctx),
            items: vector::empty<String>(),
        };
        
        adicionar_tarefa(&mut list, b"Tarefa 1");
        adicionar_tarefa(&mut list, b"Tarefa 2");
        adicionar_tarefa(&mut list, b"Tarefa 3");
        
        // Remove a tarefa do índice 1 (Tarefa 2)
        remover_tarefa(&mut list, 1);
        
        let quantidade = quantidade_tarefas(&list);
        assert!(quantidade == 2, 0);
        print(&utf8(b"[OK] Tarefa removida com sucesso"));
        
        let TodoList { id, items: _ } = list;
        delete(id);
    }

    /// Teste: Verifica a quantidade de tarefas.
    #[test]
    fun teste_quantidade_tarefas() {
        let ctx = &mut tx_context::dummy();
        let list = TodoList {
            id: object::new(ctx),
            items: vector::empty<String>(),
        };
        
        adicionar_tarefa(&mut list, b"Tarefa 1");
        adicionar_tarefa(&mut list, b"Tarefa 2");
        
        let quantidade = quantidade_tarefas(&list);
        assert!(quantidade == 2, 0);
        print(&quantidade);
        
        let TodoList { id, items: _ } = list;
        delete(id);
    }

    /// Teste: Obtém uma tarefa específica.
    #[test]
    fun teste_obter_tarefa() {
        let ctx = &mut tx_context::dummy();
        let list = TodoList {
            id: object::new(ctx),
            items: vector::empty<String>(),
        };
        
        adicionar_tarefa(&mut list, b"Primeira tarefa");
        adicionar_tarefa(&mut list, b"Segunda tarefa");
        
        let tarefa = obter_tarefa(&list, 0);
        print(&tarefa);
        
        let TodoList { id, items: _ } = list;
        delete(id);
    }

    /// Teste: Lista todas as tarefas.
    #[test]
    fun teste_listar_tarefas() {
        let ctx = &mut tx_context::dummy();
        let list = TodoList {
            id: object::new(ctx),
            items: vector::empty<String>(),
        };
        
        adicionar_tarefa(&mut list, b"Estudar Move");
        adicionar_tarefa(&mut list, b"Fazer exercicios");
        adicionar_tarefa(&mut list, b"Revisar codigo");
        
        print(&utf8(b"=== Lista de Tarefas ==="));
        listar_tarefas(&list);
        
        let TodoList { id, items: _ } = list;
        delete(id);
    }

    /// Teste: Limpa todas as tarefas.
    #[test]
    fun teste_limpar_tarefas() {
        let ctx = &mut tx_context::dummy();
        let list = TodoList {
            id: object::new(ctx),
            items: vector::empty<String>(),
        };
        
        adicionar_tarefa(&mut list, b"Tarefa 1");
        adicionar_tarefa(&mut list, b"Tarefa 2");
        
        limpar_tarefas(&mut list);
        
        let quantidade = quantidade_tarefas(&list);
        assert!(quantidade == 0, 0);
        print(&utf8(b"[OK] Lista limpa com sucesso"));
        
        let TodoList { id, items: _ } = list;
        delete(id);
    }

    /// Teste: Tenta remover tarefa com índice inválido (deve falhar).
    #[test]
    #[expected_failure(abort_code = 1)]
    fun teste_remover_tarefa_indice_invalido() {
        let ctx = &mut tx_context::dummy();
        let list = TodoList {
            id: object::new(ctx),
            items: vector::empty<String>(),
        };
        
        adicionar_tarefa(&mut list, b"Tarefa 1");
        // Tenta remover índice 10 quando só existe índice 0
        remover_tarefa(&mut list, 10);
        
        let TodoList { id, items: _ } = list;
        delete(id);
    }

    /// Teste: Demonstra todas as funcionalidades.
    #[test]
    fun teste_demonstracao_completa() {
        let ctx = &mut tx_context::dummy();
        let list = TodoList {
            id: object::new(ctx),
            items: vector::empty<String>(),
        };
        
        print(&utf8(b"=== Demonstracao Completa da Lista de Tarefas ==="));
        
        // Adiciona tarefas
        print(&utf8(b"\n1. Adicionando tarefas..."));
        adicionar_tarefa(&mut list, b"Estudar Move");
        adicionar_tarefa(&mut list, b"Fazer exercicios");
        adicionar_tarefa(&mut list, b"Revisar codigo");
        
        // Lista tarefas
        print(&utf8(b"\n2. Listando todas as tarefas:"));
        listar_tarefas(&list);
        
        // Verifica quantidade
        let quantidade = quantidade_tarefas(&list);
        print(&utf8(b"\n3. Quantidade de tarefas:"));
        print(&quantidade);
        
        // Obtém uma tarefa específica
        print(&utf8(b"\n4. Primeira tarefa:"));
        let primeira = obter_tarefa(&list, 0);
        print(&primeira);
        
        // Remove uma tarefa
        print(&utf8(b"\n5. Removendo tarefa do indice 1..."));
        remover_tarefa(&mut list, 1);
        
        // Lista novamente
        print(&utf8(b"\n6. Lista apos remocao:"));
        listar_tarefas(&list);
        
        // Limpa todas
        print(&utf8(b"\n7. Limpando todas as tarefas..."));
        limpar_tarefas(&mut list);
        
        let quantidade_final = quantidade_tarefas(&list);
        print(&utf8(b"\n8. Quantidade final:"));
        print(&quantidade_final);
        
        let TodoList { id, items: _ } = list;
        delete(id);
    }
}
