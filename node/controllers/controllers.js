import Model from '../models/models.js';

export const getAllEquipos = async (req, res) => {
    try{
        const modelos = await Model.findAll();
        res.json(modelos);
    }catch(err){
        res.json({message: error.message});
    }
}

export const getEquipo = async (req, res) => {
    try{
        const modelos = await Model.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(modelos);
    }catch(err){
        res.json({message: error.message});
    }
}

export const updateEquipo = async (req, res) => {
    try{
        await Model.update(req.body , {
            where: {
                id: req.params.id
            }
        });
        res.json({"message":"actualizado con exitos"});
    }catch(err){
        res.json({message: error.message});
    }
}

export const createEquipo = async (req, res) => {
    try{
        await Model.create(req.body);
        res.json({"message":"fue creado con exito" });
    }catch(err){
        res.json({message: error.message});
    }
}

export const deleteEquipo = async (req, res) => {
    try{
        await Model.destroy({
            where: {id: req.params.id}
        });
        res.json({"message":"fue eleminado con exito"});
    }catch(err){
        res.json({message: error.message});
    }
}