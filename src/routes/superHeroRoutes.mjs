import express from 'express'

import {
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,
    mostrarFormularioAgregarSuperheroe,
    agregarNuevoSuperheroeController,
    editarSuperheroeController,
    eliminarSuperheroeController,
    eliminarPorNombreSuperheroeController
} from '../controllers/superheroesController.mjs';

import { registerValidationRules } from '../middlewares/validationRules.js';
import {validationResult} from 'express-validator'



const router = express.Router();

router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/:id', obtenerSuperheroePorIdController);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.get('/heroes/mayores/30', obtenerSuperheroesMayoresDe30Controller);


///SPRINT 03 - TP 01

//router.post('/heroes', agregarNuevoSuperheroeController)
router.put('/heroes/editar/:id', editarSuperheroeController)
router.delete('/heroes/eliminar/:id', eliminarSuperheroeController)
router.delete('/heroes/eliminar/nombre/:nombre', eliminarPorNombreSuperheroeController)


/////TP 02

router.post('/heroes/nombreSuperheroe/:nombreSuperheroe', 
    registerValidationRules(), 
    (req, res, next) => {
        const errors = validationResult(req); 
            if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()})
            }
    next()},
    (req, res) => {      
        res.send('Superhéroe validado correctamente')
    })

/////TP 03

router.get('/heroes', obtenerTodosLosSuperheroesController)

router.get('/formulario', mostrarFormularioAgregarSuperheroe); //Etapa 03
router.post('/formulario/add', agregarNuevoSuperheroeController) //Etapa 03
router.get('/formulario/:id', obtenerSuperheroePorIdController) //Etapa 04
router.post('/formulario-edit/:id', editarSuperheroeController) //Etapa 04
router.delete('/eliminar/:id', eliminarSuperheroeController) //Etapa 05

export default router;