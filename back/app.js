const express = require('express')
const cors = require('cors')
const port = 3000

const app = express()

app.use(cors())
app.use(express.json())

usuarios = []

app.get('/usuarios', (req, res) => {
    res.json(usuarios)
})

app.post('/login', (req, res) => {
    const dados = req.body
    const emailExiste = usuarios.find(u => u.email === dados.email)
    
    if (!emailExiste) {
        return res.status(404).json({ message:'Usuário não encontrado' })
    }

    if (emailExiste.senha !== dados.senha) {
        return res.status(401).json({ message:'Senha incorreta' })
    }

    return res.status(200).json({ message:'Login realizado com sucesso' })
})

app.post('/cadastro', (req, res) => {
    const dados = req.body
    const emailExiste = usuarios.find(u => u.email === dados.email)

    if (!emailExiste) {
        const newUser = {
            nome:dados.nome,
            email:dados.email,
            senha:dados.senha
        }
        usuarios.push(newUser)

        return res.status(201).json({message:'Usuário cadastrado com sucesso.'})

    } else {

        return res.status(409).json({message:'Email já cadastrado'})

    }

})

app.listen(port)