import { Model, Sequelize } from "sequelize";

interface MascotaAttributes {
    id: number;
    nombre: string;
    especie: string;
    edad: number;
}

module.exports = (sequelize:any,DataTypes:any) => {
    class Mascota extends Model<MascotaAttributes> implements MascotaAttributes {
        public id!: number;
        public nombre!: string;
        public especie!: string;
        public edad!: number;

        static associate(models:any) {
            // define association here
        }
    }
    Mascota.init({
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        nombre:{
            type:DataTypes.STRING,
            allowNull:false
        },
        especie:{
            type:DataTypes.STRING(50),
            allowNull:false        
        },
        edad:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
    },{
        sequelize,
        modelName:'Mascota'
    });
    return Mascota;
};
        