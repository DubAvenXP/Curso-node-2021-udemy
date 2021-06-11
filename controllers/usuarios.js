const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


//Modelo DB 
const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
    // const { q, nombre, apikey, page = 1, limit = 10 } = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const filter = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(filter),
        Usuario.find(filter)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    });

}

const usuariosPost = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar DB
    await usuario.save();

    res.json({ usuario });
}

const usuariosPut = async (req = request, res = response) => {
    const { id } = req.params;

    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra base de datos si el id existe

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const usuariosPatch = (req = request, res = response) => {
    res.json({
        msg: 'Patch user - Controller'
    });
}

const usuariosDelete = async (req = request, res = response) => {
    const { id } = req.params;
    //borrarlo fisicamente
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });


    res.json({
        usuario
    });

}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}