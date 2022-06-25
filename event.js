import {EventEmitter} from "events";

const eventEmitter = new EventEmitter();

export default eventEmitter.on("testeEvent", obj =>{
        console.log(obj);
    });