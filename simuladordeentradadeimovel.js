class SimuladorDeEntradaDeImovel {
    constructor(valorImovel, percentualEntrada, duracaoAnos, taxaIGPM, taxaJuros) {
        this.valorImovel = valorImovel;
        this.percentualEntrada = percentualEntrada / 100;
        this.duracaoAnos = duracaoAnos;
        this.taxaIGPM = taxaIGPM / 100;
        this.taxaJuros = taxaJuros / 100;
    }

    calcularEntrada() {
        return this.valorImovel * this.percentualEntrada;
    }

    calcularTotalAGuardar() {
        return this.valorImovel * 0.15;
    }

    calcularParcelaBase() {
        return this.calcularTotalAGuardar() / (this.duracaoAnos * 12);
    }

    gerarParcelasCorrigidas(taxa) {
        const parcelas = [];
        const base = this.calcularParcelaBase();
        

        for (let ano = 1; ano <= this.duracaoAnos; ano++) {
            const fator = Math.pow(1 + taxa, ano - 1);

            parcelas.push(Number((base * fator).toFixed(2)));
        }

        return parcelas;
    }

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
}

module.exports = SimuladorDeEntradaDeImovel;