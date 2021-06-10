const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Conexion establecida con la base de datos');
    } catch (error) {
        console.error(error);
        throw new Error('Error de conexion con la base de datos');
    }
}


module.exports = {
    dbConnection
}