const { Router } = require('express');
const { check } = require('express-validator');

const { esRolValido, existeCorreo, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const { usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);


router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'Correo no es valido').isEmail().custom(existeCorreo),
    check('password', 'La contaseña debe tener mas de 6 caracteres').not().isEmpty().isLength({min:6}),
    // check('rol', 'No es un rol permitido o valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost);


router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);
router.patch('/', usuariosPatch);

module.exports = router;