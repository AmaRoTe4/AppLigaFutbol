import express from "express";
import cors from "cors";
import db from './db/db.js'
import {router1 , router2 , router3} from "./routes/routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/Resultados' , router3);
app.use('/Tabla' , router2);
app.use('/Equipos' , router1);

try{
    await db.authenticate();
    console.log("anda");
}catch(error){
    console.log(error);
}

app.get('/', (req, res)=>{
   res.send("hola")
})

app.listen(4000, ()=>{
    console.log('Server running at http://localhost:4000/');
})