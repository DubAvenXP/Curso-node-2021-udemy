const {Roles, Usuario, Categoria, Producto} = require('../models');

const esRolValido = async (rol = '') => {
    const existeRol = await Roles.findOne({ rol });
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

const existeCategoriaPorId = async (id ) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error('Id invalido');
    }
}


const existeProducto = async ( nombre ) => {
    const existeProducto = await Producto.findOne({nombre});
    if (existeProducto) {
        throw new Error('El producto ya existe');
    }
}


const existeProductoPorId = async ( id ) => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error('El producto no existe');
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`);
    }
    return true;
}


module.exports = {
    esRolValido,
    existeCorreo,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProducto,
    existeProductoPorId,
    coleccionesPermitidas
}