const LeitorDeTerminal = require('./leitordeterminal');
const SimuladorDeEntradaDeImovel = require('./simuladordeentradadeimovel');
const ImpressoraDeTerminal = require('./impressoradeterminal');

// === Aplicação Principal ===
async function main() {
    const input = new LeitorDeTerminal();

    const valorImovel = parseFloat(await input.perguntar('Digite o valor do imóvel: '));
    const percentualEntrada = parseFloat(await input.perguntar('Digite o percentual (%) da entrada: '));
    const duracaoContrato = parseInt(await input.perguntar('Digite a duração do contrato (em anos): '));
    const taxaIGPM = parseFloat(await input.perguntar('Digite a taxa do IGPM anual (%): '));
    const taxaJuros = parseFloat(await input.perguntar('Digite a taxa de juros anual (%) para cenário alternativo: '));

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

main();


