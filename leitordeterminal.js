const readline = require('readline');

class LeitorDeTerminal {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    perguntar(texto) {
        return new Promise(resolve => {
            this.rl.question(texto, resposta => resolve(resposta));
        });
    }

    fechar() {
        this.rl.close();
    }
}

module.exports = LeitorDeTerminal;