//utilizando promisses com async e await
import {promises as fs} from 'fs'


async function exec () {
    try {
        await fs.writeFile("teste.txt", "bla bla bla");
        await fs.appendFile("teste.txt", " - teste append");
        const data = await fs.readFile("teste.txt", "utf-8");

        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

exec();

//utilizando promisses com then
/*import {promises as fs} from 'fs'

fs.writeFile("teste.txt", "bla bla bla").then(()=>{
    fs.appendFile("teste.txt", " - teste append").then(()=>{
        fs.readFile("teste.txt", "utf-8").then(resp =>{
            console.log(resp)
        }).catch(err =>{console.log(err)})
    }).catch(err =>{console.log(err)})
}).catch(err =>{
    console.log(err);
})*/



//forma assincrona com callback

/*import fs from 'fs';

console.log('1');
fs.writeFile("teste.txt", "bla bla bla", function(err){
    console.log('2');
    if(err){
        console.log(err)
    }else{
        fs.appendFile("teste.txt", " - teste appendFile", (err) =>{
            if(err){
                console.log(err);
            }else{
                fs.readFile("teste.txt", "utf-8", (err, data) => {
                    if(err){
                        console.log(err);
                    }else{
                        console.log(data);
                    }
                })      
            }
        })
    }
});
console.log('3');*/


//forma sincrona
/*try{
    console.log("1");
    fs.writeFileSync("teste.txt", "bla bla bla");
    console.log("2");
    const data = fs.readFileSync("teste.txt", "utf-8");
    console.log(data);
    console.log("3");
}catch(err){
    console.log(err);
}   */