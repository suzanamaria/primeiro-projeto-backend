const mongoose = require('mongoose')
require('dotenv').config()

async function conectaBandoDeDados() {
    try {
        console.log('Conexao com o BD iniciada')

        await mongoose.connect(process.env.MONGO_URL)
    
        console.log('Conexao com o BD feita com sucesso')
    } catch(erro) {
        console.log(erro)
    }
}

module.exports = conectaBandoDeDados