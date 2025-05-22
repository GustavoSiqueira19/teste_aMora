
# Simulador de entrada de imóveis - aMora
---------------------------------------------------------------
*Este é um código de teste técnico desenvolvido para a empresa aMora.

*A aplicação simula a entrada de um imóvel e calcula o valor mensal que o usuário precisa guardar, com ajustes anuais baseados em taxas de correção (IGPM) e juros.
*

     #REQUISITOS PARA EXECUÇÃO
* - Ter o Node.js instalado na máquina.
* - Executar via terminal com o comando: node nomeDoArquivo.js (index.js).

* - Autor: Gustavo Siqueira.
* - Data: 22/05/2025.

const readline = require('readline');

    // === Execução Principal da Aplicação ===

    //Comando que importa classe de outros arquivos para ser usada no meu arquivo principal. 

    const LeitorDeTerminal = require('./leitordeterminal');
    const SimuladorDeEntradaDeImovel = require('./simuladordeentradadeimovel');
    const ImpressoraDeTerminal = require('./impressoradeterminal');

    async function main() {
    const input = new LeitorDeTerminal();

    const valorImovel = parseFloat(await input.perguntar('Digite o valor do imóvel: '));
    const percentualEntrada = parseFloat(await input.perguntar('Digite o percentual (%) da entrada: '));
    const duracaoContrato = parseInt(await input.perguntar('Digite a duração do contrato (em anos): '));
    const taxaIGPM = parseFloat(await input.perguntar('Digite a taxa do IGPM anual (%): '));
    const taxaJuros = parseFloat(await input.perguntar('Digite a taxa de juros anual (%): '));

    input.fechar();

    const calculadora = new SimuladorDeEntradaDeImovel(
        valorImovel,
        percentualEntrada,
        duracaoContrato,
        taxaIGPM,
        taxaJuros
    );

    const resultados = calculadora.getResultados();

    const impressora = new ImpressoraDeTerminal();

    impressora.mostrarResultados(resultados, taxaJuros / 100);
}   
   
    // === Entrada de Dados via Terminal === //

    class LeitorDeTerminal {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    // Exibe uma pergunta e retorna a resposta como Promise

    perguntar(texto) {
        return new Promise(resolve => {
            this.rl.question(texto, resposta => resolve(resposta));
        });
    }

    // Encerra a interface de leitura
    fechar() {
        this.rl.close();
    }

    // Exporta funcionalidades (Funções, classes ou objetos) para serem importadas e reutilizadas em outro arquivo.

    module.exports = LeitorDeTerminal
}


    // === Exibição dos Resultados no Terminal === // 

    class ImpressoraDeTerminal {
    mostrarResultados(resultado, taxaJuros) {
        console.log('\n=== Resultados ===');
        console.log(`\n● Valor da entrada:      R$ ${resultado.valorEntrada.toFixed(2)}`);
        console.log(`● Valor a guardar:       R$ ${resultado.totalAGuardar.toFixed(2)}`);
        console.log(`● Valor mensal base:     R$ ${resultado.parcelaBase.toFixed(2)}`);

        console.log('● Valor mensal pelo IGPM:');
        resultado.parcelasIGPM.forEach((valor, ano) => {
            console.log(`  ○ Ano ${ano + 1}: R$ ${valor.toFixed(2)}`);
        });

        console.log(`● Valor mensal com ${(taxaJuros * 100).toFixed(2)}% ao ano:`);
        resultado.parcelasJuros.forEach((valor, ano) => {
            console.log(`  ○ Ano ${ano + 1}: R$ ${valor.toFixed(2)}`);
        });
    }
    // Exporta funcionalidades (Funções, classes ou objetos) para serem importadas e reutilizadas em outro arquivo.

    module.exports = ImpressoraDeTerminal
}


    // === Simulação da Entrada de um Imóvel === //

    class SimuladorDeEntradaDeImovel {
    constructor(valorImovel, percentualEntrada, duracaoAnos, taxaIGPM, taxaJuros) {
        this.valorImovel = valorImovel;
        this.percentualEntrada = percentualEntrada / 100;
        this.duracaoAnos = duracaoAnos;
        this.taxaIGPM = taxaIGPM / 100;
        this.taxaJuros = taxaJuros / 100;
    }

    // Calcula o valor da entrada com base no percentual informado

    calcularEntrada() {
        return this.valorImovel * this.percentualEntrada;
    }

    // Calcula o total a ser guardado (15% do valor do imóvel)
    calcularTotalAGuardar() {
        return this.valorImovel * 0.15;
    }

    // Calcula a parcela base mensal para guardar o valor ao longo dos anos

    calcularParcelaBase() {
        return this.calcularTotalAGuardar() / (this.duracaoAnos * 12);
    }

    // Gera parcelas corrigidas com base em uma taxa anual (composta)
    
    gerarParcelasCorrigidas(taxa) {
        const parcelas = [];
        const base = this.calcularParcelaBase();

        for (let ano = 1; ano <= this.duracaoAnos; ano++) {
            const fator = Math.pow(1 + taxa, ano - 1);
            parcelas.push(Number((base * fator).toFixed(2)));
        }

        return parcelas;
    }

    // Retorna todos os valores calculados organizados
    getResultados() {
        const valorEntrada = Number(this.calcularEntrada().toFixed(2));
        const totalAGuardar = Number(this.calcularTotalAGuardar().toFixed(2));
        const parcelaBase = Number(this.calcularParcelaBase().toFixed(2));
        const parcelasIGPM = this.gerarParcelasCorrigidas(this.taxaIGPM);
        const parcelasJuros = this.gerarParcelasCorrigidas(this.taxaJuros);

        return {
            valorEntrada,
            totalAGuardar,
            parcelaBase,
            parcelasIGPM,
            parcelasJuros
        };
    }
    // Exporta funcionalidades (Funções, classes ou objetos) para serem importadas e reutilizadas em outro arquivo.

    module.exports = SimuladorDeEntradaDeImovel

}

    main();
}    



    #Exemplo preenchido:

    Digite o valor do imóvel: 500000
    Digite o percentual (%) da entrada: 5
    Digite a duração do contrato (em anos): 3 
    Digite a taxa do IGPM anual (%): 6
    Digite a taxa de juros anual (%): 8 

    ===Resultados===
    ° Valor da entrada:     R$25000.00
    ° Valor a guardar:      R$75000.00
    ° Valor mensal base:    R$2083.33
    ° Valor mensal pelo IGPM:
      ° Ano 1: R$ 2083.33
      ° Ano 2: R$ 2208.33
      ° Ano 3: R$ 2340.83
    ° Valor mensal com 8% ao ano:
     ° Ano 1: R$ 2083.33
     ° Ano 2: R$ 2250.00
     ° Ano 3: R$ 2430.00


