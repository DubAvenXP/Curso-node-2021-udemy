const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarArchivo, obtenerArchivo, actualizarArchivoCloudinary } = require('../controllers');
const {coleccionesPermitidas} = require('../helpers');
const { validarCampos, validarArchivoSubir } = require('../middlewares');

const router = Router();
router.post('/', validarArchivoSubir, cargarArchivo);
router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id es invalido').isMongoId(),
    check('coleccion').custom(coleccion => coleccionesPermitidas(coleccion, ['usuarios', 'productos'])),
    validarCampos
],
    actualizarArchivoCloudinary);
router.get('/:coleccion/:id', [
    check('id', 'El id es invalido').isMongoId(),
    check('coleccion').custom(coleccion => coleccionesPermitidas(coleccion, ['usuarios', 'productos'])),
    validarCampos
],
    obtenerArchivo);

module.exports = router;