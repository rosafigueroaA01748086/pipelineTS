import dynamodb from "../services/dynamodbService";
import joi from "joi";
import {PREFIX_NAME} from "../config";

const ProductoModel = dynamodb.define('producto',{
    hashKey:'ProductoID',
    timestamps:false,
    schema:{
        ProductoID:dynamodb.types.uuid(),
        Nombre:joi.string(),
        Precio:joi.number(),
        Marca:joi.string()
    },
    tableName:`producto${PREFIX_NAME}`
})

dynamodb.createTables((err)=>{
    if(err)
        return console.log(err);
    console.log("Tabla creadas");
})

export default ProductoModel;