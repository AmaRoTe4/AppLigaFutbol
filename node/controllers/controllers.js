import {ModelEquipos , MLEJ , ModelResultados} from '../models/models.js';

export const getAllEquipos = async (req, res) => {
    try{
        const modelos = await ModelEquipos.findAll();
        res.json(modelos);
    }catch(err){
        res.json({message: err.message});
    }
}

export const getEquipo = async (req, res) => {
    try{
        const modelos = await ModelEquipos.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(modelos);
    }catch(err){
        res.json({message: err.message});
    }
}

export const updateEquipo = async (req, res) => {
    try{
        await ModelEquipos.update(req.body , {
            where: {
                id: req.params.id
            }
        });
        res.json({"message":"actualizado con exitos"});
    }catch(err){
        res.json({message: err.message});
    }
}

export const createEquipo = async (req, res) => {
    try{
        await ModelEquipos.create(req.body);
        res.json({"message":"fue creado con exito" });
    }catch(err){
        res.json({message: err.message});
    }
}

export const deleteEquipo = async (req, res) => {
    try{
        await ModelEquipos.destroy({
            where: {id: req.params.id}
        });
        res.json({"message":"fue eleminado con exito"});
    }catch(err){
        res.json({message: err.message});
    }
}

export const getAllLigaEnJuegos = async (req, res) => {
    try{
        const modelos = await MLEJ.findAll();
        res.json(modelos);
    }catch(err){
        res.json({message: err.message});
    }
}

export const getLigaEnJuego = async (req, res) => {
    try{
        const modelos = await MLEJ.findAll({
            where: {
                idDeEquipo: req.params.id
            }
        });
        res.json(modelos);
    }catch(err){
        res.json({message: err.message});
    }
}

export const updateLigaEnJuego = async (req, res) => {
    try{
        await MLEJ.update(req.body , {
            where: {
                idDeEquipo: req.params.id
            }
        });
        res.json({"message":"actualizado con exitos"});
    }catch(err){
        res.json({message: err.message});
    }
}

export const createLigaEnJuego = async (req, res) => {
    try{
        await MLEJ.create(req.body);
        res.json({"message":"fue creado con exito" });
    }catch(err){
        res.json({message: err.message});
    }
}

export const deleteLigaEnJuego = async (req, res) => {
    try{
        await MLEJ.destroy({
            where: {id: req.params.id}
        });
        res.json({"message":"fue eleminado con exito"});
    }catch(err){
        res.json({message: err.message});
    }
}

export const getAllResultados = async (req, res) => {
    try{
        const modelos = await ModelResultados.findAll();
        res.json(modelos);
    }catch(err){
        res.json({message: err.message});
    }
}

export const getResultado = async (req, res) => {
    try{
        const modelos = await ModelResultados.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(modelos);
    }catch(err){
        res.json({message: err.message});
    }
}

export const updateResultado = async (req, res) => {
    try{
        await ModelResultados.update(req.body , {
            where: {
                id: req.params.id
            }
        });
        res.json({"message":"actualizado con exitos"});
    }catch(err){
        res.json({message: err.message});
    }
}

export const createResultado = async (req, res) => {
    try{
        await ModelResultados.create(req.body);
        res.json({"message":"fue creado con exito" });
    }catch(err){
        res.json({message: err.message});
    }
}

export const deleteResultado = async (req, res) => {
    try{
        await ModelResultados.destroy({
            where: {id: req.params.id}
        });
        res.json({"message":"fue eleminado con exito"});
    }catch(err){
        res.json({message: err.message});
    }
}