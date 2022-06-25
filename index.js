import http from "http";
//req é o parametro da requisição e res é o parametro de resposta

http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/teste") {
        res.write("Acessado com sucesso!");
    } else {
        res.write("Hello World");
    }

    res.statusCode = 200;
    res.end();

}).listen(8080);
