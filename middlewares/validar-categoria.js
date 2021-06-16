const { response, request } = require("express");
const { Categoria } = require('../models');



const existeCategoria = async (req = request, res = response, next) => {
    const nombre = req.body.categoria.toUpperCase();

    
    const categoria = await Categoria.findOne({ nombre });
    
    if (!categoria) {
        return res.status(400).json({
            msg: `La categoria ${nombre} no existe`
        });
    }

    req.categoria = categoria;
    
    next();
}



module.exports = {
    existeCategoria
}