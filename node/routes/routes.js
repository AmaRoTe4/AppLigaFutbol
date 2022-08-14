import {getAllEquipos , getEquipo , updateEquipo , createEquipo , deleteEquipo } from '../controllers/controllers.js'
import express  from 'express'

const router = express.Router()

router.get('/', getAllEquipos);
router.get('/:id', getEquipo);
router.post('/', createEquipo);
router.delete('/:id', deleteEquipo);
router.put('/:id', updateEquipo);

export default router;