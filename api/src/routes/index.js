import { Router } from 'express'
import { db } from '../database/index.js'
import jwt from 'jsonwebtoken'

const router = Router()

router.get('/', (__, res) => {
    res.send('Hello World')
})

router.post('/register', (req, res) => {
    const { name, email, password } = req.body

    const query = `INSERT INTO users (name, email, password) VALUES(?,?,?)`
    db.run(query, [name, email, password], function(err) {
        if(err){
            return res.status(401).json({error: err.message})
        }
        console.log('Usuário registrado nome: ' + name)
        res.send('Usuário'+name+'cadastrado')
    })
})

router.post('/login', (req, res) => {
    const{ email, password} = req.body

    const query = `SELECT id, email, password FROM users WHERE email = ?`
    db.get(query, email, (err, user) => {
        if(err) {
            return res.status(500).json({error: 'Erro no servidor'})
        }

        if(!user || user.password !== password){
            return res.status(401).json({ error: 'Credenciais incorretos' })
        }
        const token = jwt.sign({ id: user.id, email: user.email }, '54333' );
        res.json({token});
    })
})

export { router }