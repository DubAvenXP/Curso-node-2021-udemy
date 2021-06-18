const path = require('path')
const {v4: uuidv4} = require('uuid');

const extensiones = ['png', 'jpg', 'jpeg', 'gift'];

const subirArchivo = (files, extensionesValidas = extensiones, carpeta = '') => {
    return new Promise((resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        //validar la extension
        
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extension ${extension} es invalida`);
        }

        //Renombrar archivo
        const nombreTemp = `${uuidv4()}.${extension}`
        uploadPath = path.join(__dirname, '../uploads', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }

            return resolve(nombreTemp);
        });
    });


}


module.exports = {
    subirArchivo
}