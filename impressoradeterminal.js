class ImpressoraDeTerminal {
    mostrarResultados(resultado, taxaJuros) {
        console.log('\n=== Resultados ===');
        console.log('\n● Valor da entrada:      R$ ' + resultado.valorEntrada.toFixed(2));
        console.log('● Valor a guardar:       R$ ' + resultado.totalAGuardar.toFixed(2));
        console.log('● Valor mensal base:     R$ ' + resultado.parcelaBase.toFixed(2));

        console.log('● Valor mensal pelo IGPM:');
        resultado.parcelasIGPM.forEach((valor, ano) => {
            console.log(`  ○ Ano ${ano + 1}: R$ ${valor.toFixed(2)}`);
        });

        console.log(`● Valor mensal com ${taxaJuros * 100}% ao ano:`);
        resultado.parcelasJuros.forEach((valor, ano) => {
            console.log(`  ○ Ano ${ano + 1}: R$ ${valor.toFixed(2)}`);
        });
    }
}

module.exports = ImpressoraDeTerminal;