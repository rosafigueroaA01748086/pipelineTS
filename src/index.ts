import Server from "./providers/Server";
import {PORT,NODE_ENV} from './config';
import express from 'express';
import MascotaController from "./controllers/MascotaController";
import ProductoController from "./controllers/ProductoController";

const server = new Server({
    port:PORT,
    env:NODE_ENV,
    middlewares:[
        express.json(),
        express.urlencoded({extended:true})
    ],
    controllers:[
        // MascotaController.instance,
        ProductoController.instance
    
    ]
    
});

server.init();