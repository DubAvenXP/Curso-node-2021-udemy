
const validarCampos = require('./validar-campos');
const validarJWT = require('./validar-jwt');
const validarRoles = require('./validar-roles');
const validarCategoria = require('./validar-categoria');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles,
    ...validarCategoria
}