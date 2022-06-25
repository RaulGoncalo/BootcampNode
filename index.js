import event from "./event.js";

event.on("testeEvent", () =>{
    console.log("ouviu tbm")
});

event.emit("testeEvent", "abc")