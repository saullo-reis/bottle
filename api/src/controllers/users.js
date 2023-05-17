import { db } from "../database/index.js"
import jwt from 'jsonwebtoken'

const register = (req, res) => {
    const q = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
    const { name, email, password } = req.body

    db.run(q, [name, email, password], function (err) {
        if (err) return res.status(401).json({ error: err.message })

        console.log("Usuário registrado")
        return res.status(200).json(req.body)
    })
}

const login = (req, res) => {
    const q = 'SELECT id, email, password, photo, name FROM users WHERE email = ?'
    const { email, password } = req.body

    db.get(q, email, function (err, user) {
        if (err) return res.status(500).json({ error: 'Erro no servidor' })
        if (!user || user.password !== password) return res.status(401).json({ error: 'Credenciais incorretos' })
        return res.json(user);
    })
}


export { register, login }