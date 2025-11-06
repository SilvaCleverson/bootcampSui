#[test_only]
module introducao::desafio_contador {
    use std::debug::print;
    use std::string::utf8;

    /// ------------------------------------------------------------------------------------
    /// Desafio: Contador - Bootcamp Sui Move
    /// Autor: Cleverson
    /// ------------------------------------------------------------------------------------

    /// Conta de 1 até um número máximo e imprime cada valor.
    fun contar_ate(maximo: u64) {
        let contador: u64 = 1;
        
        while (contador <= maximo) {
            print(&contador);
            contador = contador + 1;
        };
    }

    /// Conta de um número inicial até um número final.
    fun contar_de_ate(inicio: u64, fim: u64) {
        let contador = inicio;
        
        while (contador <= fim) {
            print(&contador);
            contador = contador + 1;
        };
    }

    /// Conta regressivamente de um número até 1.
    fun contar_regressivo(inicio: u64) {
        let contador = inicio;
        
        while (contador > 0) {
            print(&contador);
            contador = contador - 1;
        };
    }

    /// Conta com intervalo personalizado (ex: de 0 a 100 de 5 em 5).
    fun contar_com_intervalo(inicio: u64, fim: u64, passo: u64) {
        let contador = inicio;
        
        while (contador <= fim) {
            print(&contador);
            contador = contador + passo;
        };
    }

    /// Conta e mostra mensagem personalizada para cada número.
    fun contar_com_mensagem(maximo: u64, mensagem: vector<u8>) {
        let contador: u64 = 1;
        
        while (contador <= maximo) {
            print(&utf8(mensagem));
            print(&contador);
            contador = contador + 1;
        };
    }

    /// Teste básico: contar de 1 a 10
    #[test]
    fun teste_contar_ate_10() {
        print(&utf8(b"=== Contador de 1 a 10 ==="));
        contar_ate(10);
    }

    /// Teste: contar de 5 a 15
    #[test]
    fun teste_contar_de_ate() {
        print(&utf8(b"=== Contador de 5 a 15 ==="));
        contar_de_ate(5, 15);
    }

    /// Teste: contagem regressiva de 10 a 1
    #[test]
    fun teste_contagem_regressiva() {
        print(&utf8(b"=== Contagem Regressiva de 10 a 1 ==="));
        contar_regressivo(10);
    }

    /// Teste: contar com intervalo (de 0 a 20 de 2 em 2)
    #[test]
    fun teste_contar_com_intervalo() {
        print(&utf8(b"=== Contador de 0 a 20 (intervalo de 2) ==="));
        contar_com_intervalo(0, 20, 2);
    }

    /// Teste: contar com mensagem personalizada
    #[test]
    fun teste_contar_com_mensagem() {
        print(&utf8(b"=== Contador com Mensagem ==="));
        contar_com_mensagem(5, b"Numero: ");
    }

    /// Teste: demonstrar todos os tipos de contador
    #[test]
    fun teste_todos_os_contadores() {
        print(&utf8(b"========================================"));
        print(&utf8(b"Demonstracao de Todos os Contadores"));
        print(&utf8(b"========================================"));
        
        print(&utf8(b"\n1. Contador simples (1 a 5):"));
        contar_ate(5);
        
        print(&utf8(b"\n2. Contador de 10 a 15:"));
        contar_de_ate(10, 15);
        
        print(&utf8(b"\n3. Contagem regressiva (5 a 1):"));
        contar_regressivo(5);
        
        print(&utf8(b"\n4. Contador com intervalo (0 a 10 de 2 em 2):"));
        contar_com_intervalo(0, 10, 2);
        
        print(&utf8(b"\n5. Contador com mensagem (1 a 3):"));
        contar_com_mensagem(3, b"Passo: ");
    }
}

