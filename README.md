

# Simulador de entrada de imóveis - aMora
---------------------------------------------------------------
    // Simulador de Entrada de Imóvel: 
Este projeto é uma aplicação de linha de comando (CLI) desenvolvida por Gustavo Siqueira da Silva em Node.js, com o objetivo de permitir ao usuário simular o valor necessário para dar entrada em um imóvel e planejar a economia mensal necessária ao longo de um período de tempo. Considerando também a correção monetária com base em taxas como o IGPM e juros compostos anuais.

*(Para a execução do código, é necessário ter Node.js instalado em seu computador.)*

*(Para executar o código, utilizar o seguinte comando em seu terminal:*


     node index.js

.

    // Estrutura e Componentes do Sistema:
 A aplicação é dividida em três módulos principais, seguindo o princípio da separação de responsabilidades:

    1. LeitorDeTerminal (leitordeterminal.js)

 - Classe responsável por interagir com o usuário via terminal.

 - Utiliza o módulo readline do Node.js para realizar perguntas e capturar as respostas do usuário.

        Métodos:

 - Perguntar(texto): exibe uma pergunta e retorna a resposta como uma Promisse.

 - Fechar(): encerra a interface de leitura.

        2. SimuladorDeEntradaDeImovel (simuladordeentradadeimovel.js)

 - Classe que realiza todos os cálculos financeiros da aplicação.

 - A partir dos dados fornecidos pelo usuário, calcula:

 - Valor da entrada (com base no percentual informado).

 - Total a ser guardado (fixado em 15% do valor do imóvel).

 - Parcela base mensal (dividido pela quantidade de meses do contrato).

 - Parcelas corrigidas anualmente pelo IGPM e pelos juros compostos.

 - Utiliza fórmulas de juros compostos para simular a variação das parcelas com o tempo.

        3. ImpressoraDeTerminal (impressoradeterminal.js) Classe responsável por exibir os resultados no terminal de forma organizada e formatada.

    Mostra:

 - Valor da entrada.

 - Valor total a guardar.

 - Parcela base mensal.

 - Parcelas corrigidas pelo IGPM.

 - Parcelas corrigidas pelos juros compostos anuais.



         // Execução Principal (main)

 - O fluxo principal da aplicação segue os seguintes passos:

 - Cria uma instância de LeitorDeTerminal para capturar os dados do usuário:

 - Valor do imóvel.

 - Percentual da entrada.

 - Duração do contrato (em anos).

 - Taxa do IGPM anual.

 - Taxa de juros anual.

 - Após coletar os dados, fecha a interface de entrada.

 - Cria uma instância de SimuladorDeEntradaDeImovel com os dados fornecidos e chama o método getResultados() para obter os valores calculados.

 - Por fim, utiliza a ImpressoraDeTerminal para exibir os resultados formatados.
 

         // Resumo das Funcionalidades

 - Entrada de dados via terminal.

 - Cálculos de entrada, economia e parcelas mensais.

 - Correção monetária com IGPM e juros compostos.

 - Exibição formatada dos resultados.

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




