import { Request,Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";
import DepartamentModel from "../modelsNOSQL/departamentoNOSQL";

class AgenteController extends AbstractController{
    //Singleton
    //Atributos de clase
    private static _instance: AgenteController;
    public static get instance():AgenteController{
        if(this._instance){
            return this._instance;
        }
        this._instance = new AgenteController("agente");
        return this._instance;
    }   

    protected initializeRoutes(): void {
        this.router.get("/test",this.getTest.bind(this));
        //CRUD
        this.router.get("/consultar",this.getConsultar.bind(this));
        this.router.post("/crear",this.postCrear.bind(this));
        this.router.post("/crearDepto", this.postCrearDepto.bind(this));
        this.router.get("/consultaDepto",this.getConsultaDepto.bind(this));
        //this.router.post("/cambiar",);
        //this.router.post("/eliminar",);       
    }
    private async getConsultaDepto(req:Request,res:Response){
        try{
            const deptos = await DepartamentModel.scan().exec().promise();
            res.status(200).send(deptos[0].Items);
            console.log(deptos);
        }catch(err){
            console.error(err);
            res.status(500).send("Error al consultar departamentos");
        }
    }

    private async postCrearDepto(req: Request, res: Response){
        try{    
            console.log(req.body);
            await DepartamentModel.create(req.body);
            console.log("Departamento creado");
            res.status(200).send("Departamento creado");
        }catch(err){
            console.log(err);
            res.status(500).send("Error al crear departamento");
        }
    }

    private async getConsultar(req:Request,res:Response){
        try{
            console.log("Consultar agentes");
            let agentes = await db["Agente"].findAll();
            res.status(200).json(agentes);
        }catch(err){
            console.error(err);
            res.status(500).send("Error al consultar agentes");
        }
    }

    private async postCrear(req: Request, res: Response){
        try{
            console.log(req.body);
            await db.Agente.create(req.body);
            console.log("Agente creado")
            res.status(200).send("Agente creado");
        }catch(err){
            console.error(err);
            res.status(500).send("Error al crear agente");
        }
    }
    private async getTest(req: Request, res: Response){
        try{
            console.log("AgenteController works");
            res.status(200).send("AgenteController works");
        }catch(err){
            console.error(err);
            res.status(500).send("Error en AgenteController");
        }
    }
}

export default AgenteController;