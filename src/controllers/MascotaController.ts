import { Request,Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";

class MascotaController extends AbstractController{
    //Singleton
    //Atributos de clase
    private static _instance: MascotaController;
    public static get instance():MascotaController{
        if(this._instance){
            return this._instance;
        }
        this._instance = new MascotaController("mascota");
        return this._instance;
    }   

    protected initializeRoutes(): void {
        this.router.get("/test",this.getTest.bind(this));
        //
        this.router.get("/consultar",this.getConsultar.bind(this));
        this.router.post("/crear",this.postCrear.bind(this));
        
    }

    private async getConsultar(req:Request,res:Response){
        try{
            console.log("Consultar mascota");
            let mascotas = await db["Mascota"].findAll();
            res.status(200).json(mascotas);
        }catch(err){
            console.error(err);
            res.status(500).send("Error al consultar mascotas");
        }
    }

    private async postCrear(req: Request, res: Response){
        try{
            console.log(req.body);
            await db.Mascota.create(req.body);
            console.log("Mascota creado")
            res.status(200).send("Mascota creado");
        }catch(err){
            console.error(err);
            res.status(500).send("Error al crear mascota");
        }
    }
    private async getTest(req: Request, res: Response){
        try{
            console.log("MascotaController works");
            res.status(200).send("MascotaController works");
        }catch(err){
            console.error(err);
            res.status(500).send("Error en MascotaController");
        }
    }
}

export default MascotaController;