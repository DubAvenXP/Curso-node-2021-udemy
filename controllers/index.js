const auth = require('./auth');
const buscar = require('./buscar');
const categorias = require('./categorias');
const productos = require('./productos');
const usuarios = require('./usuarios');
const uploads = require('./uploads');

module.exports = {
    ...auth,
    ...categorias,
    ...productos,
    ...usuarios,
    ...buscar,
    ...uploads,
}