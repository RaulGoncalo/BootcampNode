const teste = 'Exporta tudo, até variaveis e constantes'

function soma(a, b) {
    return a + b
}

function subtracao(a, b){
    return a - b
}


//modelo de exportação default 
module.exports = {soma, subtracao, teste}; 