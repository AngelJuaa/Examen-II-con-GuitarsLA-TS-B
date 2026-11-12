//console.log("desde Index.ts Holaaaaaa!!!!!");
import server from "./server";
import dotenv from 'dotenv';
dotenv.config()
const port = process.env.PORT || 4002;

// declarar el puerto 
server.listen(port,()=>{
    console.log("Rest api en el puerto 4002");
    console.log("escuchando desde la ruta");
    console.log("localhost 4002");
    
}

)