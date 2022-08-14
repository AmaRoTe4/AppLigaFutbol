import db from '../db/db.js';//este es el modelo que usa siquualiza
import { DataTypes } from 'sequelize';

const Model = db.define('Equipos',{
    nombre: {type: DataTypes.STRING },
    Defensa: {type: DataTypes.INTEGER },
    Medio: {type: DataTypes.INTEGER },
    Ataque: {type: DataTypes.INTEGER },
})

export default Model;
