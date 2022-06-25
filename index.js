import readline from "readline";

//nescessario criar uma intaface para interação

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


pergunta();

function pergunta () {
    rl.question("Digite um numero: ", numero =>{
        const multiplos = [];

        if(parseInt(numero) === 0){
            rl.close();
        }else{
            for(let i = 0; i < parseInt(numero); i++){
                if(i % 3 === 0 || i % 5 === 0){
                    multiplos.push(i);
                }
            }
            console.log(multiplos);
            pergunta();
        };
    })
}


