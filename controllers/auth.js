const { response, request } = require("express");
const bycriptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require("../helpers/google-verify");




const login = async (req = request, res = response) => {
    const { correo, password } = req.body;
    try {
        //Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos: correo'
            });
        }

        //Verificar si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos: estatus'
            });
        }
        //Verificar la contraseña
        const isValidPassword = bycriptjs.compareSync(password, usuario.password);
        if (!isValidPassword) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos: password'
            });
        }
        //Generar JWT
        const token = await generarJWT(usuario.id);

        return res.json({
            usuario,
            token
        });



    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "algo salio mal" });
    }

}

const googleSignin = async (req = request, res = response) => {
    
    const { id_token } = req.body;
    
    try {
        const {correo, nombre, img} = await googleVerify(id_token);
        
        let usuario = await Usuario.findOne({correo});

        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: ':p',
                img,
                google: true
            };
            usuario = new Usuario(data);
            await usuario.save();
        }

        // Si el usuario en DB 
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        //Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            token
        });

    } catch (error) {
        console.error(error);
        return res.status(400).json({ msg: "Token de google no valido" });
    }
    

}

const renovarToken = async (req = request, res = response) => {
    const {usuario} = req;
    //Generar JWT
    const token = await generarJWT(usuario.id);

    res.json({
        usuario,
        token
    })
}

module.exports = {
    login,
    googleSignin,
    renovarToken
}