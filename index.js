import express from 'express';

const app = express();
// "avisa" o express que utilizarei json no corpo da requisição
app.use(express.json());

app.all('/testeAll', (req, res) => {
    res.send(req.method)
});

//ultima letra anterior ao caracter ? opcional 
app.get("/teste?", (_, res) =>{
    res.send("teste?");
})

//ultima letra anterior ao caracter + pode ser repetidada varias vezes
app.get("/buzz+", (_, res) =>{
    res.send("buzz+")
})

//na rota entre"one" e "blue", podemos colocar qualquer coisa pois subtirura o indentificar *
app.get("/one*Blue", (req, res) =>{
    res.send(req.path);
});

//os caracteres de () dão a possibilidade do q estiver dentro ser entendido como unidade
app.post("/test(ing)+", (req, res) =>{
    console.log(req.body)
    res.send("test(ing)?");
});


//expressão regular, no exemplo abaixo se a rota conter Red batera nesse endpoint, não é colocada entre apas e sim entre barras
app.get(/.*Red$/, (_, res) =>{
    res.send("/.*Red$/");
});


//parametros na rota
app.get("/testeparam/:id", (req, res) =>{
    res.send(req.params.id);
});

//com parametros opcionais basta utilizar o caracter ?
app.get("/testeparam/:id/:a?", (req, res) =>{
    res.send(req.params.id + " " + req.params.a);
});

//parametros por query
app.get("/testequery", (req, res) =>{
    res.send(req.query)
})

//next tambem pode-se criar um array de functions para isso:
app.get("/testeMultipleHandles", (req, res, next) =>{
    console.log("Callback 1");
    next();
}, (req, res) =>{
    console.log("Callback 2");
    res.end();
});

//com array
function callback1 (req, res, next){
    console.log("Calback1");
    next();
}

function callback2 (req, res, next){
    console.log("Calback2");
    next();
}

function callback3 (req, res){
    console.log("Calback3");
    res.end();
}

app.get("/testeMultipleHandlesArray", [callback1, callback2, callback3]);


app.route("/testeRoute")
    .get((req, res) =>{
        res.send("GET")
    })
    .post((req, res) =>{
        res.send("POST")
    })
    .delete((req, res) =>{
        res.send("DELETE")
    });

    
app.listen(3000, ()=>{
    console.log("EXECUTANDO")
})