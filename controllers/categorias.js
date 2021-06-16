const { request, response } = require("express");
const { Categoria } = require('../models');

const categoriasPost = async (req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    //validar si la categoria ya existe
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        });
    }

    //generar data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    //Guardar db
    await categoria.save();

    res.status(201).json(categoria);
}

//=========================================================================

const categoriasGet = async (req = request, res = response) => {
    //Desestructurar los params
    const { limite = 10, desde = 0 } = req.query;
    
    //Obtener solo las categorias activas
    filter = {estado: true};

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(filter),
        Categoria.find(filter)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre')
    ]);

    res.json({
        total,
        categorias
    });
}

const categoriasGetId = async (req = request, res = response) => {
    const id = req.params.id;

    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

    res.json({
        categoria
    });
}

const categoriasPut = async (req = request, res = response) => {
    const id = req.params.id;

    const {estado, usuario, ...data} = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});

    res.json({
        categoria
    });
}

const categoriasDelete = async (req = request, res = response) => {
    const id = req.params.id;
    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true});
    res.json({
        categoria
    });
}

module.exports = {
    categoriasPost,
    categoriasGet,
    categoriasGetId,
    categoriasPut,
    categoriasDelete
}