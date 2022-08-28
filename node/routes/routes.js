import {getAllEquipos , getEquipo , updateEquipo , createEquipo , deleteEquipo ,getAllLigaEnJuegos , getLigaEnJuego , updateLigaEnJuego , createLigaEnJuego , deleteLigaEnJuego ,getAllResultados , getResultado , updateResultado , createResultado , deleteResultado } from '../controllers/controllers.js'
import express  from 'express'

export const router1 = express.Router()

router1.get('/', getAllEquipos);
router1.get('/:id', getEquipo);
router1.post('/', createEquipo);
router1.delete('/:id', deleteEquipo);
router1.put('/:id', updateEquipo);

export const router2 = express.Router()

router2.get('/', getAllLigaEnJuegos);
router2.get('/:id', getLigaEnJuego);
router2.post('/', createLigaEnJuego);
router2.delete('/:id', deleteLigaEnJuego);
router2.put('/:id', updateLigaEnJuego);

export const router3 = express.Router()

router3.get('/', getAllResultados);
router3.get('/:id', getResultado);
router3.post('/', createResultado);
router3.delete('/:id', deleteResultado);
router3.put('/:id', updateResultado);
