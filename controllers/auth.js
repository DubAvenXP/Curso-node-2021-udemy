const { response, request } = require("express");
const bycriptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');




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


module.exports = {
    login
}