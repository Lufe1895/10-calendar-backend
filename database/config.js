const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB online");
    } catch(e) {
        console.log(e);
        throw new Error('Error al inicializar la base de datos');
    }
}

module.exports = {
    dbConnection,
}