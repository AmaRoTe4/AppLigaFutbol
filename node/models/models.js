import db from '../db/db.js';//este es el modelo que usa siquualiza
import { DataTypes } from 'sequelize';

export const ModelEquipos = db.define('Equipos',{
    nombre: {type: DataTypes.STRING },
    Defensa: {type: DataTypes.INTEGER },
    Medio: {type: DataTypes.INTEGER },
    Ataque: {type: DataTypes.INTEGER },
})

export const MLEJ= db.define('LigaEnJuego',{
    idDeEquipo: {type: DataTypes.INTEGER },
    puntos: {type: DataTypes.INTEGER },
    partidosJugados: {type: DataTypes.INTEGER },
    golesAFavor: {type: DataTypes.INTEGER },
    golesEnContra: {type: DataTypes.INTEGER },
    nombre: {type: DataTypes.STRING },
    Ataque: {type: DataTypes.INTEGER },
    Medio: {type: DataTypes.INTEGER },
    Defensa: {type: DataTypes.INTEGER },
    Seleccionado: {type: DataTypes.INTEGER },
})

export const ModelResultados = db.define('Resultados',{
    golesLocal: {type: DataTypes.INTEGER },
    golesVisitante: {type: DataTypes.INTEGER },
    estado: {type: DataTypes.INTEGER },
    idDePartido: {type: DataTypes.INTEGER },
})