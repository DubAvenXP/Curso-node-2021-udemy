const { response, request } = require('express');


const usuariosGet = (req = request, res = response) => {
    const { q, nombre, apikey, page = 1, limit = 10} = req.query;

    res.json({
        msg: 'get user - Controller',
        q,
        nombre,
        apikey,
        page,
        limit

    });
}

const usuariosPost = (req = request, res = response) => {
    const { nombre, edad } = req.body;
    res.json({
        msg: 'Post user - Controller',
        nombre,
        edad
    });
}

const usuariosPut = (req = request, res = response) => {
    const { id } = req.params;
    res.json({
        msg: 'Put user - Controller',
        id
    });
}

const usuariosPatch = (req = request, res = response) => {
    res.json({
        msg: 'Patch user - Controller'
    });
}

const usuariosDelete = (req = request, res = response) => {
    res.json({
        msg: 'Delete user - Controller'
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}