const { request, response } = require("express");
const { Producto, Categoria } = require('../models');


const productosPost = async (req = request, res = response) => {
    const { nombre, precio, descripcion, categoria } = req.body;

    //generar data a guardar
    const data = {
        nombre: nombre.toUpperCase(),
        precio,
        descripcion,
        usuario: req.usuario._id,
        categoria
    }

    const producto = new Producto(data);

    //Guardar db
    await producto.save();

    res.status(201).json(producto);
}

//=========================================================================

const productosGet = async (req = request, res = response) => {
    //Desestructurar los params
    const { limite = 10, desde = 0 } = req.query;

    //Obtener solo las categorias activas
    filter = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(filter),
        Producto.find(filter)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
    ]);

    res.json({
        total,
        productos
    });
}

const productosGetId = async (req = request, res = response) => {
    const id = req.params.id;

    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    res.json({
        producto
    });
}

const productosPut = async (req = request, res = response) => {
    const id = req.params.id;

    const { estado, usuario, nombre, ...data } = req.body;
    data.usuario = req.usuario._id;
    
    if (nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    // if (categoria) {
    //     const categoria_ = categoria.toUpperCase();
    //     const categoriaDB = await Categoria.findOne({nombre: categoria_});
    //     if(!categoriaDB){
    //         return res.status(400).json({
    //             msg: `La categoria ${categoria}, no existe`
    //         });
    //     }
    //     data.categoria = categoriaDB._id;
    // }

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json({
        producto
    });
}

const productosDelete = async (req = request, res = response) => {
    const id = req.params.id;
    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json({
        producto
    });
}

module.exports = {
    productosPost,
    productosGet,
    productosGetId,
    productosPut,
    productosDelete
}