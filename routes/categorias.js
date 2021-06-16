const { Router } = require('express');
const { check } = require('express-validator');

const { categoriasDelete, categoriasGet, categoriasGetId, categoriasPost, categoriasPut } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');


const router = Router();

//Obtener todas las categorias
router.get('/', categoriasGet);

//Obtener categoria por id 
router.get('/:id', [
    check('id', 'El id es obligatorio').isMongoId().custom(existeCategoriaPorId),
    validarCampos
],categoriasGetId);

// Crear categoria - privado - cualquier persona con token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], categoriasPost);

//Actualizar - id - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('id', 'no es un id valido').isMongoId().custom(existeCategoriaPorId),
    validarCampos
],categoriasPut);

//Borrar  una categoria - solo los admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'no es un id valido').isMongoId().custom(existeCategoriaPorId),
    validarCampos
], categoriasDelete);

module.exports = router;