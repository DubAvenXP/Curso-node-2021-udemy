const { Router } = require('express');
const { check } = require('express-validator');

const { productosDelete, productosGet, productosGetId, productosPost, productosPut } = require('../controllers');
const { existeProductoPorId, existeProducto, existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole, existeCategoria } = require('../middlewares');


const router = Router();

//Obtener todas las categorias
router.get('/', productosGet);

//Obtener categoria por id 
router.get('/:id', [
    check('id', 'El id es obligatorio').isMongoId().custom(existeProductoPorId),
    validarCampos
],productosGetId);

// Crear categoria - privado - cualquier persona con token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty().custom(existeProducto),
    check('categoria', 'La categoria es obligatoria').notEmpty().custom(existeCategoriaPorId),
    validarCampos,
], productosPost);

//Actualizar - id - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('id', 'no es un id valido').isMongoId().custom(existeProductoPorId),
    check('categoria', 'no es un id valido').isMongoId().custom(existeCategoriaPorId),
    validarCampos,
],productosPut);

//Borrar  una categoria - solo los admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'no es un id valido').isMongoId().custom(existeProductoPorId),
    validarCampos
], productosDelete);

module.exports = router;