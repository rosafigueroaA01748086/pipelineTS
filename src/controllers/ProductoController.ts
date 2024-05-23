import { Request,Response } from "express";
import AbstractController from "./AbstractController";
// import db from "../models";
import ProductoModel from "../modelsNOSQL/productoNOSQL";

class ProductoController extends AbstractController{
    //Singleton
    //Atributos de clase
    private static _instance: ProductoController;
    public static get instance():ProductoController{
        if(this._instance){
            return this._instance;
        }
        this._instance = new ProductoController("producto");
        return this._instance;
    }   

    protected initializeRoutes(): void {
        this.router.get("/test",this.getTest.bind(this));
        //
        this.router.post("/crearProducto", this.postCrearProducto.bind(this));
        this.router.get("/consultaProducto",this.getConsultaProducto.bind(this));
      
    }
    private async getConsultaProducto(req:Request,res:Response){
        try{
            const producto = await ProductoModel.scan().exec().promise();
            res.status(200).send(producto[0].Items);
            console.log(producto);
        }catch(err){
            console.error(err);
            res.status(500).send("Error al consultar productos");
        }
    }

    private async postCrearProducto(req: Request, res: Response){
        try{    
            console.log(req.body);
            await ProductoModel.create(req.body);
            console.log("Producto creado");
            res.status(200).send("Producto creado");
        }catch(err){
            console.log(err);
            res.status(500).send("Error al crear producto");
        }
    }

    private async getTest(req: Request, res: Response){
        try{
            console.log("ProductoController works");
            res.status(200).send("ProductoController works");
        }catch(err){
            console.error(err);
            res.status(500).send("Error en ProductoController");
        }
    }
}

export default ProductoController;