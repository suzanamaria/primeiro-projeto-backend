const express = require("express") //iniciando o express
const router = express.Router() //configurando a primeira parte da rota
const cors = require('cors') // trazendo o pacote cors, que permite consumir esta API no front-end
const conectaBandoDeDados = require('./bancoDeDados.js') // ligando ao arquivo banco de dados
conectaBandoDeDados() // chamando a funcao que conecta ao banco de dados

const Mulher = require('./mulherModel.js')

const app = express() //iniciando o app
app.use(express.json())
app.use(cors())
const porta  = 3333 //criando a porta

//GET
async function mostraMulheres(request, response) {
    try {
        const mulheresDoBanco = await Mulher.find()
        response.json(mulheresDoBanco)
    } catch(erro) {
        console.log(erro)
    }
}

//POST
async function criaMulher(request, response) {
    const novaMulher = new Mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        citacao: request.body.citacao,
        minibio: request.body.minibio
    })
    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch(erro) {
        console.log(erro)
    }
}

//PATCH
async function corrigeMulher(request, response) {
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)

        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }
    
        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem
        }

        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao
        }
    
        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio
        }

        const mulherAtualizadaNoBanco = await mulherEncontrada.save()

        response.json(mulherAtualizadaNoBanco)
    } catch(erro) {
        console.log(erro)
    }
}

//DELETE
async function deletaMulher(request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({mensagem:'Mulher deletada com sucesso'})
    } catch(erro) {
        console.log(erro)
    }
}

//rotas
app.use(router.get('/mulheres', mostraMulheres)) // config rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)) // config rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) // config rota PATCH /mulheres
app.use(router.delete('/mulheres/:id', deletaMulher)) // config rota DELETE /mulheres

//PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta:", porta)
}

app.listen(porta, mostraPorta) //servidor ouvindo a porta