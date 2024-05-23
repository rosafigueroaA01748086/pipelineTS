import dynamodb from "../services/dynamodbService";
import joi from "joi";
import {PREFIX_NAME} from "../config";

const DepartamentModel = dynamodb.define('departamento',{
    hashKey:'DeptoId',
    timestamps:false,
    schema:{
        DeptoId:dynamodb.types.uuid(),
        Nombre:joi.string(),
        numAgen:joi.number()
    },
    tableName:`Departamento${PREFIX_NAME}`
})

dynamodb.createTables((err)=>{
    if(err)
        return console.log(err);
    console.log("Tabla creadas");
})

export default DepartamentModel;