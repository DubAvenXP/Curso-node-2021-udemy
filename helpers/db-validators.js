const Rol = require('../models/rol');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {
    const existeRol = await Rol.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la DB`);
    }
}

const existeCorreo = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error('Ese correo ya esta registrado')
    }
}

const existeUsuarioPorId = async (id ) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error('Id invalido');
    }
}

module.exports = {
    esRolValido,
    existeCorreo,
    existeUsuarioPorId
}