const { response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async (req, res = response, next) => {
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);

        //Usuario existe?
        if (!usuario) {
            return res.status(401).json({msg: 'Token no valido - usuario no existe en DB'});
        }

        //Verificar estado del usuario
        if (!usuario.estado) {
            return res.status(401).json({msg: 'Token no valido - usuario inactivo'});
        }

        req.usuario = usuario;


        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            msg: 'Token no valido'
        });
    }

}


module.exports = {
    validarJWT
}